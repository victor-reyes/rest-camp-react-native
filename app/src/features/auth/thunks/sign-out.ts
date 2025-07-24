import { createAsyncThunk } from "@reduxjs/toolkit";
import { appleAuthApi, googleAuthApi, supabaseAuthApi } from "../api";

export const signOut = createAsyncThunk(
  "auth/signOut",
  async () =>
    await Promise.all([googleAuthApi.signOut(), appleAuthApi.signOut(), supabaseAuthApi.signOut()]),
);
