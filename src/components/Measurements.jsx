import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { longDate } from '../lib/dates';
import { fmt } from '../lib/format';
import { METRIC_FIELDS, SOURCES } from '../lib/derive';
import { SourceLines } from './charts';
import { Card, CardHeader } from './ui';

const LABELS = Object.fromEntries(SOURCES.map((s) => [s.key, s.label]));

// Medidas manuais do período: um gráfico por medida, uma linha por fonte.
export function Measurements({ rows, onChanged }) {
  const available = METRIC_FIELDS.filter((f) => rows.some((r) => r[f.key] != null));
  const [picked, setPicked] = useState(null);
  const field = available.find((f) => f.key === picked) || available[0];

  const { data, sources } = useMemo(() => {
    if (!field) return { data: [], sources: [] };
    const byDay = {};
    const used = new Set();
    rows.filter((r) => r[field.key] != null).forEach((r) => {
      byDay[r.measured_on] = { ...(byDay[r.measured_on] || { day: r.measured_on }), [r.source]: Number(r[field.key]) };
      used.add(r.source);
    });
    return { data: Object.values(byDay).sort((a, b) => a.day.localeCompare(b.day)), sources: SOURCES.map((s) => s.key).filter((s) => used.has(s)) };
  }, [rows, field]);

  async function remove(id) {
    if (!confirm('Apagar esta medida?')) return;
    const { error } = await supabase.from('measurements').delete().eq('id', id);
    if (error) alert(error.message);
    else onChanged();
  }

  if (!field) return null;
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader title={field.label} subtitle={`${field.unit} · cada fonte é uma série própria`} />
        <div className="mb-3 flex flex-wrap gap-1.5">
          {available.map((f) => (
            <button key={f.key} type="button" onClick={() => setPicked(f.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${f.key === field.key
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`}>
              {f.label}
            </button>
          ))}
        </div>
        <SourceLines data={data} sources={sources} unit={field.unit} labels={LABELS} />
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader title="Registros" subtitle={`${rows.length} no período`} />
        <ul className="-my-1 max-h-80 divide-y divide-zinc-100 overflow-y-auto dark:divide-zinc-800">
          {[...rows].reverse().map((r) => (
            <li key={r.id} className="group flex items-start gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{longDate(r.measured_on)} <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{LABELS[r.source] || r.source}</span></div>
                <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {METRIC_FIELDS.filter((f) => r[f.key] != null).map((f) => `${f.label} ${fmt(Number(r[f.key]))} ${f.unit}`).join(' · ')}
                </div>
                {r.notes && <div className="mt-0.5 text-xs italic text-zinc-400">{r.notes}</div>}
              </div>
              <button type="button" onClick={() => remove(r.id)} aria-label="Apagar medida"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10">
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
