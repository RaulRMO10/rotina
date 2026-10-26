-- ============================================================
-- Rotina v2 — Painel de saúde pessoal
-- Tabelas: raw_ingest, daily_metrics, workouts, measurements,
--          weekly_notes, weekly_reports + bucket privado "photos"
-- As tabelas da v1 (meal_plan, training_log, shopping_history)
-- ficam intocadas.
-- ============================================================

-- ── 1. RAW INGEST ─────────────────────────────────────────
-- Payload bruto de cada POST do HC Webhook. Sempre gravado,
-- antes de qualquer parse, para permitir reprocessar.
create table if not exists public.raw_ingest (
  id           bigint generated always as identity primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  received_at  timestamptz not null default now(),
  payload      jsonb not null,
  processed_at timestamptz
);
create index if not exists raw_ingest_user_received_idx
  on public.raw_ingest (user_id, received_at desc);

-- ── 2. MÉTRICAS DIÁRIAS ──────────────────────────────────
create table if not exists public.daily_metrics (
  id           bigint generated always as identity primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  day          date not null,
  weight_kg    numeric(5, 2),
  body_fat_pct numeric(4, 1),
  bmr_kcal     integer,
  steps        integer,
  sleep_min    integer,
  resting_hr   smallint,
  updated_at   timestamptz not null default now(),

  constraint daily_metrics_unique unique (user_id, day)
);

-- ── 3. TREINOS ───────────────────────────────────────────
create table if not exists public.workouts (
  id           bigint generated always as identity primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  started_at   timestamptz not null,
  type         text not null,
  duration_min integer,
  avg_hr       smallint,
  kcal         integer,
  source_id    text, -- metadata.id do Health Connect, evita duplicar
  created_at   timestamptz not null default now(),

  constraint workouts_source_unique unique (user_id, source_id)
);
create index if not exists workouts_user_started_idx
  on public.workouts (user_id, started_at desc);

-- ── 4. MEDIDAS ───────────────────────────────────────────
-- Cada source é uma série própria: relógio e balança da academia
-- não se comparam entre si.
create table if not exists public.measurements (
  id             bigint generated always as identity primary key,
  user_id        uuid references auth.users(id) on delete cascade not null,
  measured_on    date not null,
  source         text not null check (source in ('relogio', 'academia')),
  waist_cm       numeric(5, 1),
  body_fat_pct   numeric(4, 1),
  muscle_mass_kg numeric(5, 2),
  weight_kg      numeric(5, 2),
  notes          text,
  created_at     timestamptz not null default now()
);
create index if not exists measurements_user_day_idx
  on public.measurements (user_id, measured_on desc);

-- ── 5. NOTA SEMANAL ──────────────────────────────────────
create table if not exists public.weekly_notes (
  id         bigint generated always as identity primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  week_start date not null,
  note       text not null,
  created_at timestamptz not null default now(),

  constraint weekly_notes_unique unique (user_id, week_start)
);

-- ── 6. RESUMO SEMANAL (IA) ───────────────────────────────
create table if not exists public.weekly_reports (
  id         bigint generated always as identity primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  week_start date not null,
  summary    text not null,
  created_at timestamptz not null default now(),

  constraint weekly_reports_unique unique (user_id, week_start)
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────
-- /api/ingest e o cron usam a service role (ignora RLS) só no servidor.
alter table public.raw_ingest     enable row level security;
alter table public.daily_metrics  enable row level security;
alter table public.workouts       enable row level security;
alter table public.measurements   enable row level security;
alter table public.weekly_notes   enable row level security;
alter table public.weekly_reports enable row level security;

-- raw_ingest: o dono só lê
drop policy if exists "raw_ingest_select" on public.raw_ingest;
create policy "raw_ingest_select" on public.raw_ingest
  for select using (auth.uid() = user_id);

-- daily_metrics / workouts / weekly_reports: preenchidas pelo servidor, dono só lê
drop policy if exists "daily_metrics_select" on public.daily_metrics;
create policy "daily_metrics_select" on public.daily_metrics
  for select using (auth.uid() = user_id);
drop policy if exists "workouts_select" on public.workouts;
create policy "workouts_select" on public.workouts
  for select using (auth.uid() = user_id);
drop policy if exists "weekly_reports_select" on public.weekly_reports;
create policy "weekly_reports_select" on public.weekly_reports
  for select using (auth.uid() = user_id);

-- measurements / weekly_notes: entrada manual pelo formulário semanal
drop policy if exists "measurements_select" on public.measurements;
create policy "measurements_select" on public.measurements
  for select using (auth.uid() = user_id);
drop policy if exists "measurements_insert" on public.measurements;
create policy "measurements_insert" on public.measurements
  for insert with check (auth.uid() = user_id);
drop policy if exists "measurements_update" on public.measurements;
create policy "measurements_update" on public.measurements
  for update using (auth.uid() = user_id);
drop policy if exists "measurements_delete" on public.measurements;
create policy "measurements_delete" on public.measurements
  for delete using (auth.uid() = user_id);

drop policy if exists "weekly_notes_select" on public.weekly_notes;
create policy "weekly_notes_select" on public.weekly_notes
  for select using (auth.uid() = user_id);
drop policy if exists "weekly_notes_insert" on public.weekly_notes;
create policy "weekly_notes_insert" on public.weekly_notes
  for insert with check (auth.uid() = user_id);
drop policy if exists "weekly_notes_update" on public.weekly_notes;
create policy "weekly_notes_update" on public.weekly_notes
  for update using (auth.uid() = user_id);
drop policy if exists "weekly_notes_delete" on public.weekly_notes;
create policy "weekly_notes_delete" on public.weekly_notes
  for delete using (auth.uid() = user_id);

-- ── STORAGE: fotos mensais ───────────────────────────────
-- Bucket privado; cada usuário só acessa a pasta "<uid>/...".
insert into storage.buckets (id, name, public)
values ('photos', 'photos', false)
on conflict (id) do nothing;

drop policy if exists "photos_select" on storage.objects;
create policy "photos_select" on storage.objects
  for select using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "photos_insert" on storage.objects;
create policy "photos_insert" on storage.objects
  for insert with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "photos_delete" on storage.objects;
create policy "photos_delete" on storage.objects
  for delete using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
