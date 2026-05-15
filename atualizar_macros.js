// Atualiza os macros de data.js com dados reais da API FatSecret.
//
// Uso:
//   node atualizar_macros.js             → aplica as alterações em data.js
//   node atualizar_macros.js --dry-run   → mostra o que mudaria, sem salvar

const fs = require('fs');
const { getFood } = require('./fatsecret_api');

const DRY_RUN = process.argv.includes('--dry-run');

function toArray(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

// Carrega data.js via eval (igual aos outros scripts do projeto)
function loadData() {
  const code = fs.readFileSync('data.js', 'utf8');
  const scope = {};
  eval(`${code}; scope.MEALS=MEALS; scope.SHOP_MAP=SHOP_MAP; scope.COOK_INFO=COOK_INFO; scope.RECIPES=RECIPES; scope.TRAINING=TRAINING; scope.SCHEDULE=SCHEDULE;`);
  return scope;
}

// Encontra a porção de 100g numa lista de servings
function find100gServing(servings) {
  return (
    servings.find(s =>
      s.serving_description.toLowerCase().includes('100 g') ||
      s.serving_description === '100g' ||
      (parseFloat(s.metric_serving_amount) === 100 && s.metric_serving_unit === 'g')
    ) || servings[0]
  );
}

// Encontra a porção de 1 unidade
function findUnitServing(servings, servingId) {
  if (servingId) return servings.find(s => s.serving_id === servingId) || servings[0];
  return (
    servings.find(s => /^1\s/i.test(s.serving_description)) ||
    servings.find(s => s.serving_description.toLowerCase().includes('unit')) ||
    servings[0]
  );
}

function calcMacros(serving, factor) {
  return {
    kcal: Math.round(parseFloat(serving.calories) * factor),
    prot: +((parseFloat(serving.protein) * factor).toFixed(1)),
    carb: +((parseFloat(serving.carbohydrate) * factor).toFixed(1)),
    fat:  +((parseFloat(serving.fat) * factor).toFixed(1))
  };
}

async function main() {
  const foodIds = JSON.parse(fs.readFileSync('food_ids.json', 'utf8'));
  const { MEALS, SHOP_MAP, COOK_INFO, RECIPES, TRAINING, SCHEDULE } = loadData();

  const entries = Object.entries(foodIds).filter(
    ([key, val]) => !key.startsWith('_') && val.food_id !== null
  );

  if (entries.length === 0) {
    console.log('\nNenhum food_id preenchido em food_ids.json ainda.');
    console.log('→ Use: node buscar_alimento.js "nome do alimento"\n');
    process.exit(0);
  }

  console.log(`\n${DRY_RUN ? '[DRY-RUN] ' : ''}Processando ${entries.length} alimento(s)...\n`);

  let totalChanges = 0;

  for (const [shopKey, entry] of entries) {
    console.log(`→ ${entry.nome} (${shopKey}, food_id: ${entry.food_id})`);

    let foodData;
    try {
      foodData = await getFood(entry.food_id);
    } catch (err) {
      console.error(`   ERRO: ${err.message}`);
      continue;
    }

    const servings = toArray(foodData.food?.servings?.serving);
    if (servings.length === 0) {
      console.log('   Sem porções disponíveis, pulando.');
      continue;
    }

    const isPeso = entry.tipo === 'peso';
    const serving = isPeso
      ? find100gServing(servings)
      : findUnitServing(servings, entry.serving_id);

    console.log(`   Usando porção: "${serving.serving_description}"`);

    let changes = 0;
    MEALS.forEach(meal => {
      meal.options.forEach(opt => {
        opt.ingredients.forEach(ing => {
          if (ing.shopKey !== shopKey) return;

          const factor = isPeso ? ing.qty / 100 : ing.qty;
          const novo = calcMacros(serving, factor);

          const diff = ['kcal', 'prot', 'carb', 'fat'].some(k => ing[k] !== novo[k]);
          if (!diff) return;

          if (DRY_RUN) {
            console.log(`   [${opt.id}] ${ing.food} (${ing.qty}${ing.unit})`);
            console.log(`     antes:  kcal=${ing.kcal} prot=${ing.prot} carb=${ing.carb} fat=${ing.fat}`);
            console.log(`     depois: kcal=${novo.kcal} prot=${novo.prot} carb=${novo.carb} fat=${novo.fat}`);
          }

          ing.kcal = novo.kcal;
          ing.prot = novo.prot;
          ing.carb = novo.carb;
          ing.fat  = novo.fat;
          changes++;
        });
      });
    });

    console.log(`   ${changes} ingrediente(s) atualizado(s).`);
    totalChanges += changes;
  }

  console.log(`\nTotal: ${totalChanges} atualização(ões).`);

  if (DRY_RUN) {
    console.log('[DRY-RUN] Nada foi salvo. Rode sem --dry-run para aplicar.\n');
    return;
  }

  if (totalChanges === 0) {
    console.log('Nada mudou.\n');
    return;
  }

  const newCode = `// ===== TABELA NUTRICIONAL BASE (por 100g ou unidade) =====

const MEALS = ${JSON.stringify(MEALS, null, 2)};

const SHOP_MAP = ${JSON.stringify(SHOP_MAP, null, 2)};

const COOK_INFO = ${JSON.stringify(COOK_INFO, null, 2)};

const RECIPES = ${JSON.stringify(RECIPES, null, 2)};

const TRAINING = ${JSON.stringify(TRAINING, null, 2)};

const SCHEDULE = ${JSON.stringify(SCHEDULE, null, 2)};
`;

  fs.writeFileSync('data.js', newCode);
  console.log('✓ data.js atualizado com sucesso!\n');
}

main().catch(err => { console.error('Erro:', err.message); process.exit(1); });
