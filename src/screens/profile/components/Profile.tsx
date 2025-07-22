import { useAppDispatch } from "@/app/store";
import { Button } from "@/components";
import { signOut } from "@/features/auth";
import { Image } from "expo-image";
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
        {profile?.avatarUrl ?
          <Image
            source={{ uri: profile.avatarUrl }}
            style={styles.avatar}
            placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
            contentFit="cover"
            transition={500}
          />
        : <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : "?"}
            </Text>
          </View>
        }

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
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    backgroundColor: "#e1e5e9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#666",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
