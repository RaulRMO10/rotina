// POST /api/ingest — recebe o payload do HC Webhook e grava bruto em raw_ingest.
// Fase 0/1: sem parse. O parser para daily_metrics/workouts vem depois de
// inspecionar os dados reais.
//
// Env (Vercel): INGEST_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INGEST_USER_ID

const crypto = require('crypto');

function tokenOk(received) {
  const expected = process.env.INGEST_TOKEN;
  if (!expected || typeof received !== 'string') return false;
  const a = crypto.createHash('sha256').update(received).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  if (!tokenOk(req.headers['x-api-key'])) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'expected JSON body' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INGEST_USER_ID } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !INGEST_USER_ID) {
    return res.status(500).json({ error: 'server not configured' });
  }

  const r = await fetch(`${SUPABASE_URL}/rest/v1/raw_ingest`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ user_id: INGEST_USER_ID, payload }),
  });

  if (!r.ok) {
    console.error('raw_ingest insert failed', r.status, await r.text());
    return res.status(502).json({ error: 'storage failed' });
  }

  const [row] = await r.json();
  const types = Object.keys(payload).filter((k) => Array.isArray(payload[k]));
  return res.status(200).json({ ok: true, id: row.id, types });
};
