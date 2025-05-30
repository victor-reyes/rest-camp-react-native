import { supabase } from "@/lib/supabase";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuth, setSession, signIn, signOut, clearError } from "@/slices/auth";
import { Apple, GoogleIcon } from "@/components/icons";
import Toast from "react-native-toast-message";
import { AuthenticationError } from "@/slices/auth/types";

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
    (errorMessage: AuthenticationError) =>
      Toast.show({
        type: "error",
        text1: "Fel",
        text2: getErrorMessage(errorMessage),
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

const getErrorMessage = (error: AuthenticationError) => {
  switch (error.code) {
    case "SIGN_IN_CANCELLED":
      return "Inloggningen avbröts.";
    case "SIGN_IN_FAILED":
      return "Inloggningen misslyckades. Försök igen.";
    case "SIGN_IN_IN_PROGRESS":
      return "En inloggning pågår redan.";
    case "PLAY_SERVICES_NOT_AVAILABLE":
      return "Google Play-tjänster är inte tillgängliga.";
    case "SIGN_IN_REQUIRED":
      return "Inloggning krävs för att fortsätta.";
    default:
      return "Ett okänt fel inträffade. Försök igen senare.";
  }
};
