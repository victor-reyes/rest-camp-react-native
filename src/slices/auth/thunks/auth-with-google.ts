import { supabase } from "@/lib/supabase";
import { GoogleSignin, isErrorWithCode } from "@react-native-google-signin/google-signin";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { statusCodes } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export const authWithGoogle = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/authWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data, type } = await GoogleSignin.signIn();
      if (type === "cancelled") {
        console.warn("User canceled the Google sign-in flow.");
        return rejectWithValue("Du avbröt inloggningen.");
      }
      if (!data.idToken) {
        console.error("No ID token found after Google sign-in.");
        return rejectWithValue("Inga ID-token hittades efter inloggning.");
      }
      const { idToken: token } = data;
      const { error } = await supabase.auth.signInWithIdToken({ token, provider: "google" });
      if (error) {
        console.error(`Error signing in with Google: ${error.message}`);
        return rejectWithValue(`Något gick fel vid inloggning: ${error.message}`);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.warn("You've canceled the Google sign-in flow.");
            return rejectWithValue("Du avbröt inloggningen.");
          case statusCodes.IN_PROGRESS:
            console.warn("You're already signing in with Google.");
            return rejectWithValue("Du är redan inloggad med Google.");
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error("Google Play services are not available.");
            return rejectWithValue("Google Play-tjänster är inte tillgängliga.");
          case statusCodes.SIGN_IN_REQUIRED:
            console.error("Google sign-in is required.");
            return rejectWithValue("Google-inloggning krävs.");
          default:
            console.error(`Unknown error during sign-in: ${error.message}`);
            return rejectWithValue(`Okänt fel vid inloggning: ${error.message}`);
        }
      }
      const errorMessage = error instanceof Error ? error.message : "Okänt fel";
      return rejectWithValue(`Fel vid inloggning: ${errorMessage}`);
    }
  },
);
