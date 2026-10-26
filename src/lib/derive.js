import { addDays, daysBetween, isoDay, today, weekStart } from './dates';
import { avg } from './format';
import { lengthDays, previousPeriod } from './period';

export const METRIC_FIELDS = [
  { key: 'weight_kg', label: 'Peso', unit: 'kg' },
  { key: 'body_fat_pct', label: '% gordura', unit: '%' },
  { key: 'muscle_mass_kg', label: 'Músculo', unit: 'kg' },
  { key: 'waist_cm', label: 'Cintura', unit: 'cm' },
  { key: 'hip_cm', label: 'Quadril', unit: 'cm' },
  { key: 'chest_cm', label: 'Peito', unit: 'cm' },
  { key: 'arm_cm', label: 'Braço', unit: 'cm' },
  { key: 'thigh_cm', label: 'Coxa', unit: 'cm' },
];
export const SOURCES = [
  { key: 'casa', label: 'Casa' },
  { key: 'academia', label: 'Academia' },
  { key: 'profissional', label: 'Profissional' },
];

const localDay = (ts) => isoDay(new Date(ts));

// Primeiro dia com qualquer dado (para "Todo o período" e limites de navegação).
export function firstDataDay(data) {
  const cands = [
    data.metrics[0]?.day,
    data.measurements[0]?.measured_on,
    data.workouts.at(-1) && localDay(data.workouts.at(-1).started_at),
  ].filter(Boolean);
  return cands.length ? cands.sort()[0] : null;
}


// Inclinação por mínimos quadrados (unidade por dia) — o "ritmo" da tendência.
function slopePerDay(points) {
  if (points.length < 3) return null;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const mx = avg(xs);
  const my = avg(ys);
  const den = xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  if (!den) return null;
  return xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / den;
}

// Semanas seguidas (terminando na atual ou na anterior) com pelo menos 1 treino.
function weekStreak(allWorkouts) {
  const weeks = new Set(allWorkouts.map((w) => weekStart(localDay(w.started_at))));
  let w = weekStart(today());
  if (!weeks.has(w)) w = addDays(w, -7);
  let n = 0;
  while (weeks.has(w)) { n += 1; w = addDays(w, -7); }
  return n;
}

function statsFor(byDay, days, field) {
  const vals = days.map((d) => byDay[d]?.[field]).filter((v) => v != null).map(Number);
  return { mean: avg(vals), n: vals.length };
}

