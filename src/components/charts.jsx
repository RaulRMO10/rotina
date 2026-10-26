import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { longDate, parseDay, shortDay } from '../lib/dates';

const axis = { stroke: 'var(--axis)', fontSize: 11, tickLine: false, axisLine: false };
const yTick = (v) => v.toLocaleString('pt-BR');
const margin = { top: 6, right: 6, bottom: 0, left: 0 };

// Períodos curtos: "seg 20". Longos: "20/10".
export const dayTick = (len) => (len <= 14
  ? (s) => `${parseDay(s).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')} ${s.slice(8)}`
  : shortDay);

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
          <span className="ml-auto pl-3 font-semibold tabular-nums">
            {Number(p.value).toLocaleString('pt-BR', { maximumFractionDigits: digits })} {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

// Pontos diários; com período ≥ 14 dias, também a média móvel de 7 dias.
export function TrendChart({ data, dailyKey, maKey, unit, showMa, len }) {
  return (
    <div className="h-56">
      <ResponsiveContainer>
        <LineChart data={data} margin={margin}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={dayTick(len)} minTickGap={24} {...axis} />
          <YAxis domain={['auto', 'auto']} width={52} tickFormatter={yTick} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} />} cursor={{ stroke: 'var(--axis)', strokeDasharray: 3 }} />
          {showMa ? (
            <>
              <Line name="dia" dataKey={dailyKey} stroke="transparent" dot={{ r: 2.5, fill: 'var(--series-1-soft)', strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} />
              <Line name="média 7d" dataKey={maKey} stroke="var(--series-1)" strokeWidth={2} dot={false} connectNulls type="monotone" isAnimationActive={false} />
            </>
          ) : (
            <Line name="dia" dataKey={dailyKey} stroke="var(--series-1)" strokeWidth={2} connectNulls dot={{ r: 3.5, fill: 'var(--series-1)', strokeWidth: 0 }} activeDot={{ r: 5 }} isAnimationActive={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DailyBars({ data, dataKey, unit, name, digits = 0, len }) {
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={data} margin={margin}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={dayTick(len)} minTickGap={24} {...axis} />
          <YAxis width={52} tickFormatter={yTick} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} digits={digits} />} cursor={{ fill: 'var(--grid)', opacity: 0.5 }} />
          <Bar name={name} dataKey={dataKey} fill="var(--series-1)" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SimpleLine({ data, dataKey, unit, name, len, height = 'h-48' }) {
  return (
    <div className={height}>
      <ResponsiveContainer>
        <LineChart data={data} margin={margin}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={dayTick(len)} minTickGap={24} {...axis} />
          <YAxis domain={['auto', 'auto']} width={52} tickFormatter={yTick} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} />} cursor={{ stroke: 'var(--axis)', strokeDasharray: 3 }} />
          <Line name={name} dataKey={dataKey} stroke="var(--series-1)" strokeWidth={2} connectNulls type="monotone" dot={{ r: 3, fill: 'var(--series-1)', strokeWidth: 0 }} activeDot={{ r: 5 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Treinos por dia ou por semana; o dia/semana atual em destaque.
export function WorkoutBars({ buckets, len }) {
  const isWeek = buckets.unit === 'week';
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={buckets.items} margin={margin}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="key" tickFormatter={isWeek ? shortDay : dayTick(len)} minTickGap={16} {...axis} />
          <YAxis allowDecimals={false} width={52} {...axis} />
          <Tooltip
            content={<TooltipBox unit="treinos" digits={0} labelFormat={(k) => (isWeek ? `Semana de ${longDate(k)}` : longDate(k))} />}
            cursor={{ fill: 'var(--grid)', opacity: 0.5 }}
          />
          <Bar name="treinos" dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={36} isAnimationActive={false}>
            {buckets.items.map((b) => <Cell key={b.key} fill={b.current ? 'var(--series-1)' : 'var(--series-1-soft)'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Uma linha por fonte (casa / academia / profissional): séries separadas, com legenda.
const SOURCE_COLORS = { casa: 'var(--series-1)', academia: 'var(--series-2)', profissional: 'var(--series-3)' };
export function SourceLines({ data, sources, unit, labels }) {
  return (
    <div className="h-56">
      <ResponsiveContainer>
        <LineChart data={data} margin={margin}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="day" tickFormatter={shortDay} minTickGap={24} {...axis} />
          <YAxis domain={['auto', 'auto']} width={52} tickFormatter={yTick} {...axis} />
          <Tooltip content={<TooltipBox unit={unit} />} cursor={{ stroke: 'var(--axis)', strokeDasharray: 3 }} />
          {sources.length > 1 && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: 'var(--axis)' }} />}
          {sources.map((s) => (
            <Line key={s} name={labels[s]} dataKey={s} stroke={SOURCE_COLORS[s]} strokeWidth={2} connectNulls
              dot={{ r: 3.5, fill: SOURCE_COLORS[s], strokeWidth: 0 }} activeDot={{ r: 5 }} isAnimationActive={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Sparkline({ data, dataKey }) {
  if (data.filter((d) => d[dataKey] != null).length < 2) return <div className="h-10" />;
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
