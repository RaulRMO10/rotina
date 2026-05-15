const fs = require('fs');
let code = fs.readFileSync('data.js', 'utf8');

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
      if (ing.shopKey === 'iogurte') {
         ing.food = 'Iogurte Zero Açúcar (Morango/Ameixa)';
      }
    });
  });
});

if (SHOP_MAP.iogurte) {
  SHOP_MAP.iogurte.name = 'Iogurte Zero Açúcar (Morango/Ameixa)';
  SHOP_MAP.iogurte.buyUnit = "garrafa";
  SHOP_MAP.iogurte.buySize = 850;
  SHOP_MAP.iogurte.price = [12, 18];
}

let newCode = `// ===== TABELA NUTRICIONAL BASE (por 100g ou unidade) =====

const MEALS = ${JSON.stringify(MEALS, null, 2)};

const SHOP_MAP = ${JSON.stringify(SHOP_MAP, null, 2)};

const COOK_INFO = ${JSON.stringify(COOK_INFO, null, 2)};

const RECIPES = ${JSON.stringify(RECIPES, null, 2)};

const TRAINING = ${JSON.stringify(TRAINING, null, 2)};

const SCHEDULE = ${JSON.stringify(SCHEDULE, null, 2)};
`;

fs.writeFileSync('data.js', newCode);
console.log("Substituição de Iogurte Natural concluída com sucesso!");
