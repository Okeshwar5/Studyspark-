import { supabase } from "../supabaseClient";

export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };
  return { error: null };
}

export async function register(email, password) {
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: error.message };
  return { error: null };
}

export async function logout() {
  await supabase.auth.signOut();
}
