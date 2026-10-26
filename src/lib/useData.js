import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';

// Carrega todos os dados do usuário (volume pequeno: 1 pessoa) e filtra no navegador.
export function useData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await Promise.all([
      supabase.from('daily_metrics').select('*').order('day'),
      supabase.from('workouts').select('*').order('started_at', { ascending: false }),
      supabase.from('measurements').select('*').order('measured_on'),
      supabase.from('weekly_reports').select('*').order('week_start', { ascending: false }),
      supabase.from('weekly_notes').select('*').order('week_start', { ascending: false }),
    ]);
    const failed = res.find((r) => r.error);
    if (failed) setError(failed.error.message);
    else {
      setError(null);
      const [metrics, workouts, measurements, reports, notes] = res.map((r) => r.data);
      setData({ metrics, workouts, measurements, reports, notes });
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  return { data, error, loading, reload: load };
}
