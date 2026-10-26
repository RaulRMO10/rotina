// Acesso ao Supabase (PostgREST) com a service role. Só roda no servidor.

function env() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INGEST_USER_ID } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !INGEST_USER_ID) {
    throw new Error('server not configured');
  }
  return { url: SUPABASE_URL, key: SUPABASE_SERVICE_ROLE_KEY, userId: INGEST_USER_ID };
}

async function rest(path, { method = 'GET', body, prefer } = {}) {
  const { url, key } = env();
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  if (prefer) headers.Prefer = prefer;
  const r = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`supabase ${method} ${path.split('?')[0]} ${r.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

module.exports = { env, rest };
