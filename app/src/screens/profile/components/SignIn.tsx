import { useAppDispatch, useAppSelector } from "@/store";
import { Apple, Button, GoogleIcon, Toast } from "@/components";
import {
  AuthenticationError,
  errorCleared,
  selectError,
  selectIsLoading,
  signIn,
} from "@/features/auth";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";

export function SignIn() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

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

  const handleGoogleSignIn = () => dispatch(signIn("google"));
  const handleAppleSignIn = () => dispatch(signIn("apple"));

  return (
    <View style={styles.container}>
      {isLoading ?
        <ActivityIndicator size="large" color="#155196" />
      : <>
          <Text style={styles.text}>Logga in för att fortsätta</Text>
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
    padding: 16,
    alignSelf: "stretch",
    alignItems: "center",
    gap: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});

const ErrorToast = ({ error, onHide }: { error: AuthenticationError; onHide: () => void }) => {
  return {
    type: "error",
    text1: "Fel",
    text2: getErrorMessage(error),
    onHide,
  };
};

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
