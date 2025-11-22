import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '../supabaseClient';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const loadNotes = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id);

    setNotes(data || []);
  };

  const uploadPDF = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const pick = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

    if (pick.canceled) return;

    const file = pick.assets[0];

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const res = await fetch(file.uri);
    const blob = await res.blob();

    let { error: uploadError } = await supabase.storage
      .from('notes')
      .upload(filePath, blob);

    if (uploadError) {
      console.log(uploadError);
      return;
    }

    const { data: urlData } = supabase.storage.from('notes').getPublicUrl(filePath);

    await supabase.from('notes').insert({
      user_id: user.id,
      title: file.name,
      file_url: urlData.publicUrl,
    });

    loadNotes();
  };

  const saveTextNote = async () => {
    if (!newTitle.trim()) return;

    const user = (await supabase.auth.getUser()).data.user;

    await supabase.from('notes').insert({
      user_id: user.id,
      title: newTitle,
      file_url: null,
    });

    setNewTitle('');
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 25 }}>
      <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Notes</Text>

      <TouchableOpacity
        onPress={uploadPDF}
        style={{
          backgroundColor: '#3A6DFF',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Upload PDF</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Write a text note..."
        placeholderTextColor="#777"
        value={newTitle}
        onChangeText={setNewTitle}
        style={{
          backgroundColor: '#1A1A1F',
          padding: 15,
          color: 'white',
          borderRadius: 10,
          marginTop: 20,
        }}
      />

      <TouchableOpacity
        onPress={saveTextNote}
        style={{
          backgroundColor: '#FF4FB6',
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Save Text Note</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 25 }}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: '#1A1A1F',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text style={{ color: 'white', fontSize: 18 }}>{item.title}</Text>

            {item.file_url ? (
              <Text style={{ color: '#3A6DFF', marginTop: 5 }}>PDF File</Text>
            ) : (
              <Text style={{ color: '#FF4FB6', marginTop: 5 }}>Text Note</Text>
            )}
          </View>
        )}
      />
    </View>
  );
  }
