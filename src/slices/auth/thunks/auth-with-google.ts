import { createAsyncThunk } from "@reduxjs/toolkit";
import { googleAuthApi, supabaseAuthApi } from "../api";

export const authWithGoogle = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/authWithGoogle",
  async (_, { rejectWithValue }) => {
    const { token, error: authError } = await googleAuthApi.signIn();

    if (authError) return rejectWithValue(`Något gick fel. Försök igen senare.`);

    const { error } = await supabaseAuthApi.signInWithIdToken(token, "google");

    if (error) return rejectWithValue(`Något gick fel vid inloggning: ${error.code}`);
  },
);
