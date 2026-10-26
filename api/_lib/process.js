const { normalize } = require('./hc');
const { env, rest } = require('./db');

// Normaliza um payload bruto e aplica em hc_records / daily_metrics / workouts.
async function processPayload(rawId, payload) {
  const { userId } = env();
  const { records, deleted, tz } = normalize(payload);
  const result = await rest('rpc/ingest_hc_records', {
    method: 'POST',
    body: { p_user: userId, p_records: records, p_deleted: deleted, p_tz: tz },
  });
  await rest(`raw_ingest?id=eq.${rawId}`, {
    method: 'PATCH',
    body: { processed_at: new Date().toISOString() },
  });
  return result;
}

module.exports = { processPayload };
