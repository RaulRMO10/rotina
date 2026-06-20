// ===== STATE =====
const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const DAYS_FULL = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const WEEKS = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
// Meses disponíveis: idx = número do mês (5=Maio, 6=Junho, ...)
const MONTHS = [
  { idx: 5,  name: 'Maio' },
  { idx: 6,  name: 'Junho' },
  { idx: 7,  name: 'Julho' },
  { idx: 8,  name: 'Agosto' },
  { idx: 9,  name: 'Setembro' },
  { idx: 10, name: 'Outubro' },
  { idx: 11, name: 'Novembro' },
  { idx: 12, name: 'Dezembro' },
];

const state = {
  plan: {},        // monthIdx -> weekIdx -> dayIdx -> mealId -> optionIdx
  activeMonth: 5,  // 5=Maio (mês atual de início)
  activeWeek: 0,
  activeDay: 0,
  expandedMeal: null,
  shoppingPeriod: 'monthly'
};

// Init defaults
MONTHS.forEach(({ idx: mi }) => {
  state.plan[mi] = {};
  WEEKS.forEach((_, wi) => {
    state.plan[mi][wi] = {};
    DAYS.forEach((_, di) => {
      state.plan[mi][wi][di] = {};
      MEALS.forEach(m => { state.plan[mi][wi][di][m.id] = 0; });
    });
  });
});

// Load from localStorage
try {
  const saved = localStorage.getItem('rotinaState');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Migra formato antigo (sem dimensão de mês) para o novo
    if (parsed.plan && !parsed.plan[5]) {
      state.plan[5] = parsed.plan;
    } else if (parsed.plan) {
      state.plan = parsed.plan;
    }
    if (parsed.activeMonth) state.activeMonth = parsed.activeMonth;
    if (parsed.shoppingPeriod) state.shoppingPeriod = parsed.shoppingPeriod;
  }
} catch(e) { console.error('Error loading state', e); }

function saveState() {
  localStorage.setItem('rotinaState', JSON.stringify({ plan: state.plan, activeMonth: state.activeMonth, shoppingPeriod: state.shoppingPeriod }));
  if (window.DB) {
    showSync();
    DB.debouncedSync(state.plan);
  }
}

// ===== HELPERS =====
function sumMacros(ingredients) {
  return ingredients.reduce((acc, i) => ({
    kcal: acc.kcal + i.kcal, prot: acc.prot + i.prot,
    carb: acc.carb + i.carb, fat: acc.fat + i.fat
  }), { kcal: 0, prot: 0, carb: 0, fat: 0 });
}

function getDayTotals(wi, di) {
  let t = { kcal: 0, prot: 0, carb: 0, fat: 0 };
  MEALS.forEach(m => {
    const opt = m.options[state.plan[state.activeMonth][wi][di][m.id]];
    const mc = sumMacros(opt.ingredients);
    t.kcal += mc.kcal; t.prot += mc.prot; t.carb += mc.carb; t.fat += mc.fat;
  });
  return t;
}

function getMonthlyAvg() {
  let t = { kcal: 0, prot: 0, carb: 0, fat: 0 }, count = 0;
  WEEKS.forEach((_, wi) => DAYS.forEach((_, di) => {
    const d = getDayTotals(wi, di);
    t.kcal += d.kcal; t.prot += d.prot; t.carb += d.carb; t.fat += d.fat;
    count++;
  }));
  return { kcal: t.kcal / count, prot: t.prot / count, carb: t.carb / count, fat: t.fat / count };
}

function updateHeaderMacros() {
  const avg = getMonthlyAvg();
  document.querySelector('.macro-card.cal .macro-val').textContent = Math.round(avg.kcal).toLocaleString('pt-BR');
  document.querySelector('.macro-card.prot .macro-val').textContent = Math.round(avg.prot) + 'g';
  document.querySelector('.macro-card.carb .macro-val').textContent = Math.round(avg.carb) + 'g';
  document.querySelector('.macro-card.fat .macro-val').textContent = Math.round(avg.fat) + 'g';
}

function getDisplayIngredient(ing) {
  let qty = ing.qty;
  let food = ing.food;
  if (ing.shopKey && typeof COOK_INFO !== 'undefined' && COOK_INFO[ing.shopKey]) {
    const info = COOK_INFO[ing.shopKey];
    if (info.dataState === 'raw' && ing.unit !== 'un' && ing.unit !== 'fatias') {
      qty = Math.round(ing.qty * info.cookRatio);
      food = food.replace(' (peso cru)', '');
    }
  }
  return Object.assign({}, ing, { qty, food });
}

// ===== NAV =====
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.section).classList.add('active');
    if (btn.dataset.section === 'shopping') renderShopping();
    if (btn.dataset.section === 'prep') renderPrepTab();
  });
});

// ===== MEALS SECTION =====
function renderMeals() {
  const section = document.getElementById('meals');
  section.innerHTML = `
    <div class="month-tabs" id="month-tabs"></div>
    <div class="week-tabs" id="week-tabs"></div>
    <div class="week-overview" id="week-overview"></div>
    <div class="day-tabs" id="day-tabs"></div>
    <div class="day-totals-bar" id="day-totals-bar"></div>
    <div class="day-meals" id="day-meals"></div>
  `;
  renderMonthTabs();
  renderWeekTabs();
  renderWeekOverview();
  renderDayTabs();
  renderDayDetail();
}

function renderMonthTabs() {
  const el = document.getElementById('month-tabs');
  el.innerHTML = MONTHS.map(m =>
    `<button class="month-tab ${m.idx === state.activeMonth ? 'active' : ''}" data-month="${m.idx}">
      ${m.name}
    </button>`
  ).join('');
  el.querySelectorAll('.month-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeMonth = parseInt(btn.dataset.month);
      state.activeWeek = 0;
      state.activeDay = 0;
      state.expandedMeal = null;
      saveState();
      renderMeals();
    });
  });
}

