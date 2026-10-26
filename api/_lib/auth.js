const crypto = require('crypto');

// Compara em tempo constante (hash dos dois lados, então tamanhos diferentes não vazam).
function safeEqual(received, expected) {
  if (!expected || typeof received !== 'string') return false;
  const a = crypto.createHash('sha256').update(received).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

module.exports = { safeEqual };
