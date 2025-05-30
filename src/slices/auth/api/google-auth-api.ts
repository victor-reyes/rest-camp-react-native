import { SignInResponse } from "../types";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export const googleAuthApi = {
  async signIn(): Promise<SignInResponse> {
    try {
      const { data, type } = await GoogleSignin.signIn();
      if (type === "cancelled") {
        console.error("Google sign-in was cancelled by the user.");
        return { error: { code: "SIGN_IN_CANCELLED" } };
      }
      const { idToken: token } = data;
      if (!token) {
        console.error("No ID token found after Google sign-in.");
        return { error: { code: "SIGN_IN_FAILED" } };
      }
      return { token };
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.warn("Google sign-in was cancelled by the user.");
            return { error: { code: "SIGN_IN_CANCELLED" } };
          case statusCodes.IN_PROGRESS:
            console.warn("Google sign-in is already in progress.");
            return { error: { code: "SIGN_IN_IN_PROGRESS" } };
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error("Google Play services are not available.");
            return { error: { code: "PLAY_SERVICES_NOT_AVAILABLE" } };
          case statusCodes.SIGN_IN_REQUIRED:
            console.error("Google sign-in is required.");
            return { error: { code: "SIGN_IN_REQUIRED" } };
          default:
            console.error(`Unknown error during sign-in: ${error.message}`);
            return { error: { code: "UNKNOWN" } };
        }
      }
      console.error("Error during Google sign-in:", JSON.stringify(error));
      return { error: { code: "UNKNOWN" } };
    }
  },
  async signOut() {},
};
