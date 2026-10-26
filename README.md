# Rotina v2 — Painel de saúde pessoal

Acompanha métricas corporais e consistência de treino com o mínimo de esforço manual.

```
Galaxy Watch7 → Samsung Health → Health Connect → HC Webhook (Android)
  → POST /api/ingest (Vercel, header x-api-key)
      → raw_ingest (payload bruto, sempre)
      → hc_records (1 linha por registro do HC; aplica edições e exclusões)
      → daily_metrics + workouts (recalculados por dia)
  → painel estático (index.html) lê o Supabase com login + RLS
  → Vercel Cron (segunda 08:17 BRT) → /api/weekly-report → Claude → weekly_reports
```

A v1 (dieta/macros, tag `v1-dieta`) está em `legacy/`.

## Endpoints

| Rota | Auth | O que faz |
|---|---|---|
| `POST /api/ingest` | `x-api-key: INGEST_TOKEN` | grava o bruto e processa |
| `POST /api/reprocess` | `x-api-key: INGEST_TOKEN` | reprocessa `raw_ingest` pendente (`?all=1` = tudo, em lotes; continuar com `?after=<next_after>`) |
| `GET /api/weekly-report` | `Authorization: Bearer CRON_SECRET` | gera o resumo da semana anterior (`?week=AAAA-MM-DD` para uma semana específica) |

## Regras de cálculo

- **Passos / sono:** se mais de um app escreve no Health Connect, usa a fonte com maior total no dia (não soma fontes).
- **Sono:** conta no dia em que você acorda; exclui estágios "acordado" e "fora da cama".
- **Peso, % gordura, TMB, FC repouso:** último valor do dia. TMB vem em watts e é convertida para kcal/dia.
- **Treinos:** FC média e kcal vêm dos registros de FC e calorias ativas dentro da janela do treino.
- **Medidas:** `source = relogio | academia` são séries separadas e nunca se comparam.

## Setup

1. **Supabase:** rode as migrations de `supabase/migrations/` em ordem (SQL Editor ou `supabase db push`).
2. **Vercel:** variáveis de `.env.example`.
3. **HC Webhook:** URL `https://<projeto>.vercel.app/api/ingest`, header `x-api-key: <INGEST_TOKEN>`.

Dados de saúde ficam só no Supabase — nunca no código, em seeds ou em commits.
