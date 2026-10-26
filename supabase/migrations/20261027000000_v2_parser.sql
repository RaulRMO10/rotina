-- ============================================================
-- Rotina v2 — Parser do Health Connect
-- hc_records guarda cada registro do HC normalizado (1 linha por
-- metadata.id), o que permite aplicar edições e exclusões do HC.
-- daily_metrics e workouts são recalculados a partir dela.
-- ============================================================

create table if not exists public.hc_records (
  user_id    uuid references auth.users(id) on delete cascade not null,
  type       text not null,          -- chave do payload: steps, sleep, weight...
  hc_id      text not null,          -- metadata.id do Health Connect
  origin     text,                   -- metadata.data_origin (app que escreveu)
  start_at   timestamptz not null,
  end_at     timestamptz not null,
  value      numeric,                -- valor principal já em unidade final
  data       jsonb,                  -- extras (tipo de exercício, estágios...)
  updated_at timestamptz not null default now(),

  primary key (user_id, type, hc_id)
);
create index if not exists hc_records_user_type_start_idx
  on public.hc_records (user_id, type, start_at);

alter table public.hc_records enable row level security;
drop policy if exists "hc_records_select" on public.hc_records;
create policy "hc_records_select" on public.hc_records
  for select using (auth.uid() = user_id);

-- Códigos de ExerciseSessionRecord do Health Connect → rótulo.
create or replace function public.hc_exercise_label(code int)
returns text language sql immutable as $$
  select case code
    when 79 then 'caminhada'
    when 56 then 'corrida'
    when 57 then 'esteira'
    when 8  then 'bike'
    when 9  then 'bike'
    when 70 then 'musculação'
    when 81 then 'musculação'
    when 13 then 'calistenia'
    when 74 then 'natação'
    when 73 then 'natação'
    when 25 then 'elíptico'
    when 36 then 'HIIT'
    when 37 then 'trilha'
    when 83 then 'yoga'
    else coalesce('outro (' || code || ')', 'outro')
  end
$$;

