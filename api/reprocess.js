// POST /api/reprocess — reaplica o parser em raw_ingest (header x-api-key).
// ?all=1 reprocessa tudo; sem ele, só as linhas com processed_at nulo.
// Processa em ordem de id para respeitar edições/exclusões na sequência original.

const { safeEqual } = require('./_lib/auth');
const { rest } = require('./_lib/db');
const { processPayload } = require('./_lib/process');

const BATCH = 20;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }
  if (!safeEqual(req.headers['x-api-key'], process.env.INGEST_TOKEN)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const all = req.query.all === '1';
  const afterId = Number(req.query.after) || 0;
  const filter = all ? '' : '&processed_at=is.null';
  const rows = await rest(
    `raw_ingest?select=id,payload&id=gt.${afterId}${filter}&order=id.asc&limit=${BATCH}`
  );

  const done = [];
  const failed = [];
  for (const row of rows) {
    try {
      const parsed = await processPayload(row.id, row.payload);
      done.push({ id: row.id, ...parsed });
    } catch (err) {
      console.error('reprocess failed', row.id, err.message);
      failed.push({ id: row.id, error: err.message });
    }
  }

  const last = rows.length ? rows[rows.length - 1].id : null;
  return res.status(200).json({
    ok: failed.length === 0,
    done,
    failed,
    // Lote cheio: chame de novo com ?after=<next_after> (e ?all=1 se for o caso).
    next_after: rows.length === BATCH ? last : null,
  });
};
