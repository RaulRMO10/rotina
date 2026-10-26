// POST /api/ingest — recebe o payload do HC Webhook.
// 1) grava o JSON bruto em raw_ingest (sempre, para poder reprocessar);
// 2) normaliza e atualiza hc_records / daily_metrics / workouts.
// Se o passo 2 falhar, responde 200 mesmo assim: o bruto está salvo e
// /api/reprocess refaz depois. Assim o app não reenvia em loop.
//
// Env (Vercel): INGEST_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INGEST_USER_ID

const { safeEqual } = require('./_lib/auth');
const { env, rest } = require('./_lib/db');
const { processPayload } = require('./_lib/process');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  if (!safeEqual(req.headers['x-api-key'], process.env.INGEST_TOKEN)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const payload = req.body;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: 'expected JSON body' });
  }

  let row;
  try {
    [row] = await rest('raw_ingest', {
      method: 'POST',
      body: { user_id: env().userId, payload },
      prefer: 'return=representation',
    });
  } catch (err) {
    console.error('raw_ingest insert failed', err.message);
    return res.status(502).json({ error: 'storage failed' });
  }

  const types = Object.keys(payload).filter((k) => Array.isArray(payload[k]));
  try {
    const parsed = await processPayload(row.id, payload);
    return res.status(200).json({ ok: true, id: row.id, types, parsed });
  } catch (err) {
    console.error('parse failed for raw_ingest', row.id, err.message);
    return res.status(200).json({ ok: true, id: row.id, types, parsed: null });
  }
};
