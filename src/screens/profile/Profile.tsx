import { supabase } from "@/lib/supabase";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuth, setSession, signIn, signOut, clearError } from "@/slices/auth";
import { Apple, GoogleIcon } from "@/components/icons";
import Toast from "react-native-toast-message";

export function Profile() {
  const dispatch = useAppDispatch();
  const { session, isLoading, error } = useAppSelector(selectAuth);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => dispatch(setSession(session)));
    supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setSession(session));
    });
  }, [dispatch]);

  const showToast = useCallback(
    (errorMessage: string) =>
      Toast.show({
        type: "error",
        text1: "Fel",
        text2: errorMessage,
        onHide: () => dispatch(clearError()),
      }),
    [dispatch],
  );

  useEffect(() => {
    if (error) showToast(error);
  }, [error, showToast]);

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#155196" />
      </View>
    );

  const handleGoogleSignIn = () => dispatch(signIn("google"));
  const handleAppleSignIn = () => dispatch(signIn("apple"));
  const handleSignOut = () => dispatch(signOut());

  return (
    <>
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
            <Button
              onPress={handleGoogleSignIn}
              title="Logga in med Google"
              icon={<GoogleIcon />}
            />
          </>
        }
      </View>
      <Toast position="bottom" />
    </>
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
