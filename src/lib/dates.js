// Datas como strings YYYY-MM-DD no fuso do navegador.
const pad = (n) => String(n).padStart(2, '0');
export const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseDay = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const addDays = (s, n) => { const d = parseDay(s); d.setDate(d.getDate() + n); return isoDay(d); };
export const today = () => isoDay(new Date());
export const weekStart = (s) => { const d = parseDay(s); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return isoDay(d); };
export const shortDay = (s) => { const [, m, d] = s.split('-'); return `${d}/${m}`; };
export const daysBetween = (from, to) => { const out = []; for (let s = from; s <= to; s = addDays(s, 1)) out.push(s); return out; };
export const longDate = (s) => parseDay(s).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
