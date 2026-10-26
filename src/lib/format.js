export const avg = (xs) => {
  const v = xs.filter((x) => x != null && !Number.isNaN(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

export function fmt(v, digits = 1) {
  if (v == null || Number.isNaN(v)) return '—';
  const r = Number(v.toFixed(digits)) || 0; // evita "-0"
  return r.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export const fmtSleep = (min) => (min == null ? '—' : `${Math.floor(min / 60)}h${String(Math.round(min % 60)).padStart(2, '0')}`);

export function signed(delta, digits) {
  if (delta == null) return null;
  const r = Number(delta.toFixed(digits)) || 0;
  return `${r > 0 ? '+' : ''}${fmt(r, digits)}`;
}
