import React from 'react';
import { View, Text } from 'react-native';

export default function ChatBubble({ text, isSelf }) {
  return (
    <View
      style={{
        backgroundColor: isSelf ? '#3A6DFF' : '#1A1A1F',
        alignSelf: isSelf ? 'flex-end' : 'flex-start',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        maxWidth: '80%',
      }}
    >
      <Text style={{ color: 'white' }}>{text}</Text>
    </View>
  );
}
