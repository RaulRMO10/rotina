import { useState } from 'react';
import { CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react';
import { today } from '../lib/dates';
import { makePeriod, periodLabel, periodRange, shiftPeriod } from '../lib/period';
import { Button, Segmented, inputClass } from './ui';

// Escolha do período: semana / mês / livre / tudo, com setas para navegar.
export function PeriodBar({ period, onChange, firstDay }) {
  const [custom, setCustom] = useState(false);
  const t = today();
  const canNext = period.kind !== 'all' && period.to < t;
  const canPrev = period.kind !== 'all' && (!firstDay || period.from > firstDay);

  const pick = (kind) => {
    setCustom(kind === 'custom');
    if (kind === 'custom') onChange({ kind: 'custom', from: period.from, to: period.to > t ? t : period.to });
    else onChange(makePeriod(kind, t, firstDay));
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-1">
        <Button variant="ghost" icon disabled={!canPrev} onClick={() => onChange(shiftPeriod(period, -1))} aria-label="Período anterior">
          <ChevronLeft size={18} />
        </Button>
        <div className="min-w-0 px-1 text-center sm:text-left">
          <div className="text-lg font-semibold tracking-tight">{periodLabel(period)}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{periodRange(period)}</div>
        </div>
        <Button variant="ghost" icon disabled={!canNext} onClick={() => onChange(shiftPeriod(period, 1))} aria-label="Próximo período">
          <ChevronRight size={18} />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          value={custom ? 'custom' : period.kind}
          onChange={pick}
          options={[
            { value: 'week', label: 'Semana' },
            { value: 'month', label: 'Mês' },
            { value: 'all', label: 'Tudo' },
            { value: 'custom', label: <span className="inline-flex items-center gap-1"><CalendarRange size={13} />Datas</span> },
          ]}
        />
        {custom && (
          <div className="flex items-center gap-1.5">
            <input type="date" aria-label="De" className={`${inputClass} h-8 w-36 text-xs`} value={period.from} max={period.to}
              onChange={(e) => e.target.value && onChange({ kind: 'custom', from: e.target.value, to: period.to })} />
            <span className="text-xs text-zinc-400">a</span>
            <input type="date" aria-label="Até" className={`${inputClass} h-8 w-36 text-xs`} value={period.to} min={period.from} max={t}
              onChange={(e) => e.target.value && onChange({ kind: 'custom', from: period.from, to: e.target.value })} />
          </div>
        )}
      </div>
    </div>
  );
}
