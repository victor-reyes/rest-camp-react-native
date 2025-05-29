import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AppleAuthentication from "expo-apple-authentication";

const requestedScopes = [
  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  AppleAuthentication.AppleAuthenticationScope.EMAIL,
];

export const authWithApple = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/authWithApple",
  async (_, { rejectWithValue }) => {
    try {
      const { identityToken: token } = await AppleAuthentication.signInAsync({ requestedScopes });
      if (!token) {
        console.error("No identity token found after Apple sign-in.");
        return rejectWithValue("No identity token found after Apple sign-in.");
      }

      const { error } = await supabase.auth.signInWithIdToken({ token, provider: "apple" });
      if (error) {
        console.error(`Error signing in with Apple: ${error.message}`);
        return rejectWithValue(`Error signing in: ${error.message}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(`Error signing in: ${errorMessage}`);
    }
  },
);
