// GET /api/weekly-report — Vercel Cron (segunda de manhã) gera o resumo da
// semana anterior com a API do Claude e grava em weekly_reports.
// Auth: header Authorization: Bearer <CRON_SECRET> (a Vercel envia sozinha no cron).
// ?week=YYYY-MM-DD (segunda) gera uma semana específica, para rodar à mão.
//
// Env: CRON_SECRET, ANTHROPIC_API_KEY + as do Supabase (ver _lib/db.js)

const Anthropic = require('@anthropic-ai/sdk');
const { safeEqual } = require('./_lib/auth');
const { env, rest } = require('./_lib/db');

const TZ = 'America/Sao_Paulo';
const MODEL = 'claude-opus-5-5';

const SYSTEM = `Você escreve o resumo semanal de um painel pessoal de saúde, em português do Brasil.
O dono do painel treina, usa um Galaxy Watch e quer acompanhar consistência de treino e composição corporal com pouco esforço.

Regras:
- Até 150 palavras, em texto corrido curto ou poucos tópicos. Sem títulos, sem markdown pesado.
- Comece pela consistência de treino (treinos na semana vs. semanas anteriores).
- Depois tendências: peso e % de gordura pela média da semana vs. a anterior, sono, passos, FC de repouso.
- Medidas do relógio e da balança da academia são séries diferentes: nunca compare uma com a outra.
- Oscilações diárias de peso e bioimpedância são ruído; comente só a tendência da média.
- Se faltarem dados, diga em uma frase o que faltou, sem drama.
- Termine com uma sugestão prática e pequena para a próxima semana.
- Não faça diagnóstico médico nem recomendações de dieta específicas.
- Leve em conta a nota da semana, se houver.`;

// Data local (YYYY-MM-DD) de um instante no fuso do usuário.
function localDay(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}
function addDays(day, n) {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function mondayOf(day) {
  const dow = (new Date(`${day}T12:00:00Z`).getUTCDay() + 6) % 7;
  return addDays(day, -dow);
}

const mean = (rows, f) => {
  const v = rows.map((r) => r[f]).filter((x) => x != null).map(Number);
  return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : null;
};
const summarize = (rows) => ({
  dias_com_dados: rows.length,
  peso_medio_kg: mean(rows, 'weight_kg'),
  gordura_media_pct: mean(rows, 'body_fat_pct'),
  passos_medios: mean(rows, 'steps'),
  sono_medio_min: mean(rows, 'sleep_min'),
  fc_repouso_media: mean(rows, 'resting_hr'),
});

async function buildWeek(userId, week) {
  const end = addDays(week, 6);
  const prev = addDays(week, -7);
  const fourBack = addDays(week, -28);
  // Janela UTC folgada; o filtro fino por dia local é feito em JS.
  const isoFrom = new Date(`${fourBack}T00:00:00Z`).toISOString();
  const isoTo = new Date(`${addDays(end, 2)}T00:00:00Z`).toISOString();

  const [metrics, workouts, measurements, notes] = await Promise.all([
    rest(`daily_metrics?user_id=eq.${userId}&day=gte.${prev}&day=lte.${end}&order=day`),
    rest(`workouts?user_id=eq.${userId}&started_at=gte.${isoFrom}&started_at=lt.${isoTo}&order=started_at`),
    rest(`measurements?user_id=eq.${userId}&measured_on=gte.${fourBack}&measured_on=lte.${end}&order=measured_on`),
    rest(`weekly_notes?user_id=eq.${userId}&week_start=eq.${week}`),
  ]);

  const inWeek = (day, from) => day >= from && day <= addDays(from, 6);
  const workoutsByWeek = {};
  for (let i = 4; i >= 0; i--) workoutsByWeek[addDays(week, -7 * i)] = 0;
  const thisWeek = [];
  for (const w of workouts) {
    const day = localDay(new Date(w.started_at));
    const ws = mondayOf(day);
    if (ws in workoutsByWeek) workoutsByWeek[ws] += 1;
    if (ws === week) thisWeek.push({ dia: day, tipo: w.type, min: w.duration_min, fc_media: w.avg_hr, kcal: w.kcal });
  }

  return {
    semana: `${week} a ${end}`,
    treinos_na_semana: thisWeek,
    treinos_por_semana: workoutsByWeek,
    relogio_semana: summarize(metrics.filter((m) => inWeek(m.day, week))),
    relogio_semana_anterior: summarize(metrics.filter((m) => inWeek(m.day, prev))),
    medidas_ultimas_4_semanas: measurements.map((m) => ({
      data: m.measured_on, fonte: m.source, cintura_cm: m.waist_cm, gordura_pct: m.body_fat_pct,
      massa_muscular_kg: m.muscle_mass_kg, peso_kg: m.weight_kg,
    })),
    nota_da_semana: notes[0]?.note ?? null,
  };
}

module.exports = async (req, res) => {
  if (!safeEqual((req.headers.authorization || '').replace(/^Bearer /, ''), process.env.CRON_SECRET)) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const { userId } = env();
  const requested = typeof req.query.week === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(req.query.week) ? req.query.week : null;
  // Padrão: a semana (seg–dom) que terminou antes da segunda atual.
  const week = requested ? mondayOf(requested) : addDays(mondayOf(localDay(new Date())), -7);

  const data = await buildWeek(userId, week);

  const client = new Anthropic();
  let response;
  try {
    response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: 'medium' },
      // Se o classificador de segurança recusar, a API refaz no modelo de fallback recomendado.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      messages: [{ role: 'user', content: `Dados da semana (JSON):\n${JSON.stringify(data, null, 2)}` }],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(503).json({ error: 'rate limited, tente de novo' });
    if (err instanceof Anthropic.APIError) {
      console.error('claude api error', err.status, err.message);
      return res.status(502).json({ error: `claude api ${err.status}` });
    }
    throw err;
  }

  if (response.stop_reason === 'refusal') {
    console.error('refusal', response.stop_details);
    return res.status(502).json({ error: 'model refused' });
  }
  const summary = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
  if (!summary) return res.status(502).json({ error: 'empty summary' });

  await rest('weekly_reports?on_conflict=user_id,week_start', {
    method: 'POST',
    body: { user_id: userId, week_start: week, summary },
    prefer: 'resolution=merge-duplicates',
  });

  return res.status(200).json({ ok: true, week, chars: summary.length });
};
