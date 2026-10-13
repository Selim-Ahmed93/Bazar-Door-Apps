
import { createAuthClient } from "better-auth/react";

const getBaseURL = (): string => {
  const baseURL =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  if (!baseURL) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is missing. Check your environment variables."
    );
  }

  return new URL(baseURL).origin;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  resetPassword,
} = authClient;
