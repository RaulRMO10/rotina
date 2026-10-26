import { useEffect, useState } from 'react';
import { Activity, LogOut, Plus, RefreshCw } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useDashboard } from './lib/useDashboard';
import { longDate } from './lib/dates';
import { fmt } from './lib/format';
import { Button, Card, CardHeader, Empty, Segmented, SectionTitle } from './components/ui';
import { DailyBars, SimpleLine, TrendChart, WeeksChart } from './components/charts';
import { Kpis } from './components/Kpis';
import { ReportCard } from './components/ReportCard';
import { WorkoutList } from './components/WorkoutList';
import { WeeklyForm } from './components/WeeklyForm';
import { Photos } from './components/Photos';
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

function Dashboard({ userId }) {
  const [range, setRange] = useState(90);
  const [formOpen, setFormOpen] = useState(false);
  const [photoVersion, setPhotoVersion] = useState(0);
  const { view, error, loading, reload } = useDashboard(range);

  const afterSave = async () => { setPhotoVersion((v) => v + 1); await reload(); };

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-blue-600 text-white"><Activity className="size-4" /></span>
            <span className="hidden font-semibold tracking-tight min-[400px]:inline">Rotina</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Segmented value={range} onChange={setRange} options={[{ value: 30, label: '30d' }, { value: 90, label: '90d' }, { value: 365, label: '1a' }]} />
            <Button variant="ghost" className="size-9 px-0" onClick={reload} aria-label="Atualizar">
              <RefreshCw size={18} className={`${loading ? 'animate-spin' : ''}`} />
            </Button>
            <div className="hidden sm:block"><Button onClick={() => setFormOpen(true)}><Plus className="size-4" />Registrar semana</Button></div>
            <Button variant="ghost" className="size-9 px-0" onClick={() => supabase.auth.signOut()} aria-label="Sair"><LogOut size={18} /></Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6">
        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">Erro ao carregar: {error}</p>}
        {!view ? <Skeleton /> : (
          <>
            <div className="mb-5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className={`size-2 rounded-full ${view.lastDay ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
              {view.lastDay ? `Último dado do relógio: ${longDate(view.lastDay)}` : 'Aguardando a primeira sincronização do relógio'}
            </div>

            <ReportCard report={view.report} onGenerated={reload} />
            <div className="mt-4"><Kpis view={view} /></div>

            <SectionTitle>Consistência</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-5">
              <Card className="lg:col-span-3">
                <CardHeader title="Treinos por semana" subtitle="Últimas 12 semanas · semana atual em destaque" />
                <WeeksChart weeks={view.weeks} />
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader title="Últimos treinos" />
                <WorkoutList workouts={view.workouts} />
              </Card>
            </div>

            <SectionTitle>Composição corporal</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader title="Peso" badge="relógio" subtitle="Pontos diários e média móvel de 7 dias" />
                <TrendChart data={view.series} dailyKey="weight" maKey="weightMa" unit="kg" empty="Sem pesagens neste período." />
              </Card>
              <Card>
                <CardHeader title="% de gordura" badge="relógio" subtitle="Pontos diários e média móvel de 7 dias" />
                <TrendChart data={view.series} dailyKey="fat" maKey="fatMa" unit="%" empty="Faça uma medição de composição corporal no relógio." />
              </Card>
            </div>

            <SectionTitle>Atividade e recuperação</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader title="Passos" subtitle="Por dia" />
                <DailyBars data={view.series} dataKey="steps" name="passos" unit="" empty="Sem passos neste período." />
              </Card>
              <Card>
                <CardHeader title="Sono" subtitle="Horas por noite (dia em que acordou)" />
                <DailyBars data={view.series} dataKey="sleepH" name="sono" unit="h" digits={1} empty="Durma com o relógio para ver o sono aqui." />
              </Card>
              <Card>
                <CardHeader title="FC de repouso" subtitle="bpm · tendência" />
                <SimpleLine data={view.series} dataKey="rhr" name="FC repouso" unit="bpm" empty="Sem FC de repouso neste período." />
              </Card>
            </div>

            <SectionTitle>Medidas</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader title="Cintura" subtitle="cm · do registro semanal" />
                <SimpleLine data={view.waist} dataKey="value" name="cintura" unit="cm" empty="Registre a cintura no registro da semana." />
              </Card>
              <Card>
                <CardHeader title="Bioimpedância" badge="academia" subtitle="Série própria: não comparar com o relógio" />
                <GymSummary gym={view.gym} />
              </Card>
            </div>

            <SectionTitle>Fotos</SectionTitle>
            <Card><Photos userId={userId} version={photoVersion} /></Card>
          </>
        )}
      </main>

      {/* Botão flutuante no celular */}
      <Button className="fixed bottom-5 right-5 z-30 h-12 rounded-2xl px-5 shadow-lg shadow-zinc-950/20 sm:hidden" onClick={() => setFormOpen(true)}>
        <Plus className="size-4" />Registrar semana
      </Button>

      <WeeklyForm open={formOpen} onClose={() => setFormOpen(false)} userId={userId} onSaved={afterSave} />
    </div>
  );
}

function GymSummary({ gym }) {
  const fat = gym.filter((m) => m.body_fat_pct != null).map((m) => ({ day: m.measured_on, value: Number(m.body_fat_pct) }));
  const last = gym.at(-1);
  if (!last) return <Empty>Sem medições da academia. Registre no registro da semana.</Empty>;
  const stat = (label, v, unit) => (
    <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-800/60">
      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="text-sm font-semibold tabular-nums">{v == null ? '—' : `${fmt(Number(v))} ${unit}`}</div>
    </div>
  );
  return (
    <>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {stat('% gordura', last.body_fat_pct, '%')}
        {stat('Músculo', last.muscle_mass_kg, 'kg')}
        {stat('Peso', last.weight_kg, 'kg')}
      </div>
      <SimpleLine data={fat} dataKey="value" name="% gordura" unit="%" height="h-36" empty="Sem % de gordura registrado." />
    </>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-4">
      <div className="h-32 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-36 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />)}
      </div>
      <div className="h-72 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />
    </div>
  );
}
