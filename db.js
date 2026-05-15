// ===== SUPABASE CLIENT =====
// Depende do CDN do Supabase carregado antes deste script no index.html

const SUPABASE_URL  = 'https://nkpcemmigrwcfsapsbvf.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_EdMJ5oQoHv7pRkHaG9GyAw_s3d9gb8X';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let _syncTimer = null;

const DB = {

  // ── AUTH ──────────────────────────────────────────────────────────────
  async signIn(email, password) {
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },

  async signUp(email, password) {
    const { data, error } = await _sb.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  },

  async signOut() {
    await _sb.auth.signOut();
  },

  async getUser() {
    const { data: { user } } = await _sb.auth.getUser();
    return user;
  },

  // Chama onUserChange quando o estado de auth muda (login/logout)
  // e também imediatamente se já existe sessão ativa.
  init(onUserChange) {
    _sb.auth.onAuthStateChange((event, session) => {
      onUserChange(session?.user || null);
    });
  },

  // ── PLANO DE REFEIÇÕES ────────────────────────────────────────────────
  async loadPlan() {
    const user = await this.getUser();
    if (!user) return null;

    const { data, error } = await _sb
      .from('meal_plan')
      .select('week_idx, day_idx, meal_id, option_idx')
      .eq('user_id', user.id);

    if (error) { console.error('[DB] loadPlan:', error.message); return null; }
    return data;
  },

  async syncPlan(plan) {
    const user = await this.getUser();
    if (!user) return;

    const rows = [];
    Object.entries(plan).forEach(([wi, days]) => {
      Object.entries(days).forEach(([di, meals]) => {
        Object.entries(meals).forEach(([mealId, optIdx]) => {
          rows.push({
            user_id: user.id,
            week_idx: parseInt(wi),
            day_idx: parseInt(di),
            meal_id: parseInt(mealId),
            option_idx: optIdx,
            updated_at: new Date().toISOString()
          });
        });
      });
    });

    const { error } = await _sb
      .from('meal_plan')
      .upsert(rows, { onConflict: 'user_id,week_idx,day_idx,meal_id' });

    if (error) console.error('[DB] syncPlan:', error.message);
    else console.log('[DB] Plano sincronizado ✓');
  },

  // Aguarda 1,5s após a última mudança antes de sincronizar
  debouncedSync(plan) {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(() => this.syncPlan(plan), 1500);
  },

  // ── LOG DE TREINO ─────────────────────────────────────────────────────
  async addTraining({ exercise, sets, reps, weight, notes = '' }) {
    const user = await this.getUser();
    if (!user) throw new Error('Faça login antes de registrar treinos.');

    const { data, error } = await _sb
      .from('training_log')
      .insert({
        user_id: user.id,
        logged_at: new Date().toISOString().split('T')[0],
        exercise_name: exercise,
        sets: sets   || null,
        reps: reps   || null,
        weight_kg: weight || null,
        notes
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async loadTraining(limit = 60) {
    const user = await this.getUser();
    if (!user) return [];

    const { data, error } = await _sb
      .from('training_log')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) { console.error('[DB] loadTraining:', error.message); return []; }
    return data || [];
  },

  async deleteTraining(id) {
    const { error } = await _sb.from('training_log').delete().eq('id', id);
    if (error) throw error;
  },

  // ── HISTÓRICO DE COMPRAS ──────────────────────────────────────────────
  async saveShopping({ period, items, totalMin, totalMax }) {
    const user = await this.getUser();
    if (!user) throw new Error('Faça login antes de salvar compras.');

    const { data, error } = await _sb
      .from('shopping_history')
      .insert({
        user_id: user.id,
        shopped_at: new Date().toISOString().split('T')[0],
        period,
        items,
        total_estimated: Math.round((totalMin + totalMax) / 2)
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async loadShopping(limit = 10) {
    const user = await this.getUser();
    if (!user) return [];

    const { data, error } = await _sb
      .from('shopping_history')
      .select('id, shopped_at, period, total_estimated, items')
      .eq('user_id', user.id)
      .order('shopped_at', { ascending: false })
      .limit(limit);

    if (error) { console.error('[DB] loadShopping:', error.message); return []; }
    return data || [];
  }
};

window.DB = DB;
