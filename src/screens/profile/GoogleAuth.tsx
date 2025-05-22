import { GoogleIcon } from "@/components/icons/Google";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export function GoogleAuth() {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const idToken = (await GoogleSignin.signIn()).data?.idToken;
      if (idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: idToken,
        });

        if (error) console.error(`Error signing in with Google: ${error.message}`);
        else console.log(`User signed in with Google: ${JSON.stringify(data)}`);
      } else throw new Error("no ID token present!");
    } catch (error: any) {
      console.error(`Error signing in with Google: ${error.message}`);
    }
  };

  return <Button onPress={handleGoogleSignIn} title="Logga in med Google" icon={<GoogleIcon />} />;
}
