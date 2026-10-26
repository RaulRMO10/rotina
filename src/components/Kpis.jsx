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
        {unit && <span className="text-sm text-zinc-500 dark:text-zinc-400">{unit}</span>}
      </div>
      <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{delta}</div>
      <div className="mt-auto pt-2">{spark}</div>
    </div>
  );
}

const vsPrev = (m, digits, unit = '') => (m.prev == null
  ? `média de ${m.n} ${m.n === 1 ? 'dia' : 'dias'}`
  : `${signed(m.cur - m.prev, digits)}${unit} vs período anterior`);

// Só mostra o que tem dado no período.
export function Kpis({ view }) {
  const { metrics: m, series } = view;
  const cards = [
    <Kpi key="w" icon={Dumbbell} label="Treinos" value={String(view.workoutCount)}
      delta={`${view.workoutMinutes} min · antes: ${view.prevWorkoutCount}`} />,
  ];
  if (m.weight.n) cards.push(<Kpi key="p" icon={Scale} label="Peso médio" value={fmt(m.weight.cur)} unit="kg" delta={vsPrev(m.weight, 1, ' kg')} spark={<Sparkline data={series} dataKey="weight" />} />);
  if (m.fat.n) cards.push(<Kpi key="f" icon={Percent} label="Gordura média" value={fmt(m.fat.cur)} unit="%" delta={vsPrev(m.fat, 1, ' pp')} spark={<Sparkline data={series} dataKey="fat" />} />);
  if (m.steps.n) cards.push(<Kpi key="s" icon={Footprints} label="Passos/dia" value={fmt(m.steps.cur, 0)} delta={vsPrev(m.steps, 0)} spark={<Sparkline data={series} dataKey="steps" />} />);
  if (m.sleep.n) cards.push(<Kpi key="z" icon={Moon} label="Sono/noite" value={fmtSleep(m.sleep.cur)} delta={m.sleep.prev == null ? `média de ${m.sleep.n} noites` : `antes: ${fmtSleep(m.sleep.prev)}`} spark={<Sparkline data={series} dataKey="sleepH" />} />);
  if (m.rhr.n) cards.push(<Kpi key="r" icon={HeartPulse} label="FC repouso" value={fmt(m.rhr.cur, 0)} unit="bpm" delta={vsPrev(m.rhr, 0, ' bpm')} spark={<Sparkline data={series} dataKey="rhr" />} />);
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{cards}</div>;
}
