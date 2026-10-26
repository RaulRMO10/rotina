import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { today, weekStart } from '../lib/dates';
import { Button, Field, inputClass } from './ui';

const num = (v) => (v === '' ? null : Number(v));

// Registro semanal em um diálogo: cintura, academia, nota e foto do mês.
export function WeeklyForm({ open, onClose, userId, onSaved }) {
  const dialog = useRef(null);
  const [week, setWeek] = useState(weekStart(today()));
  const [form, setForm] = useState({ waist: '', fat: '', muscle: '', weight: '', note: '' });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    supabase.from('weekly_notes').select('note').eq('week_start', week).maybeSingle()
      .then(({ data }) => setForm((f) => ({ ...f, note: data?.note ?? '' })));
  }, [open, week]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    // Medida desta semana fica com a data de hoje; de semana passada, com a segunda.
    const measuredOn = week === weekStart(today()) ? today() : week;
    const done = [];
    try {
      if (form.note.trim()) {
        const { error } = await supabase.from('weekly_notes').upsert({ user_id: userId, week_start: week, note: form.note.trim() }, { onConflict: 'user_id,week_start' });
        if (error) throw error;
        done.push('nota');
      }
      if (form.waist !== '') {
        const { error } = await supabase.from('measurements').insert({ user_id: userId, measured_on: measuredOn, source: 'relogio', waist_cm: num(form.waist) });
        if (error) throw error;
        done.push('cintura');
      }
      const gym = { body_fat_pct: num(form.fat), muscle_mass_kg: num(form.muscle), weight_kg: num(form.weight) };
      if (Object.values(gym).some((v) => v != null)) {
        const { error } = await supabase.from('measurements').insert({ user_id: userId, measured_on: measuredOn, source: 'academia', ...gym });
        if (error) throw error;
        done.push('academia');
      }
      if (file) {
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const { error } = await supabase.storage.from('photos').upload(`${userId}/${measuredOn}-${Date.now()}.${ext}`, file, { contentType: file.type });
        if (error) throw error;
        done.push('foto');
      }
      if (!done.length) { setMsg({ ok: false, text: 'Preencha pelo menos um campo.' }); return; }
      setForm((f) => ({ ...f, waist: '', fat: '', muscle: '', weight: '' }));
      setFile(null);
      await onSaved();
      onClose();
    } catch (err) {
      setMsg({ ok: false, text: `Erro: ${err.message}${done.length ? ` (já salvo: ${done.join(', ')})` : ''}` });
    } finally {
      setBusy(false);
    }
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/40 backdrop:backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <form onSubmit={submit} className="grid max-h-[85vh] gap-5 overflow-y-auto p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Registro da semana</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Tudo opcional. Leva menos de um minuto.</p>
          </div>
          <Button variant="ghost" className="-mr-2 size-9 px-0" onClick={onClose} aria-label="Fechar"><X className="size-4" /></Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Semana (segunda)">
            <input type="date" className={inputClass} value={week} onChange={(e) => setWeek(weekStart(e.target.value || today()))} required />
          </Field>
          <Field label="Cintura (cm)">
            <input type="number" step="0.1" min="40" max="200" inputMode="decimal" className={inputClass} value={form.waist} onChange={set('waist')} placeholder="ex.: 86,5" />
          </Field>
        </div>

        <fieldset className="grid gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <legend className="sr-only">Academia</legend>
          <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Bioimpedância da academia</div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="% gordura"><input type="number" step="0.1" min="2" max="70" inputMode="decimal" className={inputClass} value={form.fat} onChange={set('fat')} /></Field>
            <Field label="Músculo (kg)"><input type="number" step="0.1" min="10" max="150" inputMode="decimal" className={inputClass} value={form.muscle} onChange={set('muscle')} /></Field>
            <Field label="Peso (kg)"><input type="number" step="0.1" min="30" max="300" inputMode="decimal" className={inputClass} value={form.weight} onChange={set('weight')} /></Field>
          </div>
        </fieldset>

        <Field label="Nota da semana">
          <textarea rows={3} maxLength={500} className={`${inputClass} h-auto py-2`} value={form.note} onChange={set('note')} placeholder="Como foi a semana, em 1–2 frases" />
        </Field>

        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/50">
          <ImagePlus className="size-5" aria-hidden />
          <span className="truncate">{file ? file.name : 'Foto do mês (opcional)'}</span>
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files[0] ?? null)} />
        </label>

        {msg && <p className={`text-sm ${msg.ok ? 'text-emerald-600' : 'text-red-600 dark:text-red-400'}`}>{msg.text}</p>}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />}Salvar</Button>
        </div>
      </form>
    </dialog>
  );
}
