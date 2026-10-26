import { addDays, parseDay, isoDay, today, weekStart } from './dates';

const monthStart = (s) => `${s.slice(0, 7)}-01`;
const monthEnd = (s) => { const d = parseDay(monthStart(s)); d.setMonth(d.getMonth() + 1); d.setDate(0); return isoDay(d); };
const shiftMonth = (s, n) => { const d = parseDay(monthStart(s)); d.setMonth(d.getMonth() + n); return isoDay(d); };
export const lengthDays = (p) => Math.round((parseDay(p.to) - parseDay(p.from)) / 864e5) + 1;

// Um período é { kind, from, to }. kind: week | month | all | custom.
export function makePeriod(kind, anchor = today(), firstDay = null) {
  if (kind === 'week') { const from = weekStart(anchor); return { kind, from, to: addDays(from, 6) }; }
  if (kind === 'month') return { kind, from: monthStart(anchor), to: monthEnd(anchor) };
  if (kind === 'all') return { kind, from: firstDay || addDays(today(), -29), to: today() };
  return { kind: 'custom', from: anchor, to: anchor };
}

export function shiftPeriod(p, dir) {
  if (p.kind === 'week') return makePeriod('week', addDays(p.from, 7 * dir));
  if (p.kind === 'month') return makePeriod('month', shiftMonth(p.from, dir));
  const n = lengthDays(p);
  return { ...p, kind: 'custom', from: addDays(p.from, n * dir), to: addDays(p.to, n * dir) };
}

// Período anterior de mesmo tamanho, para comparação.
export function previousPeriod(p) {
  if (p.kind === 'month') return makePeriod('month', shiftMonth(p.from, -1));
  const n = lengthDays(p);
  return { kind: 'custom', from: addDays(p.from, -n), to: addDays(p.from, -1) };
}

const fmtDay = (s, opts) => parseDay(s).toLocaleDateString('pt-BR', opts);
export function periodLabel(p) {
  const t = today();
  if (p.kind === 'week') {
    if (p.from === weekStart(t)) return 'Esta semana';
    if (p.from === addDays(weekStart(t), -7)) return 'Semana passada';
  }
  if (p.kind === 'month') {
    const m = fmtDay(p.from, { month: 'long', year: 'numeric' });
    return m.charAt(0).toUpperCase() + m.slice(1);
  }
  if (p.kind === 'all') return 'Todo o período';
  const sameMonth = p.from.slice(0, 7) === p.to.slice(0, 7);
  return sameMonth
    ? `${fmtDay(p.from, { day: 'numeric' })} a ${fmtDay(p.to, { day: 'numeric', month: 'short' })}`
    : `${fmtDay(p.from, { day: 'numeric', month: 'short' })} a ${fmtDay(p.to, { day: 'numeric', month: 'short' })}`;
}

export function periodRange(p) {
  return `${fmtDay(p.from, { day: '2-digit', month: 'short' })} – ${fmtDay(p.to, { day: '2-digit', month: 'short', year: 'numeric' })}`;
}
