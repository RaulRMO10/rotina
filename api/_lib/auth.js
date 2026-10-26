const crypto = require('crypto');
const { env } = require('./db');

// Compara em tempo constante (hash dos dois lados, então tamanhos diferentes não vazam).
function safeEqual(received, expected) {
  if (!expected || typeof received !== 'string') return false;
  const a = crypto.createHash('sha256').update(received).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

// O access token do Supabase pertence ao dono dos dados (INGEST_USER_ID)?
async function isOwnerToken(token) {
  if (!token) return false;
  const { url, key, userId } = env();
  const r = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` } });
  if (!r.ok) return false;
  const user = await r.json();
  return user?.id === userId;
}

const bearer = (req) => (req.headers.authorization || '').replace(/^Bearer /, '');

module.exports = { safeEqual, isOwnerToken, bearer };
