import { Image, ImageSource } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  avatarUrl?: string | null;
  size?: number;
  placeholder?: ImageSource | string | number;
}

const BLURHASH = { blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" };

export function Avatar({ avatarUrl, size = 40, placeholder = BLURHASH }: Props) {
  const style = { width: size, height: size, borderRadius: size / 2 };
  return avatarUrl ?
      <Image source={{ uri: avatarUrl }} style={style} placeholder={placeholder} />
    : <FontAwesome name="user-circle-o" size={size} color="#aaa" style={style} />;
}
