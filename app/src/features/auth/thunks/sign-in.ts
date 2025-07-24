import { createAsyncThunk } from "@reduxjs/toolkit";
import { appleAuthApi, googleAuthApi, supabaseAuthApi } from "../api";
import { AuthenticationError } from "../types";

export const signIn = createAsyncThunk<
  void,
  "apple" | "google",
  { rejectValue: AuthenticationError }
>("auth/signIn", async (provider, { rejectWithValue }) => {
  const providerApi = provider === "google" ? googleAuthApi : appleAuthApi;
  const { token, error: authError } = await providerApi.signIn();
  if (authError) return rejectWithValue(authError);

  const { error } = await supabaseAuthApi.signInWithIdToken(token, provider);
  if (error) return rejectWithValue(error);
});
