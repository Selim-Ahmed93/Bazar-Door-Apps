import { createAuthClient } from "better-auth/react";

// Build time ebong runtime 2-kshetrei safe base URL
const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Vercel build phase-er jonno permanent fallback:
  return "https://bazar-door-apps.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL().replace(/\/$/, ""), 
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  resetPassword,
} = authClient;