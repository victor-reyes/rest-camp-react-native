import { createAsyncThunk } from "@reduxjs/toolkit";
import { appleAuthApi, supabaseAuthApi } from "../api";

export const authWithApple = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/authWithApple",
  async (_, { rejectWithValue }) => {
    const { token, error: authError } = await appleAuthApi.signIn();

    if (authError) return rejectWithValue(`Något gick fel. Försök igen senare.`);

    const { error } = await supabaseAuthApi.signInWithIdToken(token, "apple");

    if (error) return rejectWithValue(`Något gick fel vid inloggning: ${error.code}`);
  },
);
