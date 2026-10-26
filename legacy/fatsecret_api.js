// FatSecret API — OAuth 1.0 (não requer IP whitelist)
// Requer FATSECRET_CONSUMER_KEY e FATSECRET_CONSUMER_SECRET no ambiente.
// Copie .env.example para .env e preencha as chaves.
const crypto  = require('crypto');
const dotenv  = require('dotenv');
dotenv.config();

const CONSUMER_KEY    = process.env.FATSECRET_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.FATSECRET_CONSUMER_SECRET;

if (!CONSUMER_KEY || !CONSUMER_SECRET) {
  throw new Error('FATSECRET_CONSUMER_KEY e FATSECRET_CONSUMER_SECRET são obrigatórios. Crie um arquivo .env baseado no .env.example.');
}
const BASE_URL = 'https://platform.fatsecret.com/rest/server.api';

function pct(str) {
  return encodeURIComponent(String(str))
    .replace(/!/g, '%21').replace(/\*/g, '%2A')
    .replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function sign(params) {
  const sorted = Object.keys(params).sort()
    .map(k => `${pct(k)}=${pct(params[k])}`).join('&');
  const base = `POST&${pct(BASE_URL)}&${pct(sorted)}`;
  const key  = `${pct(CONSUMER_SECRET)}&`;
  return crypto.createHmac('sha1', key).update(base).digest('base64');
}

async function callApi(apiParams) {
  const oauth = {
    oauth_consumer_key:     CONSUMER_KEY,
    oauth_nonce:            crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp:        String(Math.floor(Date.now() / 1000)),
    oauth_version:          '1.0',
  };

  const all = { ...apiParams, ...oauth, format: 'json' };
  all.oauth_signature = sign(all);

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(all).toString()
  });

  const data = await res.json();
  if (data.error) throw new Error(`API error: ${JSON.stringify(data.error)}`);
  return data;
}

async function searchFood(query, maxResults = 5) {
  return callApi({ method: 'foods.search', search_expression: query, max_results: String(maxResults) });
}

async function getFood(foodId) {
  return callApi({ method: 'food.get.v2', food_id: String(foodId) });
}

module.exports = { searchFood, getFood };
