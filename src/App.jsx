import { useEffect, useMemo, useState } from 'react';
import { Activity, LogOut, Plus, RefreshCw } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useData } from './lib/useData';
import { derive, firstDataDay } from './lib/derive';
import { makePeriod } from './lib/period';
import { longDate } from './lib/dates';
import { fmt } from './lib/format';
import { Button, Card, CardHeader, Empty } from './components/ui';
import { DailyBars, SimpleLine, TrendChart, WorkoutBars } from './components/charts';
import { Kpis } from './components/Kpis';
import { Insights } from './components/Insights';
import { ReportCard } from './components/ReportCard';
import { WorkoutList } from './components/WorkoutList';
import { TrainingCalendar, TypeBreakdown } from './components/Training';
import { Measurements } from './components/Measurements';
import { Photos } from './components/Photos';
import { RecordDialog } from './components/RecordDialog';
import { PeriodBar } from './components/PeriodBar';
import { Login } from './components/Login';

export default function App() {
  const [session, setSession] = useState(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  if (session === undefined) return null;
  if (!session) return <Login />;
  return <Dashboard userId={session.user.id} />;
}

const VIEWS = [
  { key: 'resumo', label: 'Resumo' },
  { key: 'treinos', label: 'Treinos' },
  { key: 'corpo', label: 'Corpo' },
  { key: 'recuperacao', label: 'Recuperação' },
  { key: 'medidas', label: 'Medidas' },
  { key: 'fotos', label: 'Fotos' },
];

function Dashboard({ userId }) {
  const { data, error, loading, reload } = useData();
  const [period, setPeriod] = useState(() => makePeriod('week'));
  const [view, setView] = useState(() => (VIEWS.some((v) => v.key === location.hash.slice(1)) ? location.hash.slice(1) : 'resumo'));
  const [dialog, setDialog] = useState(null); // aba do diálogo aberto ou null
  const [photoVersion, setPhotoVersion] = useState(0);

  const first = data ? firstDataDay(data) : null;
  const v = useMemo(() => (data ? derive(data, period) : null), [data, period]);

  // Visões sem dado no período somem; Resumo, Medidas e Fotos ficam (têm ação de registrar).
  const available = useMemo(() => {
    if (!v) return VIEWS;
    const has = {
      treinos: v.workoutCount > 0,
      corpo: v.has.weight || v.has.fat,
      recuperacao: v.has.sleep || v.has.rhr || v.has.steps,
    };
    return VIEWS.filter((x) => has[x.key] ?? true);
  }, [v]);
  const current = available.some((x) => x.key === view) ? view : 'resumo';
  const go = (key) => { setView(key); history.replaceState(null, '', `#${key}`); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const onSaved = async (tab) => { if (tab === 'foto') setPhotoVersion((n) => n + 1); await reload(); };

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-zinc-50/85 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/85">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-blue-600 text-white"><Activity size={16} /></span>
            <span className="font-semibold tracking-tight">Rotina</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" icon onClick={reload} aria-label="Atualizar"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></Button>
            <div className="hidden sm:block"><Button onClick={() => setDialog('medidas')}><Plus size={16} />Registrar</Button></div>
            <Button variant="ghost" icon onClick={() => supabase.auth.signOut()} aria-label="Sair"><LogOut size={18} /></Button>
          </div>
        </div>
        <nav className="mx-auto max-w-6xl px-4">
          <div className="-mx-4 flex gap-1 overflow-x-auto px-4 pt-2 [scrollbar-width:none]">
            {available.map((x) => (
              <button key={x.key} type="button" onClick={() => go(x.key)} aria-current={current === x.key ? 'page' : undefined}
                className={`relative shrink-0 px-3 pb-2.5 pt-1.5 text-sm font-medium transition-colors ${current === x.key
                  ? 'text-zinc-900 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-blue-600 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>
                {x.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5">
        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">Erro ao carregar: {error}</p>}
        {!v ? <Skeleton /> : (
          <>
            <PeriodBar period={period} onChange={setPeriod} firstDay={first} />
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className={`size-1.5 rounded-full ${data.metrics.length ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
              {data.metrics.length ? `Relógio: dados de ${longDate(data.metrics[0].day)} a ${longDate(data.metrics.at(-1).day)}` : 'Aguardando a primeira sincronização do relógio'}
            </div>
            <div className="mt-4"><Insights items={v.insights} /></div>
            <div className="mt-5">
              {current === 'resumo' && <Resumo v={v} reload={reload} go={go} onRecord={setDialog} />}
              {current === 'treinos' && <Treinos v={v} />}
              {current === 'corpo' && <Corpo v={v} />}
              {current === 'recuperacao' && <Recuperacao v={v} />}
              {current === 'medidas' && (v.measurements.length
                ? <Measurements rows={v.measurements} onChanged={reload} />
                : <Empty className="h-48 flex-col gap-3"><span>Nenhuma medida neste período.</span><Button onClick={() => setDialog('medidas')}><Plus size={16} />Registrar medida</Button></Empty>)}
              {current === 'fotos' && <Photos userId={userId} version={photoVersion} onAdd={() => setDialog('foto')} />}
            </div>
          </>
        )}
      </main>

      <Button className="fixed bottom-5 right-5 z-30 h-12 rounded-2xl px-5 shadow-lg shadow-zinc-950/20 sm:hidden" onClick={() => setDialog(current === 'fotos' ? 'foto' : 'medidas')}>
        <Plus size={16} />Registrar
      </Button>
      <RecordDialog open={dialog !== null} initialTab={dialog || 'medidas'} onClose={() => setDialog(null)} userId={userId} onSaved={onSaved} />
    </div>
  );
}

function Resumo({ v, reload, go, onRecord }) {
  return (
    <div className="grid gap-4">
      <ReportCard report={v.report} periodKind={v.period.kind} onGenerated={reload} />
      {v.isEmpty ? (
        <Empty className="h-48 flex-col gap-3">
          <span>Sem dados neste período. Use as setas para voltar no tempo ou escolha "Tudo".</span>
          <Button variant="outline" onClick={() => onRecord('medidas')}><Plus size={16} />Registrar medida</Button>
        </Empty>
      ) : (
        <>
          <Kpis view={v} />
          <div className="grid gap-4 lg:grid-cols-2">
            {v.workoutCount > 0 && (
              <Card>
                <CardHeader title="Treinos" subtitle={v.workoutBuckets.unit === 'week' ? 'Por semana' : 'Por dia'} action={<Button variant="ghost" onClick={() => go('treinos')}>Ver mais</Button>} />
                <WorkoutBars buckets={v.workoutBuckets} len={v.lengthDays} />
              </Card>
            )}
            {v.has.weight && (
              <Card>
                <CardHeader title="Peso" badge="relógio" subtitle={rateText(v.weightRate, 'kg')} action={<Button variant="ghost" onClick={() => go('corpo')}>Ver mais</Button>} />
                <TrendChart data={v.series} dailyKey="weight" maKey="weightMa" unit="kg" showMa={v.showMa} len={v.lengthDays} />
              </Card>
            )}
          </div>
          {v.note && (
            <Card>
              <CardHeader title="Nota da semana" subtitle={`Semana de ${longDate(v.note.week_start)}`} />
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{v.note.note}</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

const rateText = (rate, unit) => (rate == null ? 'Pontos diários' : `Ritmo: ${rate > 0 ? '+' : ''}${fmt(rate, unit === 'kg' ? 2 : 1)} ${unit}/semana`);

function Treinos({ v }) {
  const stat = (label, value) => (
    <div className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/60">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
  const perWeek = v.workoutCount / Math.max(1, v.lengthDays / 7);
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stat('Treinos', v.workoutCount)}
        {stat('Dias ativos', `${v.activeDays}/${v.series.length}`)}
        {stat('Minutos', v.workoutMinutes)}
        {stat(v.lengthDays > 7 ? 'Média por semana' : 'Sequência', v.lengthDays > 7 ? fmt(perWeek) : `${v.streak} sem.`)}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Consistência" subtitle="Cada quadrado é um dia · mais escuro = treino mais longo" />
          <TrainingCalendar calendar={v.calendar} />
          <div className="mt-5"><WorkoutBars buckets={v.workoutBuckets} len={v.lengthDays} /></div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Por tipo" subtitle="Quantidade · minutos · FC média" />
          <TypeBreakdown types={v.types} />
        </Card>
      </div>
      <Card>
        <CardHeader title="Treinos do período" subtitle={`${v.workoutCount} registrados pelo relógio`} />
        <WorkoutList workouts={v.workouts} limit={50} />
      </Card>
    </div>
  );
}

function Corpo({ v }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {v.has.weight && (
        <Card>
          <CardHeader title="Peso" badge="relógio" subtitle={rateText(v.weightRate, 'kg')} />
          <TrendChart data={v.series} dailyKey="weight" maKey="weightMa" unit="kg" showMa={v.showMa} len={v.lengthDays} />
        </Card>
      )}
      {v.has.fat && (
        <Card>
          <CardHeader title="% de gordura" badge="relógio" subtitle={rateText(v.fatRate, 'pp')} />
          <TrendChart data={v.series} dailyKey="fat" maKey="fatMa" unit="%" showMa={v.showMa} len={v.lengthDays} />
        </Card>
      )}
      <p className="text-xs text-zinc-500 md:col-span-2 dark:text-zinc-400">
        Bioimpedância varia com hidratação e horário: olhe a tendência, não o dia. Medidas de casa, academia ou profissional ficam na aba Medidas, cada uma como série própria.
      </p>
    </div>
  );
}

function Recuperacao({ v }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {v.has.sleep && (
        <Card className="md:col-span-2">
          <CardHeader title="Sono" subtitle="Horas por noite (conta no dia em que você acorda)" />
          <DailyBars data={v.series} dataKey="sleepH" name="sono" unit="h" digits={1} len={v.lengthDays} />
        </Card>
      )}
      {v.has.rhr && (
        <Card>
          <CardHeader title="FC de repouso" subtitle="bpm · caindo costuma indicar melhor condicionamento" />
          <SimpleLine data={v.series} dataKey="rhr" name="FC repouso" unit="bpm" len={v.lengthDays} />
        </Card>
      )}
      {v.has.steps && (
        <Card>
          <CardHeader title="Passos" subtitle="Por dia" />
          <DailyBars data={v.series} dataKey="steps" name="passos" unit="" len={v.lengthDays} />
        </Card>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-4">
      <div className="h-12 w-64 animate-pulse rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60" />
      <div className="h-32 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />)}
      </div>
    </div>
  );
}
