import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { signIn, signOut } from "./thunks";
import { AuthenticationError } from "./types";

interface AuthState {
  session: Session | null;
  error: AuthenticationError | null;
  isLoading: boolean;
}
const initialState: AuthState = {
  session: null,
  error: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionSet: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    errorCleared: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, state => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload!;
        state.isLoading = false;
      })
      .addCase(signOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, state => {
        state.session = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { sessionSet, errorCleared } = authSlice.actions;
