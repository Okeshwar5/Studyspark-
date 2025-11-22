import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [stats, setStats] = useState({
    focus_minutes: 0,
    streak: 0,
    notes: 0,
  });

  const loadStats = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data: track } = await supabase
      .from('tracking')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id);

    setStats({
      focus_minutes: track?.focus_minutes || 0,
      streak: track?.streak || 0,
      notes: notes?.length || 0,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 25 }}>
      <Text style={{ color: '#EAEAEA', fontSize: 30, fontWeight: 'bold' }}>Dashboard</Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ color: 'white', fontSize: 20 }}>📘 Notes Saved: {stats.notes}</Text>
        <Text style={{ color: 'white', fontSize: 20 }}>🔥 Study Streak: {stats.streak} days</Text>
        <Text style={{ color: 'white', fontSize: 20 }}>⏳ Focus Time: {stats.focus_minutes} min</Text>
      </View>
    </View>
  );
  }
