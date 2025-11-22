import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else navigation.replace('MainTabs');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 25, justifyContent: 'center' }}>
      <Text style={{ color: '#EAEAEA', fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>
        StudySpark
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: '#1A1A1F',
          color: 'white',
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: '#1A1A1F',
          color: 'white',
          padding: 15,
          borderRadius: 10,
        }}
      />

      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#3A6DFF',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: 'center', color: '#FF4FB6' }}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
          }
