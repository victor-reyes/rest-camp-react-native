import { useAppDispatch } from "@/app/store";
import { Avatar, Button } from "@/components";
import { signOut } from "@/features/auth";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useFetchProfileQuery } from "@/features/profiles";

interface Props {
  userId: string;
}
export function Profile({ userId }: Props) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => dispatch(signOut());

  const { data: profile, isLoading, isError } = useFetchProfileQuery(userId);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (isError) return <Text>Något gick fel. Försök igen.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Avatar avatarUrl={profile?.avatarUrl} size={32} />
        <Text style={styles.name}>{profile?.fullName}</Text>
      </View>
      <Button
        title="Logga ut"
        onPress={handleSignOut}
        icon={<Feather name="log-out" size={24} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center",
  },
  userContainer: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
