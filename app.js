// Rotina v2 — painel. Lê o Supabase com o login do usuário (RLS).
// A chave publishable é pública por design; a service role nunca vem pro front.

const SUPABASE_URL = 'https://nkpcemmigrwcfsapsbvf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EdMJ5oQoHv7pRkHaG9GyAw_s3d9gb8X';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const $ = (id) => document.getElementById(id);
const state = { user: null, range: 90, data: null };
const charts = {};

// ── datas (strings YYYY-MM-DD no fuso do navegador) ─────────
const pad = (n) => String(n).padStart(2, '0');
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDay = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseDay(s); d.setDate(d.getDate() + n); return isoDay(d); };
const today = () => isoDay(new Date());
const weekStart = (s) => { const d = parseDay(s); const dow = (d.getDay() + 6) % 7; d.setDate(d.getDate() - dow); return isoDay(d); };
const shortDay = (s) => { const [, m, d] = s.split('-'); return `${d}/${m}`; };
const daysBetween = (from, to) => { const out = []; for (let s = from; s <= to; s = addDays(s, 1)) out.push(s); return out; };

const fmt = (v, digits = 1) => {
  if (v == null || Number.isNaN(v)) return '—';
  const r = Number(v.toFixed(digits)) || 0; // evita "-0"
  return r.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
};
const fmtSleep = (min) => (min == null ? '—' : `${Math.floor(min / 60)}h${pad(Math.round(min % 60))}`);
const avg = (xs) => { const v = xs.filter((x) => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Média móvel de 7 dias sobre os dias com valor (ignora dias sem medição).
function movingAvg(days, byDay, field) {
  return days.map((d) => avg(daysBetween(addDays(d, -6), d).map((x) => byDay[x]?.[field] ?? null)));
}

// ── auth ────────────────────────────────────────────────────
async function init() {
  const { data } = await sb.auth.getSession();
  sb.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
  setUser(data.session?.user ?? null);
}

function setUser(user) {
  const changed = (user?.id ?? null) !== (state.user?.id ?? null);
  state.user = user;
  $('login').hidden = !!user;
  $('app').hidden = !user;
  if (user && changed) {
    $('f-week').value = weekStart(today());
    load();
  }
}

$('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('login-error').textContent = '';
  const { error } = await sb.auth.signInWithPassword({ email: $('login-email').value.trim(), password: $('login-pass').value });
  if (error) $('login-error').textContent = error.message;
});
$('logout').addEventListener('click', () => sb.auth.signOut());

document.querySelectorAll('[data-range]').forEach((b) => b.addEventListener('click', () => {
  state.range = Number(b.dataset.range);
  document.querySelectorAll('[data-range]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  load();
}));

// ── dados ───────────────────────────────────────────────────
async function load() {
  $('status').textContent = 'Carregando…';
  const to = today();
  const from = addDays(to, -(state.range - 1));
  // Margem de 6 dias para a média móvel começar completa e 12 semanas para treinos.
  const metricsFrom = addDays(from, -6);
  const workoutsFrom = addDays(weekStart(to), -7 * 11);
  const since = from < workoutsFrom ? from : workoutsFrom;

  const [metrics, workouts, measurements, report] = await Promise.all([
    sb.from('daily_metrics').select('*').gte('day', metricsFrom).order('day'),
    sb.from('workouts').select('*').gte('started_at', parseDay(since).toISOString()).order('started_at', { ascending: false }),
    sb.from('measurements').select('*').order('measured_on'),
    sb.from('weekly_reports').select('*').order('week_start', { ascending: false }).limit(1),
  ]);
  const err = [metrics, workouts, measurements, report].find((r) => r.error);
  if (err) { $('status').textContent = `Erro ao carregar: ${err.error.message}`; return; }

  state.data = { from, to, metrics: metrics.data, workouts: workouts.data, measurements: measurements.data, report: report.data[0] };
  const last = metrics.data.at(-1);
  $('status').textContent = last ? `Último dado do relógio: ${shortDay(last.day)}` : 'Ainda sem dados do relógio. Eles aparecem aqui depois da próxima sincronização.';
  render();
  loadPhotos();
  loadNote();
}

// ── render ──────────────────────────────────────────────────
function render() {
  if (!state.data) return;
  const { from, to, metrics, workouts, measurements, report } = state.data;
  const byDay = Object.fromEntries(metrics.map((m) => [m.day, m]));
  const days = daysBetween(from, to);
  const last7 = daysBetween(addDays(to, -6), to);
  const prev7 = daysBetween(addDays(to, -13), addDays(to, -7));
  const mean = (range, f) => avg(range.map((d) => (byDay[d]?.[f] != null ? Number(byDay[d][f]) : null)));

  // Treinos por semana (12 semanas)
  const thisWeek = weekStart(to);
  const weeks = Array.from({ length: 12 }, (_, i) => addDays(thisWeek, -7 * (11 - i)));
  const perWeek = Object.fromEntries(weeks.map((w) => [w, 0]));
  for (const w of workouts) {
    const ws = weekStart(isoDay(new Date(w.started_at)));
    if (ws in perWeek) perWeek[ws] += 1;
  }
  const avg4 = avg(weeks.slice(-5, -1).map((w) => perWeek[w]));

  // KPIs
  const kpis = [
    { label: 'Treinos nesta semana', value: String(perWeek[thisWeek]), delta: `média das 4 anteriores: ${fmt(avg4)}` },
    kpiDelta('Peso · média 7d', mean(last7, 'weight_kg'), mean(prev7, 'weight_kg'), ' kg', 1),
    kpiDelta('% gordura · média 7d', mean(last7, 'body_fat_pct'), mean(prev7, 'body_fat_pct'), ' pp', 1),
    kpiDelta('Passos · média 7d', mean(last7, 'steps'), mean(prev7, 'steps'), '', 0),
    { label: 'Sono · média 7d', value: fmtSleep(mean(last7, 'sleep_min')), delta: `semana anterior: ${fmtSleep(mean(prev7, 'sleep_min'))}` },
    kpiDelta('FC repouso · média 7d', mean(last7, 'resting_hr'), mean(prev7, 'resting_hr'), ' bpm', 0),
  ];
  $('kpis').innerHTML = kpis.map((k) => `
    <div class="card kpi"><div class="label">${esc(k.label)}</div>
    <div class="value">${esc(k.value)}</div><div class="delta">${esc(k.delta)}</div></div>`).join('');

  const labels = days.map(shortDay);
  const series = (f) => days.map((d) => (byDay[d]?.[f] != null ? Number(byDay[d][f]) : null));
  const has = (f) => days.some((d) => byDay[d]?.[f] != null);

  bar('c-workouts', weeks.map((w) => `sem ${shortDay(w)}`), weeks.map((w) => perWeek[w]), 'treinos', true);
  maChart('c-weight', labels, series('weight_kg'), movingAvg(days, byDay, 'weight_kg'), 'kg', has('weight_kg'));
  maChart('c-fat', labels, series('body_fat_pct'), movingAvg(days, byDay, 'body_fat_pct'), '%', has('body_fat_pct'));
  bar('c-steps', labels, series('steps'), 'passos', has('steps'));
  bar('c-sleep', labels, series('sleep_min').map((m) => (m == null ? null : Math.round((m / 60) * 10) / 10)), 'h', has('sleep_min'));
  line('c-rhr', labels, series('resting_hr'), 'bpm', has('resting_hr'));

  const waist = measurements.filter((m) => m.waist_cm != null);
  line('c-waist', waist.map((m) => shortDay(m.measured_on)), waist.map((m) => Number(m.waist_cm)), 'cm', waist.length > 0, 'Registre a cintura no formulário semanal.');

  // Bioimpedância: cada fonte é uma série própria (nunca misturar no mesmo cálculo).
  const gym = measurements.filter((m) => m.source === 'academia' && m.body_fat_pct != null);
  line('c-bio', gym.map((m) => shortDay(m.measured_on)), gym.map((m) => Number(m.body_fat_pct)), '% gordura (academia)', gym.length > 0,
    'Sem medições da academia ainda. Registre no formulário semanal.');

  renderReport(report);
  $('workout-list').innerHTML = workouts.slice(0, 8).map((w) => {
    const d = new Date(w.started_at);
    const meta = [w.duration_min != null && `${w.duration_min} min`, w.avg_hr != null && `${w.avg_hr} bpm`, w.kcal != null && `${w.kcal} kcal`].filter(Boolean).join(' · ');
    return `<li><span>${esc(w.type)}<br><span class="muted">${d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</span></span><span class="meta">${esc(meta)}</span></li>`;
  }).join('') || '<li class="muted">Nenhum treino registrado ainda.</li>';
}

function kpiDelta(label, cur, prev, unit, digits) {
  const delta = cur != null && prev != null ? cur - prev : null;
  const sign = delta != null && Number(delta.toFixed(digits)) > 0 ? '+' : '';
  return {
    label,
    value: fmt(cur, digits),
    delta: delta == null ? 'sem semana anterior' : `${sign}${fmt(delta, digits)}${unit} vs semana anterior`,
  };
}

function renderReport(report) {
  const el = $('report');
  if (!report) {
    el.innerHTML = '<span class="muted">O primeiro resumo é gerado na segunda-feira de manhã, com os dados da semana anterior.</span>';
    return;
  }
  el.innerHTML = `<span class="when">Semana de ${shortDay(report.week_start)}</span>${esc(report.summary)}`;
}

// ── gráficos (Chart.js) ─────────────────────────────────────
function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

function baseOptions(unit) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => (ctx.parsed.y == null ? null : `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pt-BR')} ${unit}`),
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: css('--text-2'), maxRotation: 0, autoSkipPadding: 12 }, border: { color: css('--grid') } },
      y: { grid: { color: css('--grid') }, ticks: { color: css('--text-2') }, border: { display: false } },
    },
  };
}

