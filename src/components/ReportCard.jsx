import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { longDate } from '../lib/dates';
import { Button } from './ui';

export function ReportCard({ report, periodKind, onGenerated }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const r = await fetch('/api/weekly-report', {
        method: 'POST',
        headers: { Authorization: `Bearer ${data.session?.access_token ?? ''}` },
      });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.error || `erro ${r.status}`);
      await onGenerated();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-white p-5 dark:border-blue-500/20 dark:from-blue-500/10 dark:via-zinc-900/60 dark:to-zinc-900/60">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Resumo da semana</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {report ? `Semana de ${longDate(report.week_start)} · gerado por IA` : 'Gerado por IA toda segunda de manhã'}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={generate} disabled={busy}>
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Sparkles className="size-4" aria-hidden />}
          {busy ? 'Gerando…' : 'Gerar agora'}
        </Button>
      </div>
      <div className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {report
          ? report.summary
          : periodKind === 'week'
            ? 'Sem resumo para esta semana. "Gerar agora" faz um retrato da semana atual até aqui; o automático sai toda segunda.'
            : 'Sem resumo neste período. "Gerar agora" faz um retrato da semana atual até aqui.'}
      </div>
      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">Não deu para gerar: {error}</p>}
    </section>
  );
}
