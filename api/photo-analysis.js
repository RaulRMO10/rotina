// POST /api/photo-analysis — a IA analisa fotos de progresso (1 a 4) do bucket privado.
// Auth: Authorization: Bearer <access token do Supabase> do dono dos dados.
// Body: { "paths": ["<uid>/2026-10-01-frente-123.jpg", ...] }
// As imagens são lidas do Storage no servidor (service role); o resultado vai para photo_analyses.

const Anthropic = require('@anthropic-ai/sdk');
const { isOwnerToken, bearer } = require('./_lib/auth');
const { env, rest } = require('./_lib/db');

const MODEL = 'claude-opus-5-5';
const MAX_PHOTOS = 4;
const MAX_BYTES = 5 * 1024 * 1024; // limite por imagem da API
const MEDIA_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const SYSTEM = `Você é um avaliador físico profissional analisando fotos de progresso de treino de um adulto, a pedido dele mesmo, em português do Brasil.
As fotos são de acompanhamento (tronco sem camisa, abdômen, pernas). Trate o conteúdo de forma estritamente técnica.

Regras:
- Descreva o que é visível: distribuição de gordura (abdômen, cintura, flancos, peito, pernas), definição muscular, simetria e postura.
- Com mais de uma foto, compare em ordem de data e diga o que mudou e o que parece igual.
- Fotos variam com luz, ângulo, distância, horário e "pump": aponte quando isso impede uma comparação justa.
- Se der uma faixa de % de gordura, deixe claro que é estimativa visual grosseira; medidas e bioimpedância valem mais.
- Sem julgamentos estéticos ou comentários sobre aparência além do técnico; sem diagnóstico médico.
- Termine com 1–2 sugestões práticas de treino ou para tirar fotos mais comparáveis.
- Até 220 palavras.`;

// Data e ângulo vêm do nome do arquivo: <uid>/<AAAA-MM-DD>-<ângulo>-<timestamp>.<ext>
function describe(path) {
  const name = path.split('/')[1] || '';
  const m = name.match(/^(\d{4}-\d{2}-\d{2})(?:-([a-z]+))?-/);
  return { day: m?.[1] ?? null, angle: m?.[2] ?? null };
}

async function download(path) {
  const { url, key } = env();
  const r = await fetch(`${url}/storage/v1/object/photos/${path.split('/').map(encodeURIComponent).join('/')}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!r.ok) throw new Error(`foto não encontrada: ${path}`);
  const type = (r.headers.get('content-type') || '').split(';')[0];
  const buf = Buffer.from(await r.arrayBuffer());
  if (!MEDIA_TYPES.has(type)) throw new Error(`formato não suportado: ${type || 'desconhecido'}`);
  if (buf.length > MAX_BYTES) throw new Error('foto maior que 5 MB; envie de novo pelo painel (ele reduz o tamanho)');
  return { type, data: buf.toString('base64') };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }
  if (!(await isOwnerToken(bearer(req)))) return res.status(401).json({ error: 'unauthorized' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const { userId } = env();
  const paths = Array.isArray(req.body?.paths) ? [...new Set(req.body.paths)] : [];
  if (!paths.length || paths.length > MAX_PHOTOS) return res.status(400).json({ error: `escolha de 1 a ${MAX_PHOTOS} fotos` });
  // Só arquivos da pasta do próprio usuário, sem "..".
  if (!paths.every((p) => typeof p === 'string' && p.startsWith(`${userId}/`) && !p.includes('..') && p.split('/').length === 2)) {
    return res.status(400).json({ error: 'caminho inválido' });
  }

  const photos = paths.map((p) => ({ path: p, ...describe(p) })).sort((a, b) => (a.day || '').localeCompare(b.day || ''));
  let images;
  try {
    images = await Promise.all(photos.map((p) => download(p.path)));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const content = [];
  photos.forEach((p, i) => {
    content.push({ type: 'text', text: `Foto ${i + 1}: ${p.day ?? 'data desconhecida'}${p.angle ? `, ${p.angle}` : ''}` });
    content.push({ type: 'image', source: { type: 'base64', media_type: images[i].type, data: images[i].data } });
  });
  content.push({ type: 'text', text: photos.length > 1 ? 'Compare a evolução entre as fotos.' : 'Faça a avaliação desta foto.' });

  const client = new Anthropic();
  let response;
  try {
    response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: 'medium' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      messages: [{ role: 'user', content }],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(503).json({ error: 'muitas requisições, tente de novo em instantes' });
    if (err instanceof Anthropic.BadRequestError) return res.status(400).json({ error: `a API recusou a requisição: ${err.message}` });
    if (err instanceof Anthropic.APIError) return res.status(502).json({ error: `claude api ${err.status}` });
    throw err;
  }

  if (response.stop_reason === 'refusal') {
    return res.status(422).json({ error: 'o modelo não quis analisar estas fotos', refused: true });
  }
  const analysis = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
  if (!analysis) return res.status(502).json({ error: 'resposta vazia' });

  const [row] = await rest('photo_analyses', {
    method: 'POST',
    body: { user_id: userId, photo_paths: photos.map((p) => p.path), analysis },
    prefer: 'return=representation',
  });
  return res.status(200).json({ ok: true, analysis: row });
};