function renderWeekTabs() {
  const el = document.getElementById('week-tabs');
  el.innerHTML = WEEKS.map((w, wi) =>
    `<button class="week-tab ${wi === state.activeWeek ? 'active' : ''}" data-week="${wi}">
      <span class="wt-name">${w}</span>
    </button>`
  ).join('');
  el.querySelectorAll('.week-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeWeek = parseInt(btn.dataset.week);
      state.activeDay = 0;
      state.expandedMeal = null;
      renderMeals();
    });
  });
}

function renderWeekOverview() {
  const el = document.getElementById('week-overview');
  const wi = state.activeWeek;
  const headerCells = DAYS.map((d, di) =>
    `<th class="wo-day-head ${di === state.activeDay ? 'active' : ''}" data-day="${di}">${d}</th>`
  ).join('');

  const mealRows = MEALS.map(m => {
    const cells = DAYS.map((_, di) => {
      const optIdx = state.plan[state.activeMonth][wi][di][m.id];
      const opt = m.options[optIdx];
      const macros = sumMacros(opt.ingredients);
      return `<td class="wo-cell ${di === state.activeDay ? 'active' : ''}" data-day="${di}" data-meal="${m.id}">
        <div class="wo-opt-name">${opt.name}</div>
        <div class="wo-opt-macros">${Math.round(macros.prot)}g P</div>
      </td>`;
    }).join('');
    return `<tr><td class="wo-meal-label">${m.icon} ${m.name}</td>${cells}</tr>`;
  }).join('');

  const totalCells = DAYS.map((_, di) => {
    const t = getDayTotals(wi, di);
    return `<td class="wo-total ${di === state.activeDay ? 'active' : ''}">
      <span class="wo-total-kcal">${Math.round(t.kcal)}</span>
      <span class="wo-total-prot">${Math.round(t.prot)}g P</span>
    </td>`;
  }).join('');

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin:8px 0 12px; gap: 10px; flex-wrap: wrap;">
      <p class="section-sub" style="margin:0">Clique num dia ou célula para editar. A visão é da <strong>${WEEKS[wi]}</strong>.</p>
      <button id="export-btn" style="padding: 10px 16px; background: var(--green); color: #000; font-size: 13px; font-weight: 800; border: none; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3); transition: transform 0.2s;">
        📲 Copiar para WhatsApp
      </button>
    </div>
    <div class="wo-table-wrap">
      <table class="wo-table">
        <thead><tr><th class="wo-corner"></th>${headerCells}</tr></thead>
        <tbody>${mealRows}</tbody>
        <tfoot><tr><td class="wo-meal-label">📊 Total</td>${totalCells}</tr></tfoot>
      </table>
    </div>
  `;

  el.querySelector('#export-btn').addEventListener('click', () => {
    const wi = state.activeWeek;
    let txt = `🗓️ *CARDÁPIO - ${WEEKS[wi]}*\nRotina do Raul\n\n`;
    DAYS.forEach((d, di) => {
      txt += `*— ${DAYS_FULL[di].toUpperCase()} —*\n`;
      MEALS.forEach(m => {
        const opt = m.options[state.plan[state.activeMonth][wi][di][m.id]];
        txt += `${m.icon} *${m.time} | ${m.name}*\n`;
        txt += `👉 ${opt.name}\n`;
        opt.ingredients.forEach(rawIng => {
          const i = getDisplayIngredient(rawIng);
          txt += `  • ${i.qty}${i.unit} - ${i.food}\n`;
        });
        txt += `\n`;
      });
      txt += `\n`;
    });
    navigator.clipboard.writeText(txt).then(() => {
      alert('✅ Cardápio copiado com sucesso!\n\nAgora é só abrir o WhatsApp e colar (Ctrl+V).');
    }).catch(e => alert('Erro ao copiar. Tente selecionar o texto manualmente.'));
  });

  el.querySelectorAll('.wo-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      state.activeDay = parseInt(cell.dataset.day);
      state.expandedMeal = parseInt(cell.dataset.meal);
      renderWeekOverview(); renderDayTabs(); renderDayDetail();
      setTimeout(() => {
        const exp = document.querySelector('.meal-slot.expanded');
        if (exp) exp.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  });

  el.querySelectorAll('.wo-day-head').forEach(th => {
    th.addEventListener('click', () => {
      state.activeDay = parseInt(th.dataset.day);
      state.expandedMeal = null;
      renderWeekOverview(); renderDayTabs(); renderDayDetail();
    });
  });
}

// ===== PREP TAB (aba separada) =====
function fmtQty(qty, unit, isUnits) {
  if (isUnits) return `${Math.round(qty)} ${unit}`;
  return qty >= 1000 ? `${(qty/1000).toFixed(2)}kg` : `${Math.round(qty)}g`;
}

function analyzeWeekPrep(wi) {
  const usages = [];
  DAYS.forEach((dName, di) => {
    MEALS.forEach(meal => {
      const optIdx = state.plan[state.activeMonth][wi][di][meal.id];
      const opt = meal.options[optIdx];
      opt.ingredients.forEach(ing => {
        usages.push({
          shopKey: ing.shopKey, qty: ing.qty, unit: ing.unit,
          dayIdx: di, dayName: DAYS_FULL[di],
          mealName: meal.name, mealIcon: meal.icon,
          optionName: opt.name
        });
      });
    });
  });

  const grouped = {};
  usages.forEach(u => {
    if (!grouped[u.shopKey]) grouped[u.shopKey] = [];
    grouped[u.shopKey].push(u);
  });

  const items = [];
  Object.entries(grouped).forEach(([key, uses]) => {
    const info = COOK_INFO[key];
    if (!info || !info.preppable) return;
    const totalQty = uses.reduce((s, u) => s + u.qty, 0);
    const unit = uses[0].unit;
    const isUnits = (unit === 'un' || unit === 'fatias');
    let rawTotal, cookedTotal;
    if (isUnits) { rawTotal = totalQty; cookedTotal = totalQty; }
    else if (info.dataState === 'cooked') { cookedTotal = totalQty; rawTotal = cookedTotal / info.cookRatio; }
    else { rawTotal = totalQty; cookedTotal = rawTotal * info.cookRatio; }

    const mealGroups = {};
    uses.forEach(u => {
      let portionCooked = isUnits ? u.qty : (info.dataState === 'raw' ? u.qty * info.cookRatio : u.qty);
      const k = `${u.mealName}|${portionCooked}`;
      if (!mealGroups[k]) mealGroups[k] = { mealName: u.mealName, mealIcon: u.mealIcon, qty: portionCooked, days: [], opts: new Set() };
      mealGroups[k].days.push({ idx: u.dayIdx, name: u.dayName });
      mealGroups[k].opts.add(u.optionName);
    });

    const containers = [];
    Object.values(mealGroups).forEach(mg => {
      const fridge = mg.days.filter(d => d.idx <= 2).map(d => d.name.substring(0,3));
      const freezer = mg.days.filter(d => d.idx > 2).map(d => d.name.substring(0,3));
      containers.push({
        mealName: mg.mealName, mealIcon: mg.mealIcon,
        portionQty: mg.qty, total: mg.days.length,
        opts: [...mg.opts], fridge, freezer
      });
    });

    items.push({
      key, icon: info.icon, prepAction: info.prepAction, howTo: info.howTo || [],
      rawTotal, cookedTotal, unit, isUnits, containers,
      shopName: SHOP_MAP[key] ? SHOP_MAP[key].name : key
    });
  });
  return items;
}

function renderPrepTab() {
  const section = document.getElementById('prep');

  const weeksHtml = WEEKS.map((wName, wi) => {
    const items = analyzeWeekPrep(wi);

    // ─── INGREDIENT CARDS ───
    const ingredientCards = items.map((p, idx) => {
      const containerRows = p.containers.map(c => {
        const portionTxt = p.isUnits ? `${c.portionQty} ${p.unit}` : `${Math.round(c.portionQty)}g pronto`;
        const fridgeHtml = c.fridge.length ? `<div class="ctn-storage-line">🧊 Geladeira (${c.fridge.join(', ')}): <strong>${c.fridge.length}</strong> pote${c.fridge.length>1?'s':''} de ${portionTxt}</div>` : '';
        const freezerHtml = c.freezer.length ? `<div class="ctn-storage-line">❄️ Freezer (${c.freezer.join(', ')}): <strong>${c.freezer.length}</strong> pote${c.freezer.length>1?'s':''} de ${portionTxt}</div>` : '';
        return `<div class="ctn-row">
          <div class="ctn-meal-label">${c.mealIcon} <strong>${c.mealName}</strong> <span class="ctn-opt-name">— ${c.opts.join(', ')}</span></div>
          <div class="ctn-portion-info">→ ${c.total} vasilha${c.total>1?'s':''} de <strong>${portionTxt}</strong> cada</div>
          <div class="ctn-storage">${fridgeHtml}${freezerHtml}</div>
        </div>`;
      }).join('');
      const steps = p.howTo.map(s => {
        const isTip = s.startsWith('📦') || s.startsWith('⚠️');
        return `<li class="prep-step ${isTip ? 'prep-step-tip' : ''}">${s}</li>`;
      }).join('');
      const totalCtns = p.containers.reduce((s,c) => s + c.total, 0);
      return `
      <div class="prep-item-full">
        <div class="prep-item-header" data-idx="w${wi}-i${idx}">
          <span class="prep-icon">${p.icon}</span>
          <div class="prep-item-main">
            <div class="prep-action">${p.shopName}</div>
            <div class="prep-amounts">
              <span class="prep-raw">🔴 ${fmtQty(p.rawTotal, p.unit, p.isUnits)} cru</span>
              <span class="prep-arrow">→</span>
              <span class="prep-cooked">🟢 ${fmtQty(p.cookedTotal, p.unit, p.isUnits)} pronto</span>
              <span class="prep-ctn-badge">📦 ${totalCtns} vasilhas</span>
            </div>
          </div>
          <span class="prep-expand-icon">▼</span>
        </div>
        <div class="prep-item-body" id="prep-body-w${wi}-i${idx}">
          <div class="prep-section-label">📦 Distribuição em Vasilhas</div>
          <div class="ctn-list">${containerRows}</div>
          <div class="prep-section-label">👨‍🍳 Como Preparar — ${p.prepAction}</div>
          <ol class="prep-steps">${steps}</ol>
        </div>
      </div>`;
    }).join('');

    // ─── MEAL RECIPES ───
    const selectedMeals = [];
    const seenOpts = new Set();
    DAYS.forEach((_, di) => {
      MEALS.forEach(meal => {
        const optIdx = state.plan[state.activeMonth][wi][di][meal.id];
        const opt = meal.options[optIdx];
        if (seenOpts.has(opt.id)) return;
        seenOpts.add(opt.id);
        let recipe = RECIPES[opt.id];
        if (!recipe) {
          let prepType = 'na_hora', label = '⏰ Preparo Rápido', steps = [];
          if (meal.id === 3 || meal.id === 5) {
            prepType = 'domingo'; label = '📅 Porções da Semana';
            steps = ['Retire as porções de carboidrato e proteína já preparadas no seu Meal Prep de Domingo.', 'Adicione as folhas/saladas sempre frescas na hora de consumir.', 'Aqueça no micro-ondas por 2 a 3 minutos.'];
          } else if (meal.id === 1 && opt.name.toLowerCase().includes('overnight')) {
            prepType = 'noite'; label = '🌙 Noite Anterior';
            steps = ['Misture os ingredientes secos e úmidos num pote e deixe na geladeira durante a noite.'];
          } else if (meal.id === 1) {
            prepType = 'na_hora'; label = '⏰ Café Expresso';
            steps = ['Prepare os ingredientes principais (ovos/tapioca) na frigideira.', 'Acompanhe com a porção de fruta fresca ou laticínio.'];
          } else {
            prepType = 'na_hora'; label = '⏰ Lanche Prático';
            steps = ['Reúna os ingredientes e consuma.', 'Se for levar para o serviço/academia, utilize potes bem vedados.'];
          }
          recipe = { prepType, label, steps };
        }
        let usedDays = [];
        DAYS.forEach((d, d2) => { if (state.plan[state.activeMonth][wi][d2][meal.id] === optIdx) usedDays.push(d); });
        selectedMeals.push({ optId: opt.id, mealName: meal.name, mealIcon: meal.icon, mealTime: meal.time,
          optName: opt.name, days: usedDays, ...recipe });
      });
    });

    const groups = { domingo: [], noite: [], na_hora: [] };
    selectedMeals.forEach(m => { if (groups[m.prepType]) groups[m.prepType].push(m); });

    const groupMeta = {
      domingo: { title: '📅 Preparar no Domingo', color: 'var(--green)' },
      noite:   { title: '🌙 Preparar na Noite Anterior', color: 'var(--accent)' },
      na_hora: { title: '⏰ Preparar na Hora', color: 'var(--orange)' }
    };

    let mealIdx = 0;
    const mealGroupsHtml = ['domingo', 'noite', 'na_hora'].map(type => {
      const meals = groups[type];
      if (!meals.length) return '';
      const gm = groupMeta[type];
      const cards = meals.map(m => {
        const ci = mealIdx++;
        const stepsHtml = m.steps.map(s => {
          const isTip = s.startsWith('📦') || s.startsWith('⚠️') || s.startsWith('❄️') || s.startsWith('💡');
          return `<li class="prep-step ${isTip ? 'prep-step-tip' : ''}">${s}</li>`;
        }).join('');
        return `
        <div class="prep-item-full">
          <div class="prep-item-header" data-idx="w${wi}-m${ci}">
            <span class="prep-icon">${m.mealIcon}</span>
            <div class="prep-item-main">
              <div class="prep-action">${m.optName}</div>
              <div class="prep-amounts">
                <span class="prep-meal-time">${m.mealTime} — ${m.mealName}</span>
                <span class="prep-meal-days">${m.days.join(', ')}</span>
                <span class="prep-type-badge" style="background:${gm.color}22;color:${gm.color}">${m.label}</span>
              </div>
            </div>
            <span class="prep-expand-icon">▼</span>
          </div>
          <div class="prep-item-body" id="prep-body-w${wi}-m${ci}">
            <ol class="prep-steps">${stepsHtml}</ol>
          </div>
        </div>`;
      }).join('');
      return `<div class="prep-group-label" style="border-left-color:${gm.color}">${gm.title}</div>${cards}`;
    }).join('');

    const totalCtns = items.reduce((s, p) => s + p.containers.reduce((s2, c) => s2 + c.total, 0), 0);

    return `
    <div class="prep-week-block">
      <div class="prep-week-header" data-week="${wi}">
        <h3>${wName}</h3>
        <div class="prep-week-badges">
          <span class="prep-week-badge">${items.length} ingredientes</span>
          <span class="prep-week-badge badge-ctn">📦 ${totalCtns} vasilhas</span>
          <span class="prep-week-badge badge-meals">${selectedMeals.length} receitas</span>
        </div>
      </div>
      <div class="prep-week-body" id="prep-week-body-${wi}">
        <div class="prep-big-section">
          <h4 class="prep-big-title">🥩 Ingredientes — Preparo e Vasilhas</h4>
          <p class="prep-desc">Prepare estes ingredientes no domingo. Divida em vasilhas e armazene.</p>
          ${ingredientCards}
          <div class="prep-tip">💡 <strong>Geladeira (Seg–Qua)</strong>: consome fresco. <strong>Freezer (Qui–Sáb)</strong>: tire na noite anterior.</div>
        </div>
        <div class="prep-big-section">
          <h4 class="prep-big-title">🍽️ Receitas — Como Montar Cada Refeição</h4>
          <p class="prep-desc">Todas as refeições selecionadas pra esta semana, com passo a passo.</p>
          ${mealGroupsHtml}
        </div>
      </div>
    </div>`;
  }).join('');

  section.innerHTML = `
    <h2 class="section-title">👨‍🍳 Preparo Semanal</h2>
    <p class="section-sub">Ingredientes, vasilhas e receitas baseados nas suas seleções. Clique pra expandir.</p>
    ${weeksHtml}
  `;

  section.querySelectorAll('.prep-week-header').forEach(h => {
    h.addEventListener('click', () => {
      document.getElementById(`prep-week-body-${h.dataset.week}`).classList.toggle('collapsed');
    });
  });
  section.querySelectorAll('.prep-item-header').forEach(h => {
    h.addEventListener('click', () => {
      const body = document.getElementById(`prep-body-${h.dataset.idx}`);
      body.classList.toggle('show');
      h.querySelector('.prep-expand-icon').textContent = body.classList.contains('show') ? '▲' : '▼';
    });
  });
}

function renderDayTabs() {
  const el = document.getElementById('day-tabs');
  const wi = state.activeWeek;
  el.innerHTML = DAYS.map((d, di) => {
    const t = getDayTotals(wi, di);
    return `<button class="day-tab ${di === state.activeDay ? 'active' : ''}" data-day="${di}">
      <span class="dt-name">${d}</span>
      <span class="dt-kcal">${Math.round(t.kcal)} kcal</span>
    </button>`;
  }).join('');
  el.querySelectorAll('.day-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeDay = parseInt(btn.dataset.day);
      state.expandedMeal = null;
      renderWeekOverview(); renderDayTabs(); renderDayDetail();
    });
  });
}

function renderDayDetail() {
  const el = document.getElementById('day-meals');
  const wi = state.activeWeek, di = state.activeDay;
  const totals = getDayTotals(wi, di);

  const dayCheckboxesHtml = DAYS.map((d, dIdx) => `
    <label class="copy-day-lbl ${dIdx === di ? 'active' : ''}">
      <input type="checkbox" class="copy-day-cbx" value="${dIdx}" ${dIdx === di ? 'checked disabled' : ''}>
      ${d}
    </label>
  `).join('');

  document.getElementById('day-totals-bar').innerHTML = `
    <div class="dtb">
      <span class="dtb-day">${WEEKS[wi]} — ${DAYS_FULL[di]}</span>
      <span class="dtb-macro cal">${Math.round(totals.kcal)} kcal</span>
      <span class="dtb-macro p">${Math.round(totals.prot)}g P</span>
      <span class="dtb-macro c">${Math.round(totals.carb)}g C</span>
      <span class="dtb-macro g">${Math.round(totals.fat)}g G</span>
    </div>
    <details class="day-copy-details">
      <summary>📋 Copiar todas as refeições deste dia...</summary>
      <div class="copy-section" style="margin-top: 12px;">
        <div class="copy-days-grid">${dayCheckboxesHtml}</div>
        <div class="copy-actions">
          <button class="copy-btn copy-day-week">Aplicar nesta semana</button>
          <button class="copy-btn copy-day-month">Aplicar em todo o mês</button>
        </div>
      </div>
    </details>
  `;

  el.innerHTML = MEALS.map(meal => {
    const optIdx = state.plan[state.activeMonth][wi][di][meal.id];
    const opt = meal.options[optIdx];
    const macros = sumMacros(opt.ingredients);
    const isExpanded = state.expandedMeal === meal.id;

    const ingredientRows = opt.ingredients.map(rawIng => {
      const f = getDisplayIngredient(rawIng);
      return `<tr><td>${f.food}</td><td>${f.qty}${f.unit}</td>
        <td class="kcal-cell">${Math.round(f.kcal)}</td>
        <td class="prot-cell">${f.prot.toFixed(1)}g</td>
        <td class="carb-cell">${f.carb.toFixed(1)}g</td>
        <td class="fat-cell">${f.fat.toFixed(1)}g</td></tr>`;
    }).join('');

    const optionCards = isExpanded ? meal.options.map((o, oi) => {
      const om = sumMacros(o.ingredients);
      return `<div class="option-card ${oi === optIdx ? 'selected' : ''}" data-meal-id="${meal.id}" data-opt="${oi}">
        <div class="option-radio">${oi === optIdx ? '●' : '○'}</div>
        <div class="option-info"><div class="option-name">${o.name}</div><div class="option-desc">${o.desc}</div></div>
        <div class="option-macros-mini">
          <span class="om-kcal">${Math.round(om.kcal)}</span><span class="om-label">kcal</span>
          <span class="om-prot">${Math.round(om.prot)}g P</span>
        </div>
      </div>`;
    }).join('') : '';

    // Copy to other days button
    const dayCheckboxes = DAYS.map((d, dIdx) => `
      <label class="copy-day-lbl ${dIdx === di ? 'active' : ''}">
        <input type="checkbox" class="copy-day-cbx" value="${dIdx}" ${dIdx === di ? 'checked disabled' : ''}>
        ${d}
      </label>
    `).join('');

    const copyBtns = isExpanded ? `
      <div class="copy-section">
        <div class="copy-days-grid">${dayCheckboxes}</div>
        <div class="copy-actions">
          <button class="copy-btn copy-selected" data-meal-id="${meal.id}" data-opt="${optIdx}">📋 Aplicar nesta semana</button>
          <button class="copy-btn copy-selected-month" data-meal-id="${meal.id}" data-opt="${optIdx}">📋 Aplicar em todo o mês</button>
        </div>
      </div>` : '';

    return `
    <div class="meal-slot ${isExpanded ? 'expanded' : ''}" data-meal-id="${meal.id}">
      <div class="ms-header" data-meal-id="${meal.id}">
        <div class="ms-left">
          <span class="ms-time">${meal.time}</span><span class="ms-icon">${meal.icon}</span>
          <div class="ms-info"><div class="ms-meal-name">${meal.name}</div><div class="ms-opt-name">${opt.name}</div></div>
        </div>
        <div class="ms-right">
          <span class="ms-kcal">${Math.round(macros.kcal)}</span>
          <span class="ms-prot">${Math.round(macros.prot)}g P</span>
          <span class="ms-toggle">${isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>
      ${isExpanded ? `<div class="ms-detail">
        <h3 class="sub-title">Escolha a opção para ${DAYS_FULL[di]}:</h3>
        <div class="options-grid">${optionCards}</div>
        ${copyBtns}
        <h3 class="sub-title detail-title">📋 ${opt.name} — Ingredientes</h3>
        <div class="table-wrap">
          <table class="food-table">
            <thead><tr><th>Alimento</th><th>Qtd</th><th>Kcal</th><th>Prot</th><th>Carbo</th><th>Gord</th></tr></thead>
            <tbody>${ingredientRows}</tbody>
            <tfoot><tr class="total-row"><td><strong>TOTAL</strong></td><td></td>
              <td class="kcal-cell"><strong>${Math.round(macros.kcal)}</strong></td>
              <td class="prot-cell"><strong>${macros.prot.toFixed(1)}g</strong></td>
              <td class="carb-cell"><strong>${macros.carb.toFixed(1)}g</strong></td>
              <td class="fat-cell"><strong>${macros.fat.toFixed(1)}g</strong></td>
            </tr></tfoot>
          </table>
        </div>
      </div>` : ''}
    </div>`;
  }).join('');

  // Bind day-level copy options
  const totalsBar = document.getElementById('day-totals-bar');
  totalsBar.querySelectorAll('.copy-day-lbl input').forEach(cbx => {
    cbx.addEventListener('change', (e) => {
      e.target.parentElement.classList.toggle('active', e.target.checked);
    });
  });

  const getSelectedDaysBlock = (container) => Array.from(container.querySelectorAll('.copy-day-cbx:checked')).map(cb => parseInt(cb.value));

  totalsBar.querySelector('.copy-day-week').addEventListener('click', () => {
    const selectedDays = getSelectedDaysBlock(totalsBar);
    selectedDays.forEach(d => {
      MEALS.forEach(meal => { state.plan[state.activeMonth][wi][d][meal.id] = state.plan[state.activeMonth][wi][di][meal.id]; });
    });
    saveState();
    renderWeekOverview(); renderDayTabs(); renderDayDetail(); updateHeaderMacros();
  });

  totalsBar.querySelector('.copy-day-month').addEventListener('click', () => {
    const selectedDays = getSelectedDaysBlock(totalsBar);
    WEEKS.forEach((_, w) => {
      selectedDays.forEach(d => {
        MEALS.forEach(meal => { state.plan[state.activeMonth][w][d][meal.id] = state.plan[state.activeMonth][wi][di][meal.id]; });
      });
    });
    saveState();
    renderWeekOverview(); renderDayTabs(); renderDayDetail(); updateHeaderMacros();
  });

  // Bind meal header clicks
  el.querySelectorAll('.ms-header').forEach(h => {
    h.addEventListener('click', () => {
      const mid = parseInt(h.dataset.mealId);
      state.expandedMeal = state.expandedMeal === mid ? null : mid;
      renderDayDetail();
    });
  });

  // Bind option selection
  el.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      state.plan[state.activeMonth][wi][di][parseInt(card.dataset.mealId)] = parseInt(card.dataset.opt);
      saveState();
      renderWeekOverview(); renderDayTabs(); renderDayDetail(); updateHeaderMacros();
    });
  });

  // Bind copy day checks
  el.querySelectorAll('.copy-day-lbl input').forEach(cbx => {
    cbx.addEventListener('change', (e) => {
      e.target.parentElement.classList.toggle('active', e.target.checked);
    });
  });

  // Bind copy buttons
  el.querySelectorAll('.copy-selected').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mid = parseInt(btn.dataset.mealId), oi = parseInt(btn.dataset.opt);
      const slot = btn.closest('.meal-slot');
      const selectedDays = Array.from(slot.querySelectorAll('.copy-day-cbx:checked')).map(cb => parseInt(cb.value));
      selectedDays.forEach(d => { state.plan[state.activeMonth][wi][d][mid] = oi; });
      saveState();
      renderWeekOverview(); renderDayTabs(); renderDayDetail(); updateHeaderMacros();
    });
  });
  el.querySelectorAll('.copy-selected-month').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mid = parseInt(btn.dataset.mealId), oi = parseInt(btn.dataset.opt);
      const slot = btn.closest('.meal-slot');
      const selectedDays = Array.from(slot.querySelectorAll('.copy-day-cbx:checked')).map(cb => parseInt(cb.value));
      WEEKS.forEach((_, w) => {
        selectedDays.forEach(d => { state.plan[state.activeMonth][w][d][mid] = oi; });
      });
      saveState();
      renderWeekOverview(); renderDayTabs(); renderDayDetail(); updateHeaderMacros();
    });
  });
}

// ===== SHOPPING =====
function computeShoppingList() {
  const needs = {};
  let targetWeeks = [];
  
  if (state.shoppingPeriod === 'weekly') {
    targetWeeks = [state.activeWeek];
  } else if (state.shoppingPeriod === 'biweekly') {
    if (state.activeWeek < 2) targetWeeks = [0, 1]; // Semanas 1 e 2
    else targetWeeks = [2, 3]; // Semanas 3 e 4
  } else {
    targetWeeks = [0, 1, 2, 3]; // Mensal
  }

  targetWeeks.forEach(wi => DAYS.forEach((_, di) => {
    MEALS.forEach(meal => {
      const opt = meal.options[state.plan[state.activeMonth][wi][di][meal.id]];
      opt.ingredients.forEach(ing => {
        if (!needs[ing.shopKey]) needs[ing.shopKey] = { qty: 0, unit: ing.unit };
        let addQty = ing.qty;
        if (typeof COOK_INFO !== 'undefined' && COOK_INFO[ing.shopKey]) {
          const info = COOK_INFO[ing.shopKey];
          if (info.dataState === 'cooked') {
            addQty = ing.qty / info.cookRatio;
          }
        }
        needs[ing.shopKey].qty += addQty;
      });
    });
  }));

  const categories = {};
  Object.entries(needs).forEach(([key, val]) => {
    const shop = SHOP_MAP[key];
    if (!shop) return;
    if (!categories[shop.cat]) categories[shop.cat] = [];
    let display;
    if (val.unit === 'un' || val.unit === 'fatias' || val.unit === 'xíc') {
      display = `${Math.round(val.qty)} ${val.unit}`;
    } else {
      display = val.qty >= 1000 ? `${(val.qty/1000).toFixed(1)}kg` : `${Math.round(val.qty)}g`;
    }

    let packsAmt, packsStr;
    if (shop.buyUnit === 'kg') {
      packsAmt = val.qty / 1000;
      packsStr = packsAmt >= 1 ? `${packsAmt.toFixed(1)} kg` : `${Math.round(val.qty)}g`;
      const ratio = val.qty / shop.buySize;
      categories[shop.cat].push({
        name: shop.name, monthly: display, packs: packsStr,
        priceMin: ratio * shop.price[0], priceMax: ratio * shop.price[1]
      });
    } else {
      packsAmt = Math.ceil(val.qty / shop.buySize);
      packsStr = `${packsAmt} ${shop.buyUnit}`;
      categories[shop.cat].push({
        name: shop.name, monthly: display, packs: packsStr,
        priceMin: packsAmt * shop.price[0], priceMax: packsAmt * shop.price[1]
      });
    }
  });
  return { categories, targetWeeks };
}

function renderShopping() {
  const section = document.getElementById('shopping');
  const { categories, targetWeeks } = computeShoppingList();
  let totalMin = 0, totalMax = 0;

  // Mini summary per week
  const weekSummaries = targetWeeks.map(wi => {
    const wName = WEEKS[wi];
    const rows = MEALS.map(m => {
      const cells = DAYS.map((_, di) => {
        const opt = m.options[state.plan[state.activeMonth][wi][di][m.id]];
        return `<td class="ws-cell">${opt.name}</td>`;
      }).join('');
      return `<tr><td class="ws-label">${m.icon}</td>${cells}</tr>`;
    }).join('');
    return `<div class="ws-week-block">
      <div class="ws-week-title">${wName}</div>
      <div class="wo-table-wrap"><table class="ws-table">
        <thead><tr><th></th>${DAYS.map(d => `<th>${d}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
  }).join('');

  let catHtml = '';
  Object.entries(categories).forEach(([catName, items]) => {
    let catMin = 0, catMax = 0;
    const rows = items.map(item => {
      catMin += item.priceMin; catMax += item.priceMax;
      return `<div class="shop-item">
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-monthly">${item.monthly}</span>
        <span class="shop-item-packs">${item.packs}</span>
        <span class="shop-item-price">R$ ${item.priceMin.toFixed(0)}–${item.priceMax.toFixed(0)}</span>
      </div>`;
    }).join('');
    totalMin += catMin; totalMax += catMax;
    catHtml += `<div class="shop-category open">
      <div class="shop-header">
        <span class="shop-cat-name">${catName}</span>
        <span class="shop-cat-total">R$ ${catMin.toFixed(0)}–${catMax.toFixed(0)}</span>
      </div>
      <div class="shop-items">
        <div class="shop-item shop-item-header">
          <span class="shop-item-name"><strong>Item</strong></span>
          <span class="shop-item-monthly" style="color:var(--orange);"><strong>Peso Cru (Consumo)</strong></span>
          <span class="shop-item-packs"><strong>Comprar</strong></span>
          <span class="shop-item-price"><strong>Preço est.</strong></span>
        </div>${rows}
      </div>
    </div>`;
  });

  const periodTabs = `
    <div class="shop-period-tabs">
      <button class="shop-pd-btn ${state.shoppingPeriod === 'weekly' ? 'active' : ''}" data-period="weekly">Semanal (${WEEKS[state.activeWeek]})</button>
      <button class="shop-pd-btn ${state.shoppingPeriod === 'biweekly' ? 'active' : ''}" data-period="biweekly">Quinzenal (Sem ${state.activeWeek < 2 ? '1-2' : '3-4'})</button>
      <button class="shop-pd-btn ${state.shoppingPeriod === 'monthly' ? 'active' : ''}" data-period="monthly">Mensal (4 sem)</button>
    </div>
  `;

  section.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin:20px 0 12px; gap: 10px; flex-wrap: wrap;">
      <div>
        <h2 class="section-title" style="margin:0">🛒 Lista de Compras</h2>
        <p class="section-sub" style="margin:4px 0 0">Escolha o período para calcular as quantidades exatas.</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button id="export-shop-btn" style="padding: 10px 16px; background: var(--green); color: #000; font-size: 13px; font-weight: 800; border: none; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);">
          📲 Copiar para Bloco de Notas
        </button>
        <button id="save-shop-btn" style="padding: 10px 16px; background: #3b82f6; color: #fff; font-size: 13px; font-weight: 800; border: none; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 12px rgba(59,130,246,0.3);">
          💾 Salvar no Banco
        </button>
      </div>
    </div>
    ${periodTabs}
    <div class="week-summary">${weekSummaries}</div>
    ${catHtml}
    <div class="shop-total-bar">
      <div class="shop-total-val">R$ ${totalMin.toFixed(0)} – ${totalMax.toFixed(0)}</div>
      <div class="shop-total-label">Estimativa para o período selecionado</div>
    </div>
  `;
  
  section.querySelector('#save-shop-btn').addEventListener('click', async () => {
    if (!window.DB) return alert('DB não disponível.');
    const btn = section.querySelector('#save-shop-btn');
    btn.disabled = true; btn.textContent = '⏳ Salvando...';
    try {
      const flatItems = Object.entries(categories).flatMap(([cat, items]) =>
        items.map(i => ({ cat, name: i.name, monthly: i.monthly, packs: i.packs }))
      );
      await DB.saveShopping({ period: state.shoppingPeriod, items: flatItems, totalMin, totalMax });
      btn.textContent = '✅ Salvo!';
      setTimeout(() => { btn.disabled = false; btn.textContent = '💾 Salvar no Banco'; }, 2500);
    } catch (e) {
      alert('Erro ao salvar: ' + e.message);
      btn.disabled = false; btn.textContent = '💾 Salvar no Banco';
    }
  });

  section.querySelector('#export-shop-btn').addEventListener('click', () => {
    let periodName = state.shoppingPeriod === 'weekly' ? 'Semanal' : (state.shoppingPeriod === 'biweekly' ? 'Quinzenal' : 'Mensal');
    let txt = `🛒 *LISTA DE COMPRAS* (${periodName})\nEstimativa: R$ ${totalMin.toFixed(0)} – ${totalMax.toFixed(0)}\n\n`;

    Object.entries(categories).forEach(([catName, items]) => {
      txt += `*${catName}*\n`;
      items.forEach(item => {
        txt += `[ ] ${item.packs} - ${item.name} (consumo: ${item.monthly})\n`;
      });
      txt += `\n`;
    });

    navigator.clipboard.writeText(txt).then(() => {
      alert('✅ Lista de compras copiada com sucesso!\\n\\nAgora é só colar no seu aplicativo de anotações favorito.');
    }).catch(e => alert('Erro ao copiar.'));
  });

  section.querySelectorAll('.shop-pd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.shoppingPeriod = btn.dataset.period;
      saveState();
      renderShopping();
    });
  });

  section.querySelectorAll('.shop-header').forEach(h => {
    h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
  });
}

