import { supabase } from "../supabaseClient";

export async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  return { data, error };
}

export async function sendMessage(userId, text) {
  const { error } = await supabase.from("messages").insert({
    user_id: userId,
    message: text,
  });

  return { error };
}

export function subscribeToMessages(callback) {
  const channel = supabase
    .channel("messages-room")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return channel;
}
