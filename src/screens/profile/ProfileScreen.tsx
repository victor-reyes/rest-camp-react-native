import { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuth, clearError } from "@/slices/auth";
import Toast from "react-native-toast-message";
import { AuthenticationError } from "@/slices/auth/types";
import { SignedIn, SignedOut } from "./components";

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { session, isLoading, error } = useAppSelector(selectAuth);

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

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {isLoading ?
          <ActivityIndicator size="large" color="#155196" />
        : session ?
          <SignedIn userId={session.user.id} email={session.user.email} />
        : <SignedOut />}
      </View>
      <Toast position="bottom" />
    </View>
  );
}

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
