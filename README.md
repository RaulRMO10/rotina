# Rotina v2 — Painel de saúde pessoal

Acompanha métricas corporais e consistência de treino com o mínimo de esforço manual.

```
Galaxy Watch7 → Samsung Health → Health Connect → HC Webhook (Android)
  → POST /api/ingest (Vercel, header x-api-key) → Supabase raw_ingest
```

A v1 (dieta/macros, tag `v1-dieta`) está em `legacy/`.

## Setup

1. **Supabase:** rode `supabase/migrations/20261026000000_v2_schema.sql` (SQL Editor ou `supabase db push`).
2. **Vercel:** importe o repo e configure as variáveis de `.env.example`
   (`INGEST_TOKEN`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `INGEST_USER_ID`).
3. **HC Webhook:** URL `https://<projeto>.vercel.app/api/ingest`, header `x-api-key: <INGEST_TOKEN>`.

Dados de saúde ficam só no Supabase — nunca no código, em seeds ou em commits.
