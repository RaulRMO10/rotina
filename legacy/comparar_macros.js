// Compara os macros de data.js (original) com data_real.js (FatSecret)
// Uso: node comparar_macros.js

const fs = require('fs');

function loadScope(file) {
  const code = fs.readFileSync(file, 'utf8');
  const scope = {};
  eval(`${code}; scope.MEALS=MEALS;`);
  return scope;
}

function sumMacros(ingredients) {
  return ingredients.reduce((a, i) => ({
    kcal: a.kcal + i.kcal, prot: a.prot + i.prot,
    carb: a.carb + i.carb, fat: a.fat + i.fat
  }), { kcal: 0, prot: 0, carb: 0, fat: 0 });
}

function fmt(n) { return String(n).padStart(6); }
function diff(a, b) {
  const d = b - a;
  if (d === 0) return '     =';
  return (d > 0 ? '  +' : '  ') + d;
}

if (!fs.existsSync('data_real.js')) {
  console.log('\ndata_real.js não encontrado. Rode primeiro: node gerar_dados_reais.js\n');
  process.exit(1);
}

const { MEALS: orig } = loadScope('data.js');
const { MEALS: real } = loadScope('data_real.js');

console.log('\n════════════════════════════════════════════════════════════════════');
console.log(' COMPARAÇÃO DE MACROS — Original (data.js) vs Real (data_real.js)');
console.log('════════════════════════════════════════════════════════════════════\n');

let totalOrigKcal = 0, totalRealKcal = 0;
let totalOrigProt = 0, totalRealProt = 0;

orig.forEach((meal, mi) => {
  const mealReal = real[mi];
  if (!mealReal) return;

  console.log(`┌─ ${meal.name} (${meal.time})`);

  meal.options.forEach((opt, oi) => {
    const optReal = mealReal.options[oi];
    if (!optReal) return;

    const o = sumMacros(opt.ingredients);
    const r = sumMacros(optReal.ingredients);

    const changed = o.kcal !== r.kcal || o.prot !== r.prot || o.carb !== r.carb || o.fat !== r.fat;
    const tag = changed ? ' ◄' : '';

    console.log(`│  [${opt.id}] ${opt.name}`);
    console.log(`│    Original : kcal=${fmt(o.kcal)}  prot=${fmt(o.prot)}g  carb=${fmt(o.carb)}g  fat=${fmt(o.fat)}g`);
    if (changed) {
      console.log(`│    Real     : kcal=${fmt(r.kcal)}  prot=${fmt(r.prot)}g  carb=${fmt(r.carb)}g  fat=${fmt(r.fat)}g`);
      console.log(`│    Diferença: kcal=${diff(o.kcal, r.kcal)}  prot=${diff(o.prot, r.prot)}g  carb=${diff(o.carb, r.carb)}g  fat=${diff(o.fat, r.fat)}g${tag}`);
    } else {
      console.log(`│    Real     : (igual)`);
    }
    console.log('│');

    totalOrigKcal += o.kcal; totalRealKcal += r.kcal;
    totalOrigProt += o.prot; totalRealProt += r.prot;
  });

  console.log('└─────────────────────────────────────────────────────────────────\n');
});

console.log('════ MÉDIA DIÁRIA (todas as semanas) ════');
const n = orig.reduce((a, m) => a + m.options.length, 0);
if (n > 0) {
  const avgOrigKcal = Math.round(totalOrigKcal / n);
  const avgRealKcal = Math.round(totalRealKcal / n);
  const avgOrigProt = +(totalOrigProt / n).toFixed(1);
  const avgRealProt = +(totalRealProt / n).toFixed(1);
  console.log(`  Original : kcal≈${avgOrigKcal}  prot≈${avgOrigProt}g`);
  console.log(`  Real     : kcal≈${avgRealKcal}  prot≈${avgRealProt}g`);
  console.log(`  Diferença: kcal ${avgRealKcal - avgOrigKcal > 0 ? '+' : ''}${avgRealKcal - avgOrigKcal}  prot ${avgRealProt - avgOrigProt > 0 ? '+' : ''}${+(avgRealProt - avgOrigProt).toFixed(1)}g`);
}
console.log('');
