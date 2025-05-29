import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await GoogleSignin.signOut();
  await supabase.auth.signOut();
});
