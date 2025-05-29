import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { authWithApple, authWithGoogle } from "./thunks";
import { signOut } from "./thunks/sign-out";

interface AuthState {
  session: Session | null;
  error: string | null;
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
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authWithGoogle.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authWithGoogle.fulfilled, state => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(authWithGoogle.rejected, (state, action) => {
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
      })
      .addCase(authWithApple.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authWithApple.fulfilled, state => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(authWithApple.rejected, (state, action) => {
        state.error = action.payload!;
        state.isLoading = false;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setSession } = authSlice.actions;
