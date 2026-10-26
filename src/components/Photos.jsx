import { useCallback, useEffect, useState } from 'react';
import { Check, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { longDate, shortDay } from '../lib/dates';
import { Button, Card, CardHeader, Empty } from './ui';

const MAX = 4;
const parseName = (path) => {
  const m = (path.split('/')[1] || '').match(/^(\d{4}-\d{2}-\d{2})(?:-([a-z]+))?-/);
  return { day: m?.[1] ?? null, angle: m?.[2] ?? null };
};

// Galeria (bucket privado, URLs assinadas de 1h) + análise por IA de 1 a 4 fotos.
export function Photos({ userId, version, onAdd }) {
  const [photos, setPhotos] = useState(null);
  const [selected, setSelected] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadAnalyses = useCallback(async () => {
    const { data } = await supabase.from('photo_analyses').select('*').order('created_at', { ascending: false }).limit(5);
    setAnalyses(data || []);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: files } = await supabase.storage.from('photos').list(userId, { limit: 200, sortBy: { column: 'name', order: 'desc' } });
      const paths = (files || []).filter((f) => f.id).map((f) => `${userId}/${f.name}`);
      if (!paths.length) { if (alive) setPhotos([]); return; }
      const { data } = await supabase.storage.from('photos').createSignedUrls(paths, 3600);
      if (alive) setPhotos((data || []).filter((u) => u.signedUrl).map((u) => ({ path: u.path, url: u.signedUrl, ...parseName(u.path) })));
    })();
    loadAnalyses();
    return () => { alive = false; };
  }, [userId, version, loadAnalyses]);

  const toggle = (path) => setSelected((s) => (s.includes(path) ? s.filter((p) => p !== path) : s.length >= MAX ? s : [...s, path]));

  async function analyze() {
    setBusy(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const r = await fetch('/api/photo-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session?.access_token ?? ''}` },
        body: JSON.stringify({ paths: selected }),
      });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.error || `erro ${r.status}`);
      setSelected([]);
      await loadAnalyses();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function removePhoto(path) {
    if (!confirm('Apagar esta foto?')) return;
    const { error: err } = await supabase.storage.from('photos').remove([path]);
    if (err) alert(err.message);
    else { setPhotos((ps) => ps.filter((p) => p.path !== path)); setSelected((s) => s.filter((p) => p !== path)); }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader
          title="Fotos de progresso"
          subtitle={photos?.length ? `Toque para selecionar até ${MAX} e comparar com a IA` : 'Uma por mês, mesma luz e ângulo'}
          action={<Button variant="outline" onClick={onAdd}>Adicionar</Button>}
        />
        {photos === null && <div className="h-32 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />}
        {photos?.length === 0 && <Empty className="h-32">Nenhuma foto ainda.</Empty>}
        {!!photos?.length && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {photos.map((p) => {
              const on = selected.includes(p.path);
              return (
                <div key={p.path} className="group relative">
                  <button type="button" onClick={() => toggle(p.path)} aria-pressed={on}
                    className={`relative block w-full overflow-hidden rounded-xl ring-2 transition ${on ? 'ring-blue-500' : 'ring-transparent'}`}>
                    <img src={p.url} alt={`Foto de ${p.day ?? ''}`} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-5 text-left text-[11px] font-medium text-white">
                      {p.day ? shortDay(p.day) : ''}{p.angle ? ` · ${p.angle}` : ''}
                    </span>
                    {on && <span className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-blue-600 text-white"><Check size={14} /></span>}
                  </button>
                  <button type="button" onClick={() => removePhoto(p.path)} aria-label="Apagar foto"
                    className="absolute left-1.5 top-1.5 hidden rounded-lg bg-black/50 p-1 text-white group-hover:block">
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {!!selected.length && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-blue-50 px-3 py-2 dark:bg-blue-500/10">
            <span className="text-sm text-blue-900 dark:text-blue-200">{selected.length} selecionada{selected.length > 1 ? 's' : ''}</span>
            <Button onClick={analyze} disabled={busy}>
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {busy ? 'Analisando…' : selected.length > 1 ? 'Comparar com IA' : 'Analisar com IA'}
            </Button>
          </div>
        )}
        {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader title="Análises da IA" badge="fotos" />
        {!analyses.length ? (
          <Empty className="h-32">Selecione fotos ao lado e toque em "Analisar com IA".</Empty>
        ) : (
          <div className="grid max-h-[28rem] gap-4 overflow-y-auto">
            {analyses.map((a) => (
              <article key={a.id}>
                <div className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(a.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} · fotos de {a.photo_paths.map((p) => parseName(p).day).filter(Boolean).map(longDate).join(', ')}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{a.analysis}</p>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
