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

// Tipos que o app pode mandar como total por dia (resolução "diária", o padrão),
// vindos do agregado do Health Connect: sem metadata.id e com o primeiro dia
// recortado no início da janela de busca.
const DAILY_CAPABLE = new Set(['steps', 'active_calories']);

function localParts(iso, tz) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(iso));
  const get = (t) => parts.find((p) => p.type === t).value;
  return { day: `${get('year')}-${get('month')}-${get('day')}`, midnight: get('hour') === '00' && get('minute') === '00' && get('second') === '00' };
}

// Totais diários: 1 registro por dia local, com chave = data. Um total que não
// começa à meia-noite é o dia mais antigo da busca, recortado: fica de fora
// para não gravar um dia pela metade. Retorna null se não for modo diário.
function dailyRecords(type, list, tz) {
  const noId = list.filter((r) => !r.metadata?.id);
  if (!noId.length || noId.length !== list.length) return null;
  const days = noId.map((r) => localParts(r.start_time, tz));
  if (new Set(days.map((d) => d.day)).size !== days.length) return null; // vários por dia = buckets de N min
  const out = [];
  noId.forEach((r, i) => {
    if (!days[i].midnight) return;
    const p = PARSERS[type](r);
    if (p.value == null || Number.isNaN(Number(p.value))) return;
    out.push({
      type,
      hc_id: `dia:${days[i].day}`,
      origin: 'health_connect_diario',
      start_at: p.start,
      end_at: p.end,
      value: Number(p.value),
      data: { aggregate: true },
    });
  });
  return out;
}

function normalize(payload) {
  const tz = typeof payload.timezone === 'string' && payload.timezone ? payload.timezone : 'America/Sao_Paulo';
  const records = [];
  for (const [type, parse] of Object.entries(PARSERS)) {
    const list = payload[type];
    if (!Array.isArray(list) || !list.length) continue;
    const daily = DAILY_CAPABLE.has(type) ? dailyRecords(type, list, tz) : null;
    if (daily) { records.push(...daily); continue; }
    for (const r of list) {
      const p = parse(r);
      if (!p.start || !p.end || p.value == null || Number.isNaN(Number(p.value))) continue;
      const meta = r.metadata || {};
      records.push({
        type,
        // Sem metadata.id (ex.: buckets de N minutos) a chave vira o intervalo.
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
  return { records, deleted, tz };
}

module.exports = { normalize };
