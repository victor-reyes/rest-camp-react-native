import { supabase } from "@/lib/supabase";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuth, setSession, clearError } from "@/slices/auth";
import Toast from "react-native-toast-message";
import { AuthenticationError } from "@/slices/auth/types";
import { SignedIn, SignedOut } from "./components";

export function ProfileScreen() {
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

  return (
    <>
      <View style={styles.container}>
        {session ?
          <SignedIn userId={session.user.id} email={session.user.email} />
        : <SignedOut />}
      </View>
      <Toast position="bottom" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#fff",
    gap: 8,
    padding: 16,
    alignSelf: "stretch",
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
