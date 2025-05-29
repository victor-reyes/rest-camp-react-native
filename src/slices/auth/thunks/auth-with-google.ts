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
        return rejectWithValue("User canceled the Google sign-in flow.");
      }
      if (!data.idToken) {
        console.error("No ID token found after Google sign-in.");
        return rejectWithValue("No ID token found after Google sign-in.");
      }
      const { idToken: token } = data;
      const { error } = await supabase.auth.signInWithIdToken({ token, provider: "google" });
      if (error) {
        console.error(`Error signing in with Google: ${error.message}`);
        return rejectWithValue(`Error signing in with Google: ${error.message}`);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.warn("You've canceled the Google sign-in flow.");
            return rejectWithValue("You've canceled the sign-in flow.");
          case statusCodes.IN_PROGRESS:
            console.warn("You're already signing in with Google.");
            return rejectWithValue("You're already signing in with Google.");
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error("Google Play services are not available.");
            return rejectWithValue("Google Play services are not available.");
          case statusCodes.SIGN_IN_REQUIRED:
            console.error("Google sign-in is required.");
            return rejectWithValue("Google sign-in is required.");
          default:
            console.error(`Unknown error during sign-in: ${error.message}`);
            return rejectWithValue(`Unknown error during sign-in: ${error.message}`);
        }
      }
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(`Error signing in: ${errorMessage}`);
    }
  },
);
