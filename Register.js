import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0F', padding: 25, justifyContent: 'center' }}>
      <Text style={{ color: '#EAEAEA', fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>
        Create Account
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
        onPress={handleRegister}
        style={{
          backgroundColor: '#FF4FB6',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
          {loading ? "Creating..." : "Register"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: 'center', color: '#3A6DFF' }}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
          }
