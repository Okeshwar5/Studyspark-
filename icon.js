import { Image } from 'expo-image';

export default function AppIcon() {
  return (
    <Image
      source={{
        uri: 'data:image/svg+xml;utf8,<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#0A0A0F"/><text x="50%" y="50%" font-size="260" fill="#3A6DFF" font-family="Arial" dy=".35em" text-anchor="middle">S</text></svg>'
      }}
      style={{ width: 512, height: 512 }}
    />
  );
}