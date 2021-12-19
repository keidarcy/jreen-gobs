import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_DB_URL as string;
const supabaseAnonKey = import.meta.env.VITE_DB_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
