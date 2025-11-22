import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';

export default function FocusMode() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const updateTracking = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("tracking")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!data) {
      await supabase.from("tracking").insert({
        user_id: user.id,
        focus_minutes: Math.floor(seconds / 60),
        streak: 1,
      });
    } else {
      await supabase.from("tracking").update({
        focus_minutes: data.focus_minutes + Math.floor(seconds / 60),
        streak: data.streak + 1,
      }).eq("user_id", user.id);
    }
  };

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const stop = () => {
    setRunning(false);
    updateTracking();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0F', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 50, marginBottom: 20 }}>
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
      </Text>

      <TouchableOpacity
        onPress={() => setRunning(!running)}
        style={{
          backgroundColor: running ? '#FF4FB6' : '#3A6DFF',
          padding: 20,
          borderRadius: 15,
        }}>
        <Text style={{ color: 'white', fontSize: 20 }}>
          {running ? 'Stop Focus' : 'Start Focus'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
