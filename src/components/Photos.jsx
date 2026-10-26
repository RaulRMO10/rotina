import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { shortDay } from '../lib/dates';
import { Empty } from './ui';

// Bucket privado: URLs assinadas válidas por 1h.
export function Photos({ userId, version }) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: files } = await supabase.storage.from('photos').list(userId, { limit: 100, sortBy: { column: 'name', order: 'desc' } });
      const paths = (files || []).filter((f) => f.id).slice(0, 12).map((f) => `${userId}/${f.name}`);
      if (!paths.length) { if (alive) setPhotos([]); return; }
      const { data } = await supabase.storage.from('photos').createSignedUrls(paths, 3600);
      if (alive) setPhotos((data || []).filter((u) => u.signedUrl).map((u) => ({ url: u.signedUrl, day: u.path.split('/')[1].slice(0, 10) })));
    })();
    return () => { alive = false; };
  }, [userId, version]);

  if (photos === null) return <div className="h-32 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />;
  if (!photos.length) return <Empty className="h-32">Nenhuma foto ainda. Adicione uma por mês no registro da semana.</Empty>;
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {photos.map((p) => (
        <figure key={p.url} className="group relative overflow-hidden rounded-xl">
          <img src={p.url} alt={`Foto de ${p.day}`} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-1.5 pt-4 text-[11px] font-medium text-white">{shortDay(p.day)}</figcaption>
        </figure>
      ))}
    </div>
  );
}
