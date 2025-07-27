import { Avatar } from "@/components";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useProfile } from "@/features/profiles";

interface Props {
  userId: string;
}

const DEFAULT_VALUES = { fullName: "Anonym", avatarUrl: undefined };

export function UserInfo({ userId }: Props) {
  const { profile, isLoading } = useProfile(userId);
  if (isLoading) return <ActivityIndicator size="small" color="#0000ff" />;
  const { fullName, avatarUrl } = profile ?? DEFAULT_VALUES;

  return (
    <View style={styles.container}>
      <Avatar avatarUrl={avatarUrl} />
      <Text style={styles.name}>{fullName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});
