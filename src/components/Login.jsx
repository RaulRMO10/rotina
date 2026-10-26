import { useState } from 'react';
import { Activity, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button, Field, inputClass } from './ui';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError(err.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : err.message);
    setBusy(false);
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-[radial-gradient(ellipse_at_top,_rgb(59_130_246/0.12),_transparent_60%)] p-4">
      <form onSubmit={submit} className="grid w-full max-w-sm gap-5 rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-2xl bg-blue-600 text-white"><Activity className="size-5" /></span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Rotina</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Seu painel de saúde</p>
          </div>
        </div>
        <Field label="E-mail"><input type="email" autoComplete="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Senha"><input type="password" autoComplete="current-password" required className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
        {error && <p className="-mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
        <Button type="submit" className="h-10" disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />}Entrar</Button>
      </form>
    </main>
  );
}
