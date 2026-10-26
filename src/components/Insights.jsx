import { TrendingDown, TrendingUp, Sparkle } from 'lucide-react';

const tones = {
  good: 'bg-emerald-50 text-emerald-800 ring-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20',
  warn: 'bg-amber-50 text-amber-900 ring-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20',
  neutral: 'bg-white text-zinc-700 ring-zinc-200 dark:bg-zinc-900/60 dark:text-zinc-300 dark:ring-zinc-800',
};
const icons = { good: TrendingUp, warn: TrendingDown, neutral: Sparkle };

// Frases calculadas dos dados do período (sem IA).
export function Insights({ items }) {
  if (!items.length) return null;
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
      {items.map((it) => {
        const Icon = icons[it.tone];
        return (
          <span key={it.text} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${tones[it.tone]}`}>
            <Icon size={13} aria-hidden />
            {it.text}
          </span>
        );
      })}
    </div>
  );
}
