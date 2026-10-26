// Normaliza o payload JSON do HC Webhook em registros para hc_records.
// Formato conferido no código do app (SyncManager.kt, v1.9.31).

// 1 W = 86400 J/dia = 20,65 kcal/dia
const WATTS_TO_KCAL_DAY = 86400 / 4184;

// Estágios de sono do Health Connect que não contam como dormindo:
// 1 = acordado, 3 = fora da cama, 7 = acordado na cama.
const AWAKE_STAGES = new Set(['1', '3', '7']);

function sleepMinutes(s) {
  if (!Array.isArray(s.stages) || s.stages.length === 0) return s.duration_seconds / 60;
  const asleep = s.stages
    .filter((st) => !AWAKE_STAGES.has(String(st.stage)))
    .reduce((sum, st) => sum + (st.duration_seconds || 0), 0);
  return asleep / 60;
}

// type → (registro) => { start, end, value, data }
const PARSERS = {
  steps: (r) => ({ start: r.start_time, end: r.end_time, value: r.count }),
  active_calories: (r) => ({ start: r.start_time, end: r.end_time, value: r.calories }),
  heart_rate: (r) => ({ start: r.time, end: r.time, value: r.avg ?? r.bpm }),
  resting_heart_rate: (r) => ({ start: r.time, end: r.time, value: r.bpm }),
  weight: (r) => ({ start: r.time, end: r.time, value: r.kilograms }),
  body_fat: (r) => ({ start: r.time, end: r.time, value: r.percentage }),
  lean_body_mass: (r) => ({ start: r.time, end: r.time, value: r.kilograms }),
  basal_metabolic_rate: (r) => ({ start: r.time, end: r.time, value: r.watts * WATTS_TO_KCAL_DAY }),
  sleep: (r) => {
    const end = new Date(r.session_end_time);
    const start = new Date(end.getTime() - r.duration_seconds * 1000);
    const stages = {};
    for (const st of r.stages || []) stages[st.stage] = (stages[st.stage] || 0) + st.duration_seconds;
    return { start: start.toISOString(), end: r.session_end_time, value: sleepMinutes(r), data: { stages } };
  },
  exercise: (r) => ({
    start: r.start_time,
    end: r.end_time,
    value: r.duration_seconds / 60,
    data: {
      exercise_type: Number(r.type),
      title: r.title ?? null,
      distance_meters: r.distance_meters ?? null,
    },
  }),
};

function normalize(payload) {
  const records = [];
  for (const [type, parse] of Object.entries(PARSERS)) {
    const list = payload[type];
    if (!Array.isArray(list)) continue;
    for (const r of list) {
      const p = parse(r);
      if (!p.start || !p.end || p.value == null || Number.isNaN(Number(p.value))) continue;
      const meta = r.metadata || {};
      records.push({
        type,
        // Sem metadata.id (ex.: modo de buckets agregados) a chave vira o intervalo.
        hc_id: meta.id || `${p.start}|${p.end}`,
        origin: meta.data_origin || 'desconhecido',
        start_at: p.start,
        end_at: p.end,
        value: Number(p.value),
        data: p.data ?? null,
      });
    }
  }
  const deleted = Array.isArray(payload.deleted)
    ? payload.deleted.filter((d) => d && PARSERS[d.type] && d.id)
    : [];
  const tz = typeof payload.timezone === 'string' && payload.timezone ? payload.timezone : 'America/Sao_Paulo';
  return { records, deleted, tz };
}

module.exports = { normalize };
