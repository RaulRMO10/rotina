import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { today, weekStart } from '../lib/dates';
import { METRIC_FIELDS, SOURCES } from '../lib/derive';
import { Button, Field, Segmented, inputClass } from './ui';

const LIMITS = {
  weight_kg: [30, 300], body_fat_pct: [2, 70], muscle_mass_kg: [10, 150],
  waist_cm: [40, 200], hip_cm: [40, 200], chest_cm: [40, 200], arm_cm: [15, 80], thigh_cm: [25, 120],
};
const ANGLES = [{ value: 'frente', label: 'Frente' }, { value: 'lado', label: 'Lado' }, { value: 'costas', label: 'Costas' }];

// Reduz a foto no navegador (máx. 1600 px, JPEG): upload rápido e aceita pela IA.
async function shrink(file) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
}

export function RecordDialog({ open, initialTab = 'medidas', onClose, userId, onSaved }) {
  const dialog = useRef(null);
  const [tab, setTab] = useState(initialTab);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // medidas
  const [day, setDay] = useState(today());
  const [source, setSource] = useState('casa');
  const [values, setValues] = useState({});
  const [notes, setNotes] = useState('');
  // nota
  const [week, setWeek] = useState(weekStart(today()));
  const [note, setNote] = useState('');
  // foto
  const [photoDay, setPhotoDay] = useState(today());
  const [angle, setAngle] = useState('frente');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (open) { setTab(initialTab); setError(null); dialog.current?.showModal(); } else dialog.current?.close();
  }, [open, initialTab]);

  useEffect(() => {
    if (!open || tab !== 'nota') return;
    supabase.from('weekly_notes').select('note').eq('week_start', week).maybeSingle().then(({ data }) => setNote(data?.note ?? ''));
  }, [open, tab, week]);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (tab === 'medidas') {
        const row = Object.fromEntries(METRIC_FIELDS.map((f) => [f.key, values[f.key] === '' || values[f.key] == null ? null : Number(values[f.key])]));
        if (Object.values(row).every((v) => v == null)) throw new Error('Preencha pelo menos uma medida.');
        const { error: err } = await supabase.from('measurements').insert({ user_id: userId, measured_on: day, source, ...row, notes: notes.trim() || null });
        if (err) throw err;
        setValues({});
        setNotes('');
      } else if (tab === 'nota') {
        if (!note.trim()) throw new Error('Escreva a nota.');
        const { error: err } = await supabase.from('weekly_notes').upsert({ user_id: userId, week_start: week, note: note.trim() }, { onConflict: 'user_id,week_start' });
        if (err) throw err;
      } else {
        if (!file) throw new Error('Escolha uma foto.');
        const blob = await shrink(file);
        const { error: err } = await supabase.storage.from('photos').upload(`${userId}/${photoDay}-${angle}-${Date.now()}.jpg`, blob, { contentType: 'image/jpeg' });
        if (err) throw err;
        setFile(null);
      }
      await onSaved(tab);
      onClose();
    } catch (err) {
      setError(err.message);
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
      <form onSubmit={save} className="grid max-h-[88vh] gap-5 overflow-y-auto p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Registrar</h2>
          <Button variant="ghost" icon className="-mr-2" onClick={onClose} aria-label="Fechar"><X size={18} /></Button>
        </div>
        <Segmented value={tab} onChange={(v) => { setTab(v); setError(null); }}
          options={[{ value: 'medidas', label: 'Medidas' }, { value: 'nota', label: 'Nota da semana' }, { value: 'foto', label: 'Foto' }]} />

        {tab === 'medidas' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data"><input type="date" className={inputClass} value={day} max={today()} onChange={(e) => setDay(e.target.value || today())} required /></Field>
              <Field label="Fonte">
                <select className={inputClass} value={source} onChange={(e) => setSource(e.target.value)}>
                  {SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </Field>
            </div>
            <p className="-mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Cada fonte é uma série própria (balança de casa, academia, nutricionista…). Use sempre a mesma para comparar.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {METRIC_FIELDS.map((f) => (
                <Field key={f.key} label={`${f.label} (${f.unit})`}>
                  <input type="number" step="0.1" inputMode="decimal" min={LIMITS[f.key][0]} max={LIMITS[f.key][1]} className={inputClass}
                    value={values[f.key] ?? ''} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />
                </Field>
              ))}
            </div>
            <Field label="Observação (opcional)"><input className={inputClass} value={notes} maxLength={200} onChange={(e) => setNotes(e.target.value)} placeholder="ex.: em jejum, de manhã" /></Field>
          </>
        )}

        {tab === 'nota' && (
          <>
            <Field label="Semana (segunda)"><input type="date" className={inputClass} value={week} onChange={(e) => setWeek(weekStart(e.target.value || today()))} /></Field>
            <Field label="Como foi a semana">
              <textarea rows={4} maxLength={500} className={`${inputClass} h-auto py-2`} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Em 1–2 frases: treinos, sono, alimentação, como se sentiu" />
            </Field>
          </>
        )}

        {tab === 'foto' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data"><input type="date" className={inputClass} value={photoDay} max={today()} onChange={(e) => setPhotoDay(e.target.value || today())} /></Field>
              <Field label="Ângulo">
                <select className={inputClass} value={angle} onChange={(e) => setAngle(e.target.value)}>
                  {ANGLES.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </Field>
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-zinc-300 p-5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/50">
              <ImagePlus size={20} aria-hidden />
              <span className="truncate">{file ? file.name : 'Escolher foto'}</span>
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files[0] ?? null)} />
            </label>
            <p className="-mt-2 text-xs text-zinc-500 dark:text-zinc-400">Dica: mesma luz, distância e horário a cada mês deixam a comparação muito mais confiável.</p>
          </>
        )}

        {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />}Salvar</Button>
        </div>
      </form>
    </dialog>
  );
}
