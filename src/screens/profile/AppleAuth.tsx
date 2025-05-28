import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/Button";
import { Apple } from "@/components/icons/Apple";

export function AppleAuth() {
  if (Platform.OS !== "ios") return null;

  const handleAppleSignIn = async () => {
    try {
      const requestedScopes = [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ];
      const { identityToken } = await AppleAuthentication.signInAsync({ requestedScopes });

      if (identityToken) {
        const { error, data } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: identityToken,
        });
        console.log(JSON.stringify({ error, user: data.user }));
      } else throw new Error("No identityToken.");
    } catch (error: any) {
      if (error.code === "ERR_REQUEST_CANCELED")
        console.warn("User canceled the Apple sign-in flow.");
      else console.error(`Error signing in with Apple: ${error.message}`);
    }
  };

  return <Button onPress={handleAppleSignIn} title="Logga in med Apple" icon={<Apple />} />;
}
