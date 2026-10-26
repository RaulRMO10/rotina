import { Bike, Dumbbell, Footprints, Activity } from 'lucide-react';
import { Empty } from './ui';

const icons = { bike: Bike, 'musculação': Dumbbell, caminhada: Footprints, esteira: Footprints, corrida: Footprints };

export function WorkoutList({ workouts }) {
  if (!workouts.length) return <Empty>Nenhum treino ainda. Os treinos registrados no relógio aparecem aqui.</Empty>;
  return (
    <ul className="-my-1 divide-y divide-zinc-100 dark:divide-zinc-800">
      {workouts.slice(0, 7).map((w) => {
        const Icon = icons[w.type] || Activity;
        const d = new Date(w.started_at);
        return (
          <li key={w.source_id || w.id} className="flex items-center gap-3 py-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <Icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium capitalize">{w.type}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })} · {d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="text-right text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              {w.duration_min != null && <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{w.duration_min} min</div>}
              {[w.avg_hr != null && `${w.avg_hr} bpm`, w.kcal != null && `${w.kcal} kcal`].filter(Boolean).join(' · ')}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
