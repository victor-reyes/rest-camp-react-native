import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { EmailAuth } from "./EmailAuth";
import { GoogleAuth } from "./GoogleAuth";
import { Button } from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { AppleAuth } from "./AppleAuth";

export function Profile() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_, session) => setSession(session));
  }, []);

  const handleSignOut = async () => await supabase.auth.signOut();

  return (
    <View style={styles.container}>
      {session ?
        <>
          <Text>Inloggad som {session.user.email}</Text>
          <Button
            title="Logga ut"
            onPress={handleSignOut}
            icon={<Feather name="log-out" size={24} />}
          />
        </>
      : <>
          <Text>Logga in för att fortsätta</Text>
          <AppleAuth />
          <EmailAuth />
          <GoogleAuth />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 8,
    padding: 16,
  },
});
