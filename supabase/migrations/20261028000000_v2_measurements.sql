-- ============================================================
-- Rotina v2 — Medidas manuais e análise de fotos
-- measurements passa a aceitar várias fontes manuais e mais medidas.
-- Cada fonte continua sendo uma série própria (não se comparam).
-- Pode rodar mais de uma vez.
-- ============================================================

alter table public.measurements drop constraint if exists measurements_source_check;
-- 'relogio' antigo vira 'casa' (era a cintura medida em casa).
update public.measurements set source = 'casa' where source = 'relogio';
alter table public.measurements
  add constraint measurements_source_check check (source in ('casa', 'academia', 'profissional'));

alter table public.measurements add column if not exists hip_cm   numeric(5, 1);
alter table public.measurements add column if not exists chest_cm numeric(5, 1);
alter table public.measurements add column if not exists arm_cm   numeric(5, 1);
alter table public.measurements add column if not exists thigh_cm numeric(5, 1);

-- ── Análises de fotos pela IA ────────────────────────────
create table if not exists public.photo_analyses (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  photo_paths text[] not null,
  analysis    text not null,
  created_at  timestamptz not null default now()
);
create index if not exists photo_analyses_user_created_idx
  on public.photo_analyses (user_id, created_at desc);

alter table public.photo_analyses enable row level security;
drop policy if exists "photo_analyses_select" on public.photo_analyses;
create policy "photo_analyses_select" on public.photo_analyses
  for select using (auth.uid() = user_id);
drop policy if exists "photo_analyses_delete" on public.photo_analyses;
create policy "photo_analyses_delete" on public.photo_analyses
  for delete using (auth.uid() = user_id);

notify pgrst, 'reload schema';
