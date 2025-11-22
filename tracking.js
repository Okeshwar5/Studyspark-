import { supabase } from "../supabaseClient";

export async function getTracking(userId) {
  const { data, error } = await supabase
    .from("tracking")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
}

export async function updateTracking(userId, newMinutes) {
  const { data } = await supabase
    .from("tracking")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) {
    return await supabase.from("tracking").insert({
      user_id: userId,
      focus_minutes: newMinutes,
      streak: 1,
    });
  }

  return await supabase
    .from("tracking")
    .update({
      focus_minutes: data.focus_minutes + newMinutes,
      streak: data.streak + 1,
    })
    .eq("user_id", userId);
}
