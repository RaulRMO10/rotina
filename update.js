const fs = require('fs');
let code = fs.readFileSync('c:\\Users\\Raul Martins\\rotina\\data.js', 'utf8');

let dataScope = {};
const script = `
  ${code};
  dataScope.MEALS = MEALS;
  dataScope.SHOP_MAP = SHOP_MAP;
  dataScope.COOK_INFO = COOK_INFO;
  dataScope.RECIPES = RECIPES;
  dataScope.TRAINING = TRAINING;
  dataScope.SCHEDULE = SCHEDULE;
`;
eval(script);

let { MEALS, SHOP_MAP, COOK_INFO, RECIPES, TRAINING, SCHEDULE } = dataScope;

MEALS.forEach(meal => {
  meal.options.forEach(opt => {
    opt.ingredients.forEach(ing => {
      // multiply qty, kcal, prot, carb, fat by 1.35
      if (ing.unit === "un" || ing.unit === "fatias" || ing.unit === "fatia") {
         ing.qty = Math.round(ing.qty * 1.35) || 1;
      } else {
         ing.qty = Math.round(ing.qty * 1.35);
      }
      ing.kcal = Math.round(ing.kcal * 1.35);
      ing.prot = +(ing.prot * 1.35).toFixed(1);
      ing.carb = +(ing.carb * 1.35).toFixed(1);
      ing.fat = +(ing.fat * 1.35).toFixed(1);
      
      // Substitute Whey for YoPRO
      if (ing.shopKey === 'whey') {
         ing.food = 'YoPRO / Bebida Láctea';
         ing.unit = 'un';
         ing.qty = 1;
         ing.shopKey = 'yopro';
         ing.kcal = 160;
         ing.prot = 25.0;
         ing.carb = 15.0;
         ing.fat = 0.5;
      }
      
      // Substitute some Aveia to Granola for variety
      if (ing.shopKey === 'aveia' && (opt.id === 'lanche1-7' || opt.id === 'cafe-8' || opt.id === 'lanche1-1')) {
         ing.food = 'Granola';
         ing.shopKey = 'granola';
         ing.kcal = Math.round(ing.qty * 4.5);
         ing.prot = +(ing.qty * 0.1).toFixed(1);
         ing.carb = +(ing.qty * 0.7).toFixed(1);
         ing.fat = +(ing.qty * 0.15).toFixed(1);
      }
    });

    if (opt.id === 'lanche1-6' || opt.id === 'pre-6') {
       opt.name = opt.name.replace(/Whey/gi, 'YoPRO');
    }
    if (opt.id === 'lanche1-7') opt.name = opt.name.replace(/Aveia/gi, 'Granola');
  });
});

delete SHOP_MAP.whey;
SHOP_MAP.yopro = { name: "YoPRO / Bebida Láctea", cat: "🥛 Laticínios", buyUnit: "un", buySize: 1, unitG: "un", price: [6, 10] };
SHOP_MAP.granola = { name: "Granola", cat: "🍚 Carboidratos", buyUnit: "pct", buySize: 500, unitG: "g", price: [15, 25] };

let newCode = `// ===== TABELA NUTRICIONAL BASE (por 100g ou unidade) =====

const MEALS = ${JSON.stringify(MEALS, null, 2)};

const SHOP_MAP = ${JSON.stringify(SHOP_MAP, null, 2)};

const COOK_INFO = ${JSON.stringify(COOK_INFO, null, 2)};

const RECIPES = ${JSON.stringify(RECIPES, null, 2)};

const TRAINING = ${JSON.stringify(TRAINING, null, 2)};

const SCHEDULE = ${JSON.stringify(SCHEDULE, null, 2)};
`;

fs.writeFileSync('c:\\Users\\Raul Martins\\rotina\\data.js', newCode);
console.log("Updated data.js");