-- Recalcula daily_metrics e workouts para os dias informados (fuso p_tz).
create or replace function public.refresh_health_days(p_user uuid, p_days date[], p_tz text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
begin
  with d as (
    select day,
           (day::timestamp at time zone p_tz)       as lo,
           ((day + 1)::timestamp at time zone p_tz) as hi
    from unnest(p_days) as day
  ), m as (
    select d.day,
      (select r.value from hc_records r where r.user_id = p_user and r.type = 'weight'
         and r.start_at >= d.lo and r.start_at < d.hi order by r.start_at desc limit 1) as weight_kg,
      (select r.value from hc_records r where r.user_id = p_user and r.type = 'body_fat'
         and r.start_at >= d.lo and r.start_at < d.hi order by r.start_at desc limit 1) as body_fat_pct,
      (select r.value from hc_records r where r.user_id = p_user and r.type = 'basal_metabolic_rate'
         and r.start_at >= d.lo and r.start_at < d.hi order by r.start_at desc limit 1) as bmr_kcal,
      (select r.value from hc_records r where r.user_id = p_user and r.type = 'resting_heart_rate'
         and r.start_at >= d.lo and r.start_at < d.hi order by r.start_at desc limit 1) as resting_hr,
      -- Mais de um app pode escrever passos/sono: usa a fonte com maior total, sem somar fontes.
      (select max(s) from (select sum(r.value) s from hc_records r where r.user_id = p_user
         and r.type = 'steps' and r.start_at >= d.lo and r.start_at < d.hi group by r.origin) q) as steps,
      -- Sono conta no dia em que você acorda.
      (select max(s) from (select sum(r.value) s from hc_records r where r.user_id = p_user
         and r.type = 'sleep' and r.end_at >= d.lo and r.end_at < d.hi group by r.origin) q) as sleep_min
    from d
  )
  insert into daily_metrics (user_id, day, weight_kg, body_fat_pct, bmr_kcal, steps, sleep_min, resting_hr, updated_at)
  select p_user, m.day, round(m.weight_kg, 2), round(m.body_fat_pct, 1), round(m.bmr_kcal)::int,
         round(m.steps)::int, round(m.sleep_min)::int, round(m.resting_hr)::smallint, now()
  from m
  on conflict (user_id, day) do update set
    weight_kg = excluded.weight_kg, body_fat_pct = excluded.body_fat_pct, bmr_kcal = excluded.bmr_kcal,
    steps = excluded.steps, sleep_min = excluded.sleep_min, resting_hr = excluded.resting_hr,
    updated_at = now();

  delete from daily_metrics
  where user_id = p_user and day = any(p_days)
    and weight_kg is null and body_fat_pct is null and bmr_kcal is null
    and steps is null and sleep_min is null and resting_hr is null;

  -- Treinos que começaram nesses dias. FC média e kcal vêm dos registros
  -- de FC / calorias ativas dentro da janela do treino.
  insert into workouts (user_id, started_at, type, duration_min, avg_hr, kcal, source_id)
  select p_user, e.start_at,
         hc_exercise_label((e.data->>'exercise_type')::int),
         round(e.value)::int,
         (select round(avg(h.value))::smallint from hc_records h where h.user_id = p_user
            and h.type = 'heart_rate' and h.start_at >= e.start_at and h.start_at <= e.end_at),
         (select nullif(round(sum(c.value)), 0)::int from hc_records c where c.user_id = p_user
            and c.type = 'active_calories' and c.start_at >= e.start_at and c.end_at <= e.end_at),
         e.hc_id
  from hc_records e
  where e.user_id = p_user and e.type = 'exercise'
    and (e.start_at at time zone p_tz)::date = any(p_days)
  on conflict (user_id, source_id) do update set
    started_at = excluded.started_at, type = excluded.type, duration_min = excluded.duration_min,
    avg_hr = excluded.avg_hr, kcal = excluded.kcal;
end
$$;

-- Aplica um payload já normalizado: exclusões, upsert dos registros e recálculo.
-- p_records: [{type, hc_id, origin, start_at, end_at, value, data}]
-- p_deleted: [{type, id}]
create or replace function public.ingest_hc_records(p_user uuid, p_records jsonb, p_deleted jsonb, p_tz text)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_days date[];
  v_count int;
begin
  create temp table _in on commit drop as
    select * from jsonb_to_recordset(coalesce(p_records, '[]'))
      as x(type text, hc_id text, origin text, start_at timestamptz, end_at timestamptz, value numeric, data jsonb);
  create temp table _del on commit drop as
    select d->>'type' as type, d->>'id' as hc_id from jsonb_array_elements(coalesce(p_deleted, '[]')) d;

  -- Dias afetados: os novos, os antigos de registros editados e os de registros excluídos.
  select array_agg(distinct day) into v_days from (
    select (start_at at time zone p_tz)::date as day from _in
    union select (end_at at time zone p_tz)::date from _in
    union select (r.start_at at time zone p_tz)::date from hc_records r
      join (select type, hc_id from _in union select type, hc_id from _del) k
        on r.user_id = p_user and r.type = k.type and r.hc_id = k.hc_id
    union select (r.end_at at time zone p_tz)::date from hc_records r
      join (select type, hc_id from _in union select type, hc_id from _del) k
        on r.user_id = p_user and r.type = k.type and r.hc_id = k.hc_id
  ) s where day is not null;

  delete from hc_records r using _del
    where r.user_id = p_user and r.type = _del.type and r.hc_id = _del.hc_id;
  delete from workouts w using _del
    where w.user_id = p_user and _del.type = 'exercise' and w.source_id = _del.hc_id;

  insert into hc_records (user_id, type, hc_id, origin, start_at, end_at, value, data, updated_at)
  select distinct on (type, hc_id) p_user, type, hc_id, origin, start_at, end_at, value, data, now() from _in
  on conflict (user_id, type, hc_id) do update set
    origin = excluded.origin, start_at = excluded.start_at, end_at = excluded.end_at,
    value = excluded.value, data = excluded.data, updated_at = now()
  -- Total diário (agregado): só substitui se cobrir pelo menos o mesmo trecho do dia.
  -- Assim o "hoje" cresce a cada envio e uma busca menor não apaga um dia completo.
  where not coalesce((excluded.data->>'aggregate')::boolean, false)
     or excluded.end_at >= hc_records.end_at;
  get diagnostics v_count = row_count;

  if v_days is not null then
    perform refresh_health_days(p_user, v_days, p_tz);
  end if;

  return jsonb_build_object('records', v_count, 'days', coalesce(to_jsonb(v_days), '[]'));
end
$$;

-- Só o servidor (service role) pode chamar: as funções recebem p_user livre.
revoke execute on function public.refresh_health_days(uuid, date[], text) from public, anon, authenticated;
revoke execute on function public.ingest_hc_records(uuid, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.refresh_health_days(uuid, date[], text) to service_role;
grant execute on function public.ingest_hc_records(uuid, jsonb, jsonb, text) to service_role;
