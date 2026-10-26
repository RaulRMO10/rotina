import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { longDate, shortDay } from '../lib/dates';
import { Empty } from './ui';

const axis = { stroke: 'var(--axis)', fontSize: 11, tickLine: false, axisLine: false };

function TooltipBox({ active, payload, label, unit, labelFormat = longDate, digits = 1 }) {
  const rows = (payload || []).filter((p) => p.value != null);
  if (!active || !rows.length) return null;
  return (
    <div className="rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95">
      <div className="mb-1 font-medium text-zinc-500 dark:text-zinc-400">{labelFormat(label)}</div>
      {rows.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="text-zinc-500 dark:text-zinc-400">{p.name}</span>
          <span className="ml-auto font-semibold tabular-nums">
            {Number(p.value).toLocaleString('pt-BR', { maximumFractionDigits: digits })} {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

const has = (data, key) => data.some((d) => d[key] != null);

// Pontos diários claros + média móvel de 7 dias.
export function TrendChart({ data, dailyKey, maKey, unit, empty }) {
  if (!has(data, dailyKey)) return <Empty>{empty}</Empty>;
  return (
    <div className="h-56">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={shortDay} minTickGap={28} {...axis} />
          <YAxis domain={['auto', 'auto']} width={52} tickFormatter={(v) => v.toLocaleString('pt-BR')} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} />} cursor={{ stroke: 'var(--axis)', strokeDasharray: 3 }} />
          <Line name="dia" dataKey={dailyKey} stroke="transparent" dot={{ r: 2.5, fill: 'var(--series-1-soft)', strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} />
          <Line name="média 7d" dataKey={maKey} stroke="var(--series-1)" strokeWidth={2} dot={false} connectNulls type="monotone" isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DailyBars({ data, dataKey, unit, name, empty, digits = 0 }) {
  if (!has(data, dataKey)) return <Empty>{empty}</Empty>;
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={shortDay} minTickGap={28} {...axis} />
          <YAxis width={52} tickFormatter={(v) => v.toLocaleString('pt-BR')} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} digits={digits} />} cursor={{ fill: 'var(--grid)', opacity: 0.5 }} />
          <Bar name={name} dataKey={dataKey} fill="var(--series-1)" radius={[4, 4, 0, 0]} maxBarSize={18} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SimpleLine({ data, dataKey, unit, name, empty, height = 'h-48', xKey = 'day' }) {
  if (!has(data, dataKey)) return <Empty className={height}>{empty}</Empty>;
  return (
    <div className={height}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey={xKey} tickFormatter={shortDay} minTickGap={28} {...axis} />
          <YAxis domain={['auto', 'auto']} width={52} tickFormatter={(v) => v.toLocaleString('pt-BR')} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} />} cursor={{ stroke: 'var(--axis)', strokeDasharray: 3 }} />
          <Line name={name} dataKey={dataKey} stroke="var(--series-1)" strokeWidth={2} connectNulls type="monotone" dot={{ r: 3, fill: 'var(--series-1)', strokeWidth: 0 }} activeDot={{ r: 5 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Treinos por semana: semana atual em destaque.
export function WeeksChart({ weeks }) {
  return (
    <div className="h-64">
      <ResponsiveContainer>
        <BarChart data={weeks} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="week" tickFormatter={shortDay} {...axis} />
          <YAxis allowDecimals={false} width={52} {...axis} />
          <Tooltip
            content={<TooltipBox unit="treinos" digits={0} labelFormat={(w) => `Semana de ${longDate(w)}`} />}
            cursor={{ fill: 'var(--grid)', opacity: 0.5 }}
          />
          <Bar name="treinos" dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={36} isAnimationActive={false}>
            {weeks.map((w) => (
              <Cell key={w.week} fill={w.current ? 'var(--series-1)' : 'var(--series-1-soft)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Sparkline({ data, dataKey }) {
  if (!has(data, dataKey)) return <div className="h-10" />;
  return (
    <div className="h-10">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>
            <linearGradient id={`spark-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--series-1)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--series-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Area dataKey={dataKey} stroke="var(--series-1)" strokeWidth={1.5} fill={`url(#spark-${dataKey})`} connectNulls type="monotone" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
