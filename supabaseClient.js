import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://uzefkwuslmoopexcwvgi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_gfneUrACiMtXvef3tI-0KQ_BMVD_jrw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
