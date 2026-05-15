-- ============================================================
-- Rotina do Raul — Schema inicial
-- Tabelas: meal_plan, training_log, shopping_history
-- ============================================================

-- Extensão para UUID
create extension if not exists "uuid-ossp";

-- ── 1. PLANO DE REFEIÇÕES ─────────────────────────────────
-- Guarda qual opção de refeição está selecionada por semana/dia/refeição
create table if not exists public.meal_plan (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  week_idx   smallint not null,
  day_idx    smallint not null,
  meal_id    smallint not null,
  option_idx smallint not null default 0,
  updated_at timestamptz default now(),

  constraint meal_plan_unique unique (user_id, week_idx, day_idx, meal_id),
  constraint week_range check (week_idx between 0 and 3),
  constraint day_range  check (day_idx  between 0 and 5)
);

-- ── 2. LOG DE TREINO ─────────────────────────────────────
-- Registro de séries, reps e carga por exercício e data
create table if not exists public.training_log (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references auth.users(id) on delete cascade not null,
  logged_at     date not null default current_date,
  exercise_name text not null,
  sets          smallint,
  reps          smallint,
  weight_kg     numeric(6, 2),
  notes         text,
  created_at    timestamptz default now()
);

-- ── 3. HISTÓRICO DE COMPRAS ──────────────────────────────
-- Salva a lista de compras gerada com itens e estimativa de custo
create table if not exists public.shopping_history (
  id              uuid default uuid_generate_v4() primary key,
  user_id         uuid references auth.users(id) on delete cascade not null,
  shopped_at      date not null default current_date,
  period          text not null default 'monthly',
  items           jsonb not null default '[]',
  total_estimated numeric(10, 2),
  created_at      timestamptz default now()
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────
alter table public.meal_plan       enable row level security;
alter table public.training_log    enable row level security;
alter table public.shopping_history enable row level security;

-- meal_plan
create policy "meal_plan_select" on public.meal_plan
  for select using (auth.uid() = user_id);
create policy "meal_plan_insert" on public.meal_plan
  for insert with check (auth.uid() = user_id);
create policy "meal_plan_update" on public.meal_plan
  for update using (auth.uid() = user_id);
create policy "meal_plan_delete" on public.meal_plan
  for delete using (auth.uid() = user_id);

-- training_log
create policy "training_select" on public.training_log
  for select using (auth.uid() = user_id);
create policy "training_insert" on public.training_log
  for insert with check (auth.uid() = user_id);
create policy "training_update" on public.training_log
  for update using (auth.uid() = user_id);
create policy "training_delete" on public.training_log
  for delete using (auth.uid() = user_id);

-- shopping_history
create policy "shopping_select" on public.shopping_history
  for select using (auth.uid() = user_id);
create policy "shopping_insert" on public.shopping_history
  for insert with check (auth.uid() = user_id);
create policy "shopping_update" on public.shopping_history
  for update using (auth.uid() = user_id);
create policy "shopping_delete" on public.shopping_history
  for delete using (auth.uid() = user_id);
