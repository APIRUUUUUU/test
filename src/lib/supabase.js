import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn('⚠️ Supabaseの環境変数が設定されていません (.env を確認)');
}

export const supabase = createClient(url, anonKey);
