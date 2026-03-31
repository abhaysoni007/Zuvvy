import { hasSupabaseConfig, supabase } from './supabase';

const LOCAL_STORAGE_KEY = 'zuvvy-survey-responses';

export async function saveSurveyResponse(payload) {
  if (!hasSupabaseConfig || !supabase) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.push(payload);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    return { ok: true, mode: 'local' };
  }

  const { error } = await supabase.from('zuvvy_survey').insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  return { ok: true, mode: 'supabase' };
}