function mount(id, config, hasData, emptyMsg) {
  charts[id]?.destroy();
  delete charts[id];
  const canvas = $(id);
  const box = canvas.parentElement;
  box.querySelector('.empty')?.remove();
  canvas.hidden = !hasData;
  if (!hasData) {
    const div = document.createElement('div');
    div.className = 'empty';
    div.textContent = emptyMsg || 'Sem dados neste período.';
    box.appendChild(div);
    return;
  }
  charts[id] = new Chart(canvas, config);
}

function bar(id, labels, data, unit, hasData, emptyMsg) {
  mount(id, {
    type: 'bar',
    data: { labels, datasets: [{ label: unit, data, backgroundColor: css('--series-1'), borderRadius: 4, maxBarThickness: 28 }] },
    options: { ...baseOptions(unit), scales: { ...baseOptions(unit).scales, y: { ...baseOptions(unit).scales.y, beginAtZero: true, ticks: { color: css('--text-2'), precision: 0 } } } },
  }, hasData, emptyMsg);
}

function line(id, labels, data, unit, hasData, emptyMsg) {
  mount(id, {
    type: 'line',
    data: { labels, datasets: [{ label: unit, data, borderColor: css('--series-1'), backgroundColor: css('--series-1'), borderWidth: 2, pointRadius: 3, spanGaps: true, tension: 0.25 }] },
    options: baseOptions(unit),
  }, hasData, emptyMsg);
}

