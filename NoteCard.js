import React from 'react';
import { View, Text } from 'react-native';

export default function NoteCard({ title, isPdf }) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#1A1A1F',
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>

      <Text
        style={{
          color: isPdf ? '#3A6DFF' : '#FF4FB6',
          marginTop: 5,
        }}
      >
        {isPdf ? '📄 PDF File' : '📝 Text Note'}
      </Text>
    </View>
  );
}
