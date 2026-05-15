// Busca automaticamente todos os alimentos no FatSecret,
// gera data_real.js com macros reais e salva os IDs encontrados em food_ids.json.
// O data.js original NÃO é alterado.
//
// Uso: node gerar_dados_reais.js

const fs = require('fs');
const { searchFood, getFood } = require('./fatsecret_api');

function toArray(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Pontua resultados de busca para escolher o melhor
function scoreFoodResult(food, tipo) {
  let score = 0;
  if (food.food_type === 'Generic') score += 10;
  const desc = (food.food_description || '').toLowerCase();
  if (tipo === 'peso') {
    if (desc.includes('per 100g') || desc.includes('per 100 g')) score += 5;
  } else {
    if (/per 1 /.test(desc)) score += 5;
    if (desc.includes('medium') || desc.includes('large')) score += 3;
  }
  return score;
}

// Normaliza qualquer serving para valores por 100g usando metric_serving_amount
function normalizeTo100g(serving) {
  const metricG = parseFloat(serving.metric_serving_amount);
  const factor = (metricG > 0 && serving.metric_serving_unit === 'g') ? 100 / metricG : 1;
  return {
    calories:      String(parseFloat(serving.calories || 0) * factor),
    protein:       String(parseFloat(serving.protein || 0) * factor),
    carbohydrate:  String(parseFloat(serving.carbohydrate || 0) * factor),
    fat:           String(parseFloat(serving.fat || 0) * factor),
    serving_description: '100 g (normalizado)',
    serving_id: serving.serving_id
  };
}

function getBestPesoServing(servings) {
  // Prefere explicitamente a porção de 100g
  const exact = servings.find(s =>
    s.serving_description.toLowerCase().includes('100 g') ||
    s.serving_description === '100g' ||
    (parseFloat(s.metric_serving_amount) === 100 && s.metric_serving_unit === 'g')
  );
  if (exact) return exact;

  // Senão, normaliza a partir de qualquer serving com metric_serving_amount em gramas
  const withMetric = servings.find(s =>
    parseFloat(s.metric_serving_amount) > 0 && s.metric_serving_unit === 'g'
  );
  if (withMetric) return normalizeTo100g(withMetric);

  return servings[0];
}

function findUnitServing(servings, preferredId) {
  if (preferredId) return servings.find(s => s.serving_id === preferredId) || servings[0];
  return (
    servings.find(s => /^1 (medium|large|whole|unit)/i.test(s.serving_description)) ||
    servings.find(s => /^1 /i.test(s.serving_description)) ||
    servings[0]
  );
}

function calcMacros(serving, factor) {
  return {
    kcal: Math.round(parseFloat(serving.calories || 0) * factor),
    prot: +((parseFloat(serving.protein || 0) * factor).toFixed(1)),
    carb: +((parseFloat(serving.carbohydrate || 0) * factor).toFixed(1)),
    fat:  +((parseFloat(serving.fat || 0) * factor).toFixed(1))
  };
}

function loadData() {
  const code = fs.readFileSync('data.js', 'utf8');
  const scope = {};
  eval(`${code}; scope.MEALS=MEALS; scope.SHOP_MAP=SHOP_MAP; scope.COOK_INFO=COOK_INFO; scope.RECIPES=RECIPES; scope.TRAINING=TRAINING; scope.SCHEDULE=SCHEDULE;`);
  return scope;
}

async function resolveFood(shopKey, entry) {
  // Já tem food_id salvo — usa direto
  if (entry.food_id) {
    console.log(`  ✓ [${shopKey}] ID já salvo: ${entry.food_id}`);
    return entry;
  }

  // Busca na API
  console.log(`  → [${shopKey}] Buscando "${entry.busca_en}"...`);
  await sleep(300);

  let results = [];
  try {
    const data = await searchFood(entry.busca_en, 5);
    results = toArray(data.foods?.food);
  } catch (err) {
    console.log(`    ✗ Erro na busca: ${err.message}`);
    return null;
  }

  if (results.length === 0) {
    console.log(`    ✗ Sem resultados.`);
    return null;
  }

  // Escolhe o melhor resultado
  const scored = results.map(f => ({ food: f, score: scoreFoodResult(f, entry.tipo) }));
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0].food;

  console.log(`    ✓ Escolhido: [${best.food_id}] ${best.food_name}`);
  return { ...entry, food_id: best.food_id };
}

