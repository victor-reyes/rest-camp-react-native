import { Avatar } from "@/components";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PROFILES } from "./fake-reviews";

interface Props {
  id: string;
}

export function UserInfo({ id }: Props) {
  const user = PROFILES.find(profile => profile.id === id);
  if (!user) return <ActivityIndicator size="small" color="#0000ff" />;

  const { fullName, avatarUrl } = user;

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
