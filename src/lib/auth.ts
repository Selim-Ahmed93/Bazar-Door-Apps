import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri =
  process.env.BETTER_AUTH_MONGODB_URI ||
  process.env.MONGODB_URI;

if (!uri) {
  throw new Error("BETTER_AUTH_MONGODB_URI or MONGODB_URI is not defined in .env");
}

const client = new MongoClient(uri);

export const database = client.db("bazardor");

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (
  process.env.GITHUB_CLIENT_ID &&
  process.env.GITHUB_CLIENT_SECRET
) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

// 🔥 Fix 1: baseURL clean ebong fallback sohoto
const rawBaseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "https://bazar-door-apps.vercel.app";

// Sheshe extra slash `/` thakle muche phelbe
const baseURL = rawBaseURL.replace(/\/$/, "");

export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,

  // 🔥 Fix 2: trustedOrigins Dynamic ebong Vercel deployment support
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://bazar-door-apps.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders,
});