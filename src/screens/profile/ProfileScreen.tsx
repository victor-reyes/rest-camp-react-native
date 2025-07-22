import { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuth, errorCleared } from "@/features/auth";
import Toast from "react-native-toast-message";
import { AuthenticationError } from "@/features/auth";
import { Profile, SignIn } from "./components";

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { session, isLoading, error } = useAppSelector(selectAuth);
  const clearError = useCallback(() => dispatch(errorCleared()), [dispatch]);

  const showToast = useCallback(
    (error: AuthenticationError) => Toast.show(ErrorToast({ error, onHide: clearError })),
    [clearError],
  );

  useEffect(() => {
    if (error) showToast(error);
    return () => {
      clearError();
    };
  }, [error, showToast, clearError]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {isLoading ?
          <ActivityIndicator size="large" color="#155196" />
        : session ?
          <Profile userId={session.user.id} email={session.user.email} />
        : <SignIn />}
      </View>
      <Toast position="bottom" />
    </View>
  );
}

const ErrorToast = ({ error, onHide }: { error: AuthenticationError; onHide: () => void }) => {
  return {
    type: "error",
    text1: "Fel",
    text2: getErrorMessage(error),
    onHide,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  cardContainer: {
    minWidth: 320,
    minHeight: 200,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#fff",
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
