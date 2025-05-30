import { createAsyncThunk } from "@reduxjs/toolkit";
import { appleAuthApi, googleAuthApi, supabaseAuthApi } from "../api";

export const signIn = createAsyncThunk<void, "apple" | "google", { rejectValue: string }>(
  "auth/signIn",
  async (provider, { rejectWithValue }) => {
    const providerApi = provider === "google" ? googleAuthApi : appleAuthApi;
    const { token, error: authError } = await providerApi.signIn();
    if (authError) return rejectWithValue(`Något gick fel. Försök igen senare.`);

    const { error } = await supabaseAuthApi.signInWithIdToken(token, provider);
    if (error) return rejectWithValue(`Något gick fel vid inloggning: ${error.code}`);
  },
);