// ===== TRAINING =====
function renderTraining() {
  const section = document.getElementById('training');
  section.innerHTML = `
    <h2 class="section-title">🏋️ Plano de Treino Semanal</h2>
    <p class="section-sub">Treino das 18:45 às 19:45 (seg–sex). Sábado pela manhã. Clique para expandir.</p>
    <div class="week-grid" id="week-grid"></div>`;
  const grid = document.getElementById('week-grid');
  grid.innerHTML = TRAINING.map((d, i) => {
    const rows = d.exercises.map(e =>
      `<div class="exercise-row"><span class="exercise-name">${e.name}</span>
        <span class="exercise-sets">${e.sets}</span><span class="exercise-rest">${e.rest}</span></div>`
    ).join('');
    return `<div class="day-card" id="day-${i}">
      <div class="day-icon">${d.icon}</div>
      <div class="day-info"><div class="day-name">${d.day}</div><div class="day-type">${d.type}</div>
        <div class="day-detail">${d.exercises.length ? `
          <div class="exercise-row" style="font-weight:700;color:var(--text-dim);font-size:11px;text-transform:uppercase;letter-spacing:1px;">
            <span class="exercise-name">Exercício</span><span class="exercise-sets">Séries</span><span class="exercise-rest">Desc.</span>
          </div>${rows}` : '<p style="color:var(--text-dim);font-size:13px;">Descanso + Meal Prep 👨‍🍳</p>'}
        </div>
      </div><div class="day-duration">${d.duration}</div></div>`;
  }).join('');
  grid.querySelectorAll('.day-card').forEach(c => {
    c.addEventListener('click', () => {
      const was = c.classList.contains('expanded');
      grid.querySelectorAll('.day-card').forEach(x => x.classList.remove('expanded'));
      if (!was) c.classList.add('expanded');
    });
  });
}

