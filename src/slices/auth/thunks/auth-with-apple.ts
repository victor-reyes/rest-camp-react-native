import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AppleAuthentication from "expo-apple-authentication";
import { CodedError } from "expo-modules-core";

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
        return rejectWithValue("Identitets-token saknas. Försök igen.");
      }

      const { error } = await supabase.auth.signInWithIdToken({ token, provider: "apple" });
      if (error) {
        console.error(`Error during Apple sign-in: ${error.message}`);
        return rejectWithValue(`Något gick fel... Försök igen senare.`);
      }
    } catch (error) {
      if (error instanceof CodedError) {
        switch (error.code) {
          case "ERR_REQUEST_CANCELED":
            console.warn("User canceled the Apple sign-in flow.");
            return rejectWithValue("Du avbröt inloggningen.");
        }
      }
      console.error("Error during Apple sign-in:", JSON.stringify(error));
      return rejectWithValue(`Något gick fel. Försök igen senare.`);
    }
  },
);
