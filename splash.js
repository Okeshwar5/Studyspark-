import { View, Text } from 'react-native';

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0A0A0F',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 40,
          color: '#3A6DFF',
          fontWeight: 'bold',
        }}
      >
        StudySpark
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: '#FF4FB6',
          marginTop: 10,
        }}
      >
        Focus. Learn. Grow.
      </Text>
    </View>
  );
}