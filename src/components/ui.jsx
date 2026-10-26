export function Card({ className = '', children }) {
  return (
    <section className={`rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-950/[0.03] dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:shadow-none ${className}`}>
      {children}
    </section>
  );
}

export function CardHeader({ title, subtitle, badge, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          {title}
          {badge && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {badge}
            </span>
          )}
        </h3>
        {subtitle && <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ children }) {
  return <h2 className="mb-3 mt-10 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{children}</h2>;
}

const variants = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200',
  ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
  outline: 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800',
};

export function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Segmented({ value, onChange, options }) {
  return (
    <div role="group" className="inline-flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800/80">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`h-7 rounded-lg px-3 text-xs font-medium transition-all ${
            value === o.value
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Empty({ children, className = 'h-56' }) {
  return (
    <div className={`flex items-center justify-center rounded-xl border border-dashed border-zinc-200 px-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 ${className}`}>
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
      {label}
      {children}
    </label>
  );
}

export const inputClass =
  'h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100';
