import { supabase } from "@/lib/supabase";
import { AuthenticationError } from "../types";

export const supabaseAuthApi = {
  async signInWithIdToken(
    token: string,
    provider: "apple" | "google",
  ): Promise<{ error?: AuthenticationError }> {
    try {
      const { error } = await supabase.auth.signInWithIdToken({ token, provider });
      if (error) {
        console.error(`Error signing in with ${provider}: ${error.message}`);
        return { error: { code: "SUPABASE_ERROR" } };
      }
    } catch (error) {
      console.error(
        "Error during sign in with ID token:",
        error instanceof Error ? error.message : error,
      );
      return { error: { code: "SUPABASE_ERROR" } };
    }
    return { error: undefined };
  },
  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error(`Error signing out: ${error.message}`);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  },
};
