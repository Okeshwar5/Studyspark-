import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../supabaseClient';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const loadMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const user = (await supabase.auth.getUser()).data.user;

    await supabase.from('messages').insert({
      user_id: user.id,
      message: text,
    });

    setText('');
  };

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('messages-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 15 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: '#1A1A1F',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10
          }}>
            <Text style={{ color: 'white' }}>{item.message}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TextInput
          placeholder="Type message..."
          placeholderTextColor="#777"
          value={text}
          onChangeText={setText}
          style={{
            flex: 1,
            backgroundColor: '#1A1A1F',
            padding: 12,
            borderRadius: 10,
            color: 'white'
          }}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: '#3A6DFF',
            padding: 15,
            marginLeft: 10,
            borderRadius: 10
          }}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
          }
