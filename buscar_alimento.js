// Uso:
//   node buscar_alimento.js "peito de frango"      → busca por nome (top 5)
//   node buscar_alimento.js --id 33691             → detalhes de um alimento pelo ID

const { searchFood, getFood } = require('./fatsecret_api');

function toArray(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

function formatServing(s) {
  return [
    `    serving_id : ${s.serving_id}`,
    `    descricao  : ${s.serving_description}`,
    `    kcal       : ${s.calories}`,
    `    proteina   : ${s.protein}g`,
    `    carb       : ${s.carbohydrate}g`,
    `    gordura    : ${s.fat}g`,
    s.metric_serving_amount
      ? `    metrico    : ${s.metric_serving_amount} ${s.metric_serving_unit}`
      : null
  ].filter(Boolean).join('\n');
}

async function buscarPorNome(query) {
  console.log(`\nBuscando: "${query}"...\n`);
  const data = await searchFood(query, 5);
  const foods = toArray(data.foods?.food);

  if (foods.length === 0) {
    console.log('Nenhum resultado encontrado.');
    return;
  }

  foods.forEach((f, i) => {
    console.log(`[${i + 1}] ID: ${f.food_id}  |  ${f.food_name}`);
    if (f.food_description) console.log(`     ${f.food_description}`);
  });

  console.log('\n→ Use  node buscar_alimento.js --id <food_id>  para ver as porções completas.');
  console.log('→ Depois, preencha o food_id em food_ids.json para o alimento desejado.');
  console.log('→ Dica: buscar em inglês dá resultados melhores (ex: "chicken breast cooked").\n');
}

async function detalhesPorId(foodId) {
  console.log(`\nBuscando detalhes do ID ${foodId}...\n`);
  const data = await getFood(foodId);
  const food = data.food;

  console.log(`Nome  : ${food.food_name}`);
  console.log(`Tipo  : ${food.food_type}`);
  if (food.brand_name) console.log(`Marca : ${food.brand_name}`);
  console.log(`\nPorções disponíveis:`);

  const servings = toArray(food.servings?.serving);
  servings.forEach((s, i) => {
    console.log(`\n  [${i + 1}]`);
    console.log(formatServing(s));
  });

  console.log('\n→ Copie o serving_id desejado para food_ids.json (deixe null para usar 100g automaticamente).\n');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Uso:');
    console.log('  node buscar_alimento.js "nome do alimento"');
    console.log('  node buscar_alimento.js --id <food_id>');
    process.exit(1);
  }

  if (args[0] === '--id') {
    if (!args[1]) { console.error('Informe o food_id após --id'); process.exit(1); }
    await detalhesPorId(args[1]);
  } else {
    await buscarPorNome(args.join(' '));
  }
}

main().catch(err => { console.error('Erro:', err.message); process.exit(1); });
