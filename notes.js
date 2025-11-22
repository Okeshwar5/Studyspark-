import { supabase } from "../supabaseClient";

export async function getNotes(userId) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
}

export async function saveTextNote(userId, title) {
  const { error } = await supabase.from("notes").insert({
    user_id: userId,
    title,
    file_url: null,
  });

  return { error };
}

export async function savePDFNote(userId, fileName, fileUrl) {
  const { error } = await supabase.from("notes").insert({
    user_id: userId,
    title: fileName,
    file_url: fileUrl,
  });

  return { error };
}
