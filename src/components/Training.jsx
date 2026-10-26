import { addDays, longDate, parseDay, weekStart } from '../lib/dates';
import { fmt } from '../lib/format';

// Calendário de consistência: colunas = semanas, linhas = seg..dom; cor pela duração do treino.
export function TrainingCalendar({ calendar }) {
  if (!calendar.length) return null;
  const first = weekStart(calendar[0].day);
  const byDay = Object.fromEntries(calendar.map((c) => [c.day, c.minutes]));
  const weeks = [];
  for (let w = first; w <= calendar.at(-1).day; w = addDays(w, 7)) weeks.push(w);
  const level = (m) => (m == null ? 'bg-transparent' : m === 0 ? 'bg-zinc-100 dark:bg-zinc-800'
    : m < 30 ? 'bg-[var(--series-1-soft)]' : m < 60 ? 'bg-[var(--series-1)]/70' : 'bg-[var(--series-1)]');
  const big = weeks.length <= 6;
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      <div className={`grid grid-rows-7 gap-1 pr-1 text-[10px] text-zinc-400 ${big ? 'text-xs' : ''}`}>
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => <span key={i} className={`flex items-center ${big ? 'h-8' : 'h-3.5'}`}>{d}</span>)}
      </div>
      {weeks.map((w) => (
        <div key={w} className="grid grid-rows-7 gap-1">
          {Array.from({ length: 7 }, (_, i) => {
            const d = addDays(w, i);
            const m = d in byDay ? byDay[d] : null;
            return (
              <span key={d} title={m == null ? '' : `${longDate(d)}: ${m ? `${m} min` : 'sem treino'}`}
                className={`${big ? 'size-8 rounded-lg' : 'size-3.5 rounded-[4px]'} ${level(m)} grid place-items-center text-[10px] font-medium ${m ? 'text-white' : 'text-zinc-400'}`}>
                {big && m != null ? parseDay(d).getDate() : ''}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Distribuição por tipo de treino: quantidade, minutos e FC média.
export function TypeBreakdown({ types }) {
  if (!types.length) return null;
  const max = Math.max(...types.map((t) => t.minutes || t.count));
  return (
    <ul className="grid gap-3">
      {types.map((t) => (
        <li key={t.type}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium capitalize">{t.type}</span>
            <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              {t.count}× · {t.minutes} min{t.avgHr != null ? ` · ${fmt(t.avgHr, 0)} bpm` : ''}
            </span>
          </div>
          <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-2 rounded-full bg-[var(--series-1)]" style={{ width: `${Math.max(4, ((t.minutes || t.count) / max) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