// ===== SCHEDULE =====
function renderSchedule() {
  const section = document.getElementById('schedule');
  section.innerHTML = `
    <h2 class="section-title">📅 Agenda Diária (Seg–Sex)</h2>
    <p class="section-sub">Sua rotina completa do despertar ao sono.</p>
    <div class="timeline">${SCHEDULE.map(s =>
      `<div class="timeline-item ${s.highlight ? 'highlight' : ''}">
        <div class="timeline-time">${s.time}</div>
        <div class="timeline-title">${s.title}</div>
        ${s.desc ? `<div class="timeline-desc">${s.desc}</div>` : ''}
      </div>`
    ).join('')}</div>`;
}

// ===== INIT =====
renderMeals();
renderTraining();
renderSchedule();
updateHeaderMacros();

// ===== SUPABASE AUTH + SYNC =====
function showSync() {
  const el = document.getElementById('sync-status');
  if (!el) return;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

function updateAuthUI(user) {
  const indicator = document.getElementById('auth-indicator');
  const modal     = document.getElementById('auth-modal');
  if (!indicator || !modal) return;

  if (user) {
    indicator.textContent = '✓ ' + user.email;
    indicator.className = 'online';
    modal.classList.remove('visible');
  } else {
    indicator.textContent = '⬤ offline';
    indicator.className = '';
    modal.classList.add('visible');
  }
}

// Wire up auth modal buttons
document.getElementById('auth-login-btn')?.addEventListener('click', async () => {
  const email = document.getElementById('auth-email').value.trim();
  const pass  = document.getElementById('auth-password').value;
  const errEl = document.getElementById('auth-error');
  errEl.textContent = '';
  try {
    await DB.signIn(email, pass);
  } catch (e) {
    errEl.textContent = e.message;
  }
});

document.getElementById('auth-signup-btn')?.addEventListener('click', async () => {
  const email = document.getElementById('auth-email').value.trim();
  const pass  = document.getElementById('auth-password').value;
  const errEl = document.getElementById('auth-error');
  errEl.textContent = '';
  try {
    await DB.signUp(email, pass);
    errEl.style.color = '#34d399';
    errEl.textContent = 'Conta criada! Verifique seu e-mail para confirmar.';
  } catch (e) {
    errEl.style.color = '#f87171';
    errEl.textContent = e.message;
  }
});

document.getElementById('auth-indicator')?.addEventListener('click', async () => {
  const user = await DB.getUser();
  if (user && confirm('Sair da conta?')) {
    await DB.signOut();
    updateAuthUI(null);
  }
});

// Init: escuta mudanças de auth e carrega plano do banco ao logar
if (window.DB) {
  DB.init(async (user) => {
    updateAuthUI(user);
    if (!user) return;

    // Carrega plano salvo no banco e mescla com o state atual
    const rows = await DB.loadPlan();
    if (!rows || rows.length === 0) {
      // Nenhum dado no banco ainda — sobe o estado atual do localStorage
      DB.syncPlan(state.plan);
      return;
    }

    let changed = false;
    rows.forEach(row => {
      const mi = row.month_idx ?? 5;
      if (state.plan[mi]?.[row.week_idx]?.[row.day_idx] !== undefined) {
        if (state.plan[mi][row.week_idx][row.day_idx][row.meal_id] !== row.option_idx) {
          state.plan[mi][row.week_idx][row.day_idx][row.meal_id] = row.option_idx;
          changed = true;
        }
      }
    });

    if (changed) {
      localStorage.setItem('rotinaState', JSON.stringify(state));
      renderMeals();
      updateHeaderMacros();
    }
  });
}
