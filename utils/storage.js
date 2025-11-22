import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem(key) {
  const data = await AsyncStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}
