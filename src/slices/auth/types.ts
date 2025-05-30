export type AuthenticationError = {
  code:
    | "SIGN_IN_CANCELLED"
    | "SIGN_IN_FAILED"
    | "SIGN_IN_IN_PROGRESS"
    | "PLAY_SERVICES_NOT_AVAILABLE"
    | "SIGN_IN_REQUIRED"
    | "SUPABASE_ERROR"
    | "UNKNOWN";
};

export type SignInResponse =
  | { token: string; error?: never }
  | { token?: never; error: AuthenticationError };