function maChart(id, labels, daily, ma, unit, hasData) {
  mount(id, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'média 7d', data: ma.map((v) => (v == null ? null : Math.round(v * 10) / 10)), borderColor: css('--series-1'), borderWidth: 2, pointRadius: 0, spanGaps: true, tension: 0.3 },
        { label: 'dia', data: daily, showLine: false, pointRadius: 3, pointBackgroundColor: css('--series-1-soft'), pointBorderWidth: 0 },
      ],
    },
    options: baseOptions(unit),
  }, hasData);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);

// ── formulário semanal ──────────────────────────────────────
const num = (id) => { const v = $(id).value; return v === '' ? null : Number(v); };

async function loadNote() {
  const week = $('f-week').value;
  if (!week) return;
  const { data } = await sb.from('weekly_notes').select('note').eq('week_start', week).maybeSingle();
  $('f-note').value = data?.note ?? '';
}
$('f-week').addEventListener('change', () => {
  $('f-week').value = weekStart($('f-week').value || today());
  loadNote();
});

$('weekly-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = $('form-msg');
  const uid = state.user.id;
  const week = weekStart($('f-week').value);
  // Medida feita nesta semana fica com a data de hoje; semana passada, com a segunda.
  const measuredOn = week === weekStart(today()) ? today() : week;
  const done = [];
  msg.textContent = 'Salvando…';

  try {
    const note = $('f-note').value.trim();
    if (note) {
      const { error } = await sb.from('weekly_notes').upsert({ user_id: uid, week_start: week, note }, { onConflict: 'user_id,week_start' });
      if (error) throw error;
      done.push('nota');
    }

    const waist = num('f-waist');
    if (waist != null) {
      const { error } = await sb.from('measurements').insert({ user_id: uid, measured_on: measuredOn, source: 'relogio', waist_cm: waist });
      if (error) throw error;
      done.push('cintura');
    }

    const gym = { body_fat_pct: num('f-gym-fat'), muscle_mass_kg: num('f-gym-muscle'), weight_kg: num('f-gym-weight') };
    if (Object.values(gym).some((v) => v != null)) {
      const { error } = await sb.from('measurements').insert({ user_id: uid, measured_on: measuredOn, source: 'academia', ...gym });
      if (error) throw error;
      done.push('academia');
    }

    const file = $('f-photo').files[0];
    if (file) {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const { error } = await sb.storage.from('photos').upload(`${uid}/${measuredOn}-${Date.now()}.${ext}`, file, { contentType: file.type });
      if (error) throw error;
      done.push('foto');
    }

    msg.textContent = done.length ? `Salvo: ${done.join(', ')}.` : 'Nada para salvar.';
    ['f-waist', 'f-gym-fat', 'f-gym-muscle', 'f-gym-weight', 'f-photo'].forEach((id) => { $(id).value = ''; });
    if (done.length) load();
  } catch (err) {
    msg.textContent = `Erro: ${err.message}${done.length ? ` (já salvo: ${done.join(', ')})` : ''}`;
  }
});

// ── fotos (bucket privado, URLs assinadas de 1h) ────────────
async function loadPhotos() {
  const el = $('photos');
  const uid = state.user.id;
  const { data: files, error } = await sb.storage.from('photos').list(uid, { limit: 100, sortBy: { column: 'name', order: 'desc' } });
  if (error || !files?.length) {
    el.innerHTML = '<p class="muted">Nenhuma foto ainda. Envie uma por mês pelo formulário.</p>';
    return;
  }
  const paths = files.filter((f) => f.id).slice(0, 12).map((f) => `${uid}/${f.name}`);
  const { data: urls } = await sb.storage.from('photos').createSignedUrls(paths, 3600);
  el.innerHTML = (urls || []).filter((u) => u.signedUrl).map((u) => {
    const day = u.path.split('/')[1].slice(0, 10);
    return `<figure><img src="${esc(u.signedUrl)}" alt="Foto de ${esc(day)}" loading="lazy"><figcaption>${esc(shortDay(day))}</figcaption></figure>`;
  }).join('');
}

init();
