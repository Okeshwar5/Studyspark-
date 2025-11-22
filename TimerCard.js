import React from 'react';
import { View, Text } from 'react-native';

export default function TimerCard({ minutes, seconds }) {
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: '#1A1A1F',
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}
