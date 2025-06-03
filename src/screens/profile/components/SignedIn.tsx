import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/slices/auth";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  userId: string;
  email?: string;
}
export function SignedIn({ userId, email }: Props) {
  const [name, setName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const handleSignOut = () => dispatch(signOut());

  const getProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`full_name, avatar_url`)
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setName(data.full_name);
        setAvatarUrl(data.avatar_url);
        console.log("Profile data:", data);
        console.log("Avatar URL:", data.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, []);

  useEffect(() => {
    getProfile(userId);
  }, [getProfile, userId]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {avatarUrl ?
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
            placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
            contentFit="cover"
            transition={500}
          />
        : <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : "?"}</Text>
          </View>
        }

        <View>
          <Text style={styles.name}>{name}</Text>
          {email && <Text style={styles.email}>Inloggad som {email}</Text>}
        </View>
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
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "stretch",
    gap: 16,
  },
  userContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
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
  email: {
    fontSize: 8,
    fontWeight: "400",
    color: "#666",
  },
});
