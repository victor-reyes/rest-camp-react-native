import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { GoogleIcon } from "@/components/icons/Google";
import { Apple } from "@/components/icons/Apple";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { authWithGoogle, authWithApple, selectAuth, setSession, signOut } from "@/slices/auth";

export function Profile() {
  const dispatch = useAppDispatch();
  const { session, isLoading, error } = useAppSelector(selectAuth);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => dispatch(setSession(session)));
    supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setSession(session));
    });
  }, [dispatch]);

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#155196" />
      </View>
    );

  const handleGoogleSignIn = () => dispatch(authWithGoogle());
  const handleAppleSignIn = () => dispatch(authWithApple());
  const handleSignOut = () => dispatch(signOut());

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
          {Platform.OS === "ios" && (
            <Button onPress={handleAppleSignIn} title="Logga in med Apple" icon={<Apple />} />
          )}
          <Button onPress={handleGoogleSignIn} title="Logga in med Google" icon={<GoogleIcon />} />
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