export function derive(data, period) {
  const t = today();
  const to = period.to > t ? t : period.to; // não olha o futuro
  const days = to >= period.from ? daysBetween(period.from, to) : [];
  const prev = previousPeriod(period);
  const prevDays = daysBetween(prev.from, prev.to);
  const byDay = Object.fromEntries(data.metrics.map((m) => [m.day, m]));
  const n = lengthDays(period);
  const val = (d, f) => (byDay[d]?.[f] != null ? Number(byDay[d][f]) : null);
  const ma7 = (d, f) => avg(daysBetween(addDays(d, -6), d).map((x) => val(x, f)));

  const metric = (field) => {
    const cur = statsFor(byDay, days, field);
    const before = statsFor(byDay, prevDays, field);
    return { cur: cur.mean, n: cur.n, prev: before.mean };
  };

  const series = days.map((d) => ({
    day: d,
    weight: val(d, 'weight_kg'),
    weightMa: ma7(d, 'weight_kg'),
    fat: val(d, 'body_fat_pct'),
    fatMa: ma7(d, 'body_fat_pct'),
    steps: val(d, 'steps'),
    sleepH: val(d, 'sleep_min') == null ? null : Math.round((val(d, 'sleep_min') / 60) * 10) / 10,
    rhr: val(d, 'resting_hr'),
  }));

  const inRange = (day, a, b) => day >= a && day <= b;
  const workouts = data.workouts.filter((w) => inRange(localDay(w.started_at), period.from, to));
  const prevWorkouts = data.workouts.filter((w) => inRange(localDay(w.started_at), prev.from, prev.to));

  // Treinos por dia (períodos curtos) ou por semana (períodos longos).
  let workoutBuckets;
  if (n <= 31) {
    const counts = Object.fromEntries(days.map((d) => [d, 0]));
    workouts.forEach((w) => { counts[localDay(w.started_at)] += 1; });
    workoutBuckets = { unit: 'day', items: days.map((d) => ({ key: d, count: counts[d], current: d === t })) };
  } else {
    const weeks = [];
    for (let w = weekStart(period.from); w <= to; w = addDays(w, 7)) weeks.push(w);
    const counts = Object.fromEntries(weeks.map((w) => [w, 0]));
    workouts.forEach((w) => { counts[weekStart(localDay(w.started_at))] += 1; });
    workoutBuckets = { unit: 'week', items: weeks.map((w) => ({ key: w, count: counts[w], current: w === weekStart(t) })) };
  }

  const measurements = data.measurements.filter((m) => inRange(m.measured_on, period.from, to));
  const report = period.kind === 'week'
    ? data.reports.find((r) => r.week_start === period.from) ?? null
    : data.reports.find((r) => inRange(r.week_start, period.from, to)) ?? null;
  const note = data.notes.find((x) => inRange(x.week_start, period.from, to)) ?? null;

  const has = (key) => series.some((s) => s[key] != null);

  // Ritmo de peso/gordura no período (por semana).
  const trend = (field) => {
    const pts = days.map((d, i) => ({ x: i, y: val(d, field) })).filter((p) => p.y != null);
    const k = slopePerDay(pts);
    return k == null || pts.length < 4 ? null : k * 7;
  };

  // Treinos por tipo.
  const byType = {};
  workouts.forEach((w) => {
    const t2 = byType[w.type] || (byType[w.type] = { type: w.type, count: 0, minutes: 0, hr: [] });
    t2.count += 1;
    t2.minutes += w.duration_min || 0;
    if (w.avg_hr != null) t2.hr.push(w.avg_hr);
  });
  const types = Object.values(byType).map((x) => ({ ...x, avgHr: avg(x.hr) })).sort((a, b) => b.count - a.count);

  // Calendário: uma célula por dia, com minutos treinados.
  const minutesByDay = {};
  workouts.forEach((w) => { const d = localDay(w.started_at); minutesByDay[d] = (minutesByDay[d] || 0) + (w.duration_min || 30); });
  const calendar = days.map((d) => ({ day: d, minutes: minutesByDay[d] || 0 }));
  const activeDays = calendar.filter((c) => c.minutes > 0).length;

  const weightRate = trend('weight_kg');
  const fatRate = trend('body_fat_pct');
  const sleepVals = days.map((d) => val(d, 'sleep_min')).filter((v) => v != null);
  const shortNights = sleepVals.filter((v) => v < 420).length;
  const streak = weekStreak(data.workouts);

  // Insights: frases curtas e factuais, só com o que os dados sustentam.
  const insights = [];
  const nf = (v, dg = 1) => Number(v.toFixed(dg)).toLocaleString('pt-BR', { minimumFractionDigits: dg, maximumFractionDigits: dg });
  if (workouts.length || prevWorkouts.length) {
    const diff = workouts.length - prevWorkouts.length;
    insights.push({ tone: diff >= 0 ? 'good' : 'warn', text: `${workouts.length} treino${workouts.length === 1 ? '' : 's'} em ${activeDays} dia${activeDays === 1 ? '' : 's'}${prevWorkouts.length || diff ? ` (${diff >= 0 ? '+' : ''}${diff} vs período anterior)` : ''}` });
  }
  if (streak >= 2) insights.push({ tone: 'good', text: `${streak} semanas seguidas treinando` });
  if (weightRate != null && Math.abs(weightRate) >= 0.05) insights.push({ tone: 'neutral', text: `Peso ${weightRate < 0 ? 'caindo' : 'subindo'} ${nf(Math.abs(weightRate), 2)} kg/semana` });
  else if (weightRate != null) insights.push({ tone: 'neutral', text: 'Peso estável no período' });
  if (fatRate != null && Math.abs(fatRate) >= 0.1) insights.push({ tone: fatRate < 0 ? 'good' : 'warn', text: `Gordura ${fatRate < 0 ? 'caindo' : 'subindo'} ${nf(Math.abs(fatRate))} pp/semana` });
  if (sleepVals.length >= 3) insights.push({ tone: shortNights > sleepVals.length / 2 ? 'warn' : 'neutral', text: `${shortNights} de ${sleepVals.length} noites com menos de 7h de sono` });
  return {
    period: { ...period, to },
    lengthDays: n,
    series,
    showMa: n >= 14,
    has: { weight: has('weight'), fat: has('fat'), steps: has('steps'), sleep: has('sleepH'), rhr: has('rhr') },
    metrics: {
      weight: metric('weight_kg'),
      fat: metric('body_fat_pct'),
      steps: metric('steps'),
      sleep: metric('sleep_min'),
      rhr: metric('resting_hr'),
    },
    workouts,
    types,
    calendar,
    activeDays,
    streak,
    weightRate,
    fatRate,
    insights,
    workoutCount: workouts.length,
    prevWorkoutCount: prevWorkouts.length,
    workoutMinutes: workouts.reduce((s, w) => s + (w.duration_min || 0), 0),
    workoutBuckets,
    measurements,
    report,
    note,
    isEmpty: !series.some((s) => Object.entries(s).some(([k, v]) => !['day', 'weightMa', 'fatMa'].includes(k) && v != null)) && !workouts.length && !measurements.length,
  };
}
