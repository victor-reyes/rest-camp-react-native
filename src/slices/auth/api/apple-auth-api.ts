import * as AppleAuthentication from "expo-apple-authentication";
import { CodedError } from "expo-modules-core";
import { SignInResponse } from "../types";

const requestedScopes = [
  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  AppleAuthentication.AppleAuthenticationScope.EMAIL,
];

export const appleAuthApi = {
  async signIn(): Promise<SignInResponse> {
    try {
      const { identityToken: token } = await AppleAuthentication.signInAsync({ requestedScopes });
      if (!token) {
        console.error("No identity token found after Apple sign-in.");
        return { error: { code: "SIGN_IN_FAILED" } };
      }
      return { token };
    } catch (error) {
      if (error instanceof CodedError) {
        switch (error.code) {
          case "ERR_REQUEST_CANCELED":
            return { error: { code: "SIGN_IN_CANCELLED" } };
        }
      }
      console.error("Error during Apple sign-in:", JSON.stringify(error));
      return { error: { code: "UNKNOWN" } };
    }
  },
  async signOut() {},
};
