import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import { addDays, daysBetween, isoDay, parseDay, today, weekStart } from './dates';
import { avg } from './format';

// Carrega tudo que o painel precisa e deriva as séries.
export function useDashboard(range) {
  const [raw, setRaw] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const to = today();
    const from = addDays(to, -(range - 1));
    const metricsFrom = addDays(from, -13); // folga para média móvel e semana anterior
    const workoutsFrom = addDays(weekStart(to), -7 * 11);
    const since = from < workoutsFrom ? from : workoutsFrom;

    const res = await Promise.all([
      supabase.from('daily_metrics').select('*').gte('day', metricsFrom).order('day'),
      supabase.from('workouts').select('*').gte('started_at', parseDay(since).toISOString()).order('started_at', { ascending: false }),
      supabase.from('measurements').select('*').order('measured_on'),
      supabase.from('weekly_reports').select('*').order('week_start', { ascending: false }).limit(1),
    ]);
    const failed = res.find((r) => r.error);
    if (failed) setError(failed.error.message);
    else {
      setError(null);
      setRaw({ from, to, metrics: res[0].data, workouts: res[1].data, measurements: res[2].data, report: res[3].data[0] ?? null });
    }
    setLoading(false);
  }, [range]);

  useEffect(() => { load(); }, [load]);

  const view = useMemo(() => (raw ? derive(raw) : null), [raw]);
  return { view, error, loading, reload: load };
}

function derive({ from, to, metrics, workouts, measurements, report }) {
  const byDay = Object.fromEntries(metrics.map((m) => [m.day, m]));
  const val = (d, f) => (byDay[d]?.[f] != null ? Number(byDay[d][f]) : null);
  const days = daysBetween(from, to);
  const last7 = daysBetween(addDays(to, -6), to);
  const prev7 = daysBetween(addDays(to, -13), addDays(to, -7));
  const mean = (range, f) => avg(range.map((d) => val(d, f)));
  const ma7 = (d, f) => avg(daysBetween(addDays(d, -6), d).map((x) => val(x, f)));

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

  const thisWeek = weekStart(to);
  const weeks = Array.from({ length: 12 }, (_, i) => addDays(thisWeek, -7 * (11 - i)));
  const perWeek = Object.fromEntries(weeks.map((w) => [w, 0]));
  for (const w of workouts) {
    const ws = weekStart(isoDay(new Date(w.started_at)));
    if (ws in perWeek) perWeek[ws] += 1;
  }

  const kpi = (f) => ({ cur: mean(last7, f), prev: mean(prev7, f) });
  return {
    from,
    to,
    lastDay: metrics.at(-1)?.day ?? null,
    series,
    weeks: weeks.map((w) => ({ week: w, count: perWeek[w], current: w === thisWeek })),
    workoutsThisWeek: perWeek[thisWeek],
    workoutsAvg4: avg(weeks.slice(-5, -1).map((w) => perWeek[w])),
    kpis: {
      weight: kpi('weight_kg'),
      fat: kpi('body_fat_pct'),
      steps: kpi('steps'),
      sleep: kpi('sleep_min'),
      rhr: kpi('resting_hr'),
    },
    workouts,
    waist: measurements.filter((m) => m.waist_cm != null).map((m) => ({ day: m.measured_on, value: Number(m.waist_cm) })),
    gym: measurements.filter((m) => m.source === 'academia'),
    report,
  };
}
