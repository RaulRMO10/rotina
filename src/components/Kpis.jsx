import { Dumbbell, Footprints, HeartPulse, Moon, Percent, Scale } from 'lucide-react';
import { fmt, fmtSleep, signed } from '../lib/format';
import { Sparkline } from './charts';

function Kpi({ icon: Icon, label, value, unit, delta, spark }) {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:shadow-none">
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <Icon className="size-3.5" aria-hidden />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
        {unit && value !== '—' && <span className="text-sm text-zinc-500 dark:text-zinc-400">{unit}</span>}
      </div>
      <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{delta}</div>
      <div className="mt-auto pt-2">{spark}</div>
    </div>
  );
}

const vsPrev = (k, digits, unit = '') => {
  if (k.cur == null) return 'sem dados nos últimos 7 dias';
  if (k.prev == null) return 'média dos últimos 7 dias';
  return `${signed(k.cur - k.prev, digits)}${unit} vs semana anterior`;
};

export function Kpis({ view }) {
  const { kpis, series } = view;
  const recent = series.slice(-30);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <Kpi
        icon={Dumbbell}
        label="Treinos na semana"
        value={String(view.workoutsThisWeek)}
        delta={`média 4 sem.: ${fmt(view.workoutsAvg4)}`}
        spark={<div className="flex h-10 items-end gap-1">{view.weeks.slice(-8).map((w) => (
          <div key={w.week} className={`flex-1 rounded-sm ${w.current ? 'bg-[var(--series-1)]' : 'bg-[var(--series-1-soft)]'}`} style={{ height: `${Math.max(8, Math.min(100, w.count * 20))}%` }} />
        ))}</div>}
      />
      <Kpi icon={Scale} label="Peso · 7d" value={fmt(kpis.weight.cur)} unit="kg" delta={vsPrev(kpis.weight, 1, ' kg')} spark={<Sparkline data={recent} dataKey="weightMa" />} />
      <Kpi icon={Percent} label="Gordura · 7d" value={fmt(kpis.fat.cur)} unit="%" delta={vsPrev(kpis.fat, 1, ' pp')} spark={<Sparkline data={recent} dataKey="fatMa" />} />
      <Kpi icon={Footprints} label="Passos · 7d" value={fmt(kpis.steps.cur, 0)} delta={vsPrev(kpis.steps, 0)} spark={<Sparkline data={recent} dataKey="steps" />} />
      <Kpi icon={Moon} label="Sono · 7d" value={fmtSleep(kpis.sleep.cur)} delta={kpis.sleep.prev == null ? 'média dos últimos 7 dias' : `semana anterior: ${fmtSleep(kpis.sleep.prev)}`} spark={<Sparkline data={recent} dataKey="sleepH" />} />
      <Kpi icon={HeartPulse} label="FC repouso · 7d" value={fmt(kpis.rhr.cur, 0)} unit="bpm" delta={vsPrev(kpis.rhr, 0, ' bpm')} spark={<Sparkline data={recent} dataKey="rhr" />} />
    </div>
  );
}
