-- Adiciona suporte a múltiplos meses no plano de refeições
ALTER TABLE meal_plan ADD COLUMN IF NOT EXISTS month_idx integer NOT NULL DEFAULT 5;

ALTER TABLE meal_plan DROP CONSTRAINT IF EXISTS meal_plan_user_id_week_idx_day_idx_meal_id_key;

ALTER TABLE meal_plan ADD CONSTRAINT IF NOT EXISTS meal_plan_unique
  UNIQUE (user_id, month_idx, week_idx, day_idx, meal_id);
