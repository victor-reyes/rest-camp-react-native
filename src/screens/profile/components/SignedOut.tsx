import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/Button";
import { Apple, GoogleIcon } from "@/components/icons";
import { signIn } from "@/slices/auth";
import { Platform, StyleSheet, Text, View } from "react-native";

export function SignedOut() {
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = () => dispatch(signIn("google"));
  const handleAppleSignIn = () => dispatch(signIn("apple"));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logga in för att fortsätta</Text>
      {Platform.OS === "ios" && (
        <Button onPress={handleAppleSignIn} title="Logga in med Apple" icon={<Apple />} />
      )}
      <Button onPress={handleGoogleSignIn} title="Logga in med Google" icon={<GoogleIcon />} />
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
  text: {
    textAlign: "center",
  },
});