async function fetchNutrition(shopKey, entry) {
  await sleep(300);
  let foodData;
  try {
    foodData = await getFood(entry.food_id);
  } catch (err) {
    console.log(`  ✗ [${shopKey}] Erro ao buscar detalhes: ${err.message}`);
    return null;
  }

  const servings = toArray(foodData.food?.servings?.serving);
  if (servings.length === 0) {
    console.log(`  ✗ [${shopKey}] Sem porções disponíveis.`);
    return null;
  }

  const isPeso = entry.tipo === 'peso';
  const serving = isPeso
    ? getBestPesoServing(servings)
    : findUnitServing(servings, entry.serving_id);

  console.log(`  ✓ [${shopKey}] "${foodData.food.food_name}" → porção: "${serving.serving_description}"`);
  return { isPeso, serving };
}

async function main() {
  const foodIds = JSON.parse(fs.readFileSync('food_ids.json', 'utf8'));
  const { MEALS, SHOP_MAP, COOK_INFO, RECIPES, TRAINING, SCHEDULE } = loadData();

  const entries = Object.entries(foodIds).filter(([k]) => !k.startsWith('_'));

  // ── ETAPA 1: Resolver food_ids ──────────────────────────────────────────────
  console.log(`\n═══ ETAPA 1/2 — Buscando ${entries.length} alimentos na FatSecret ═══\n`);

  const resolved = {};
  for (const [shopKey, entry] of entries) {
    const result = await resolveFood(shopKey, entry);
    if (result) resolved[shopKey] = result;
  }

  // Salva food_ids.json com os IDs encontrados
  const updatedFoodIds = { ...foodIds };
  for (const [k, v] of Object.entries(resolved)) {
    updatedFoodIds[k] = v;
  }
  fs.writeFileSync('food_ids.json', JSON.stringify(updatedFoodIds, null, 2));
  console.log('\n→ food_ids.json atualizado com os IDs encontrados.');

  // ── ETAPA 2: Buscar nutrição e calcular macros ──────────────────────────────
  console.log(`\n═══ ETAPA 2/2 — Calculando macros reais ═══\n`);

  let totalUpdates = 0;
  let notFound = [];

  for (const [shopKey, entry] of Object.entries(resolved)) {
    const nutrition = await fetchNutrition(shopKey, entry);
    if (!nutrition) { notFound.push(shopKey); continue; }

    const { isPeso, serving } = nutrition;

    MEALS.forEach(meal => {
      meal.options.forEach(opt => {
        opt.ingredients.forEach(ing => {
          if (ing.shopKey !== shopKey) return;
          const factor = isPeso ? ing.qty / 100 : ing.qty;
          const novo = calcMacros(serving, factor);
          ing.kcal = novo.kcal;
          ing.prot = novo.prot;
          ing.carb = novo.carb;
          ing.fat  = novo.fat;
          totalUpdates++;
        });
      });
    });
  }

  // ── RESULTADO ───────────────────────────────────────────────────────────────
  console.log(`\n═══ RESULTADO ═══`);
  console.log(`Ingredientes atualizados : ${totalUpdates}`);
  if (notFound.length > 0) {
    console.log(`Não encontrados          : ${notFound.join(', ')}`);
  }

  const newCode = `// ===== TABELA NUTRICIONAL — DADOS REAIS (FatSecret API) =====
// Gerado por: node gerar_dados_reais.js
// NÃO edite manualmente — rode o script novamente para atualizar.

const MEALS = ${JSON.stringify(MEALS, null, 2)};

const SHOP_MAP = ${JSON.stringify(SHOP_MAP, null, 2)};

const COOK_INFO = ${JSON.stringify(COOK_INFO, null, 2)};

const RECIPES = ${JSON.stringify(RECIPES, null, 2)};

const TRAINING = ${JSON.stringify(TRAINING, null, 2)};

const SCHEDULE = ${JSON.stringify(SCHEDULE, null, 2)};
`;

  fs.writeFileSync('data_real.js', newCode);
  console.log('\n✓ data_real.js gerado com sucesso!');
  console.log('\nPróximos passos:');
  console.log('  node comparar_macros.js         → ver diferenças lado a lado');
  console.log('  copy data_real.js data.js        → aplicar quando estiver satisfeito\n');
}

main().catch(err => { console.error('\nErro fatal:', err.message); process.exit(1); });
