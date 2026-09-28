import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getMongoClientAndDb } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

// Connect using cached MongoClient for serverless compatibility
const { db } = await getMongoClientAndDb();

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:5000");

const trustedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:5173",
];
if (process.env.VERCEL_URL) {
  trustedOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.BETTER_AUTH_URL) {
  trustedOrigins.push(process.env.BETTER_AUTH_URL);
}

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    transaction: false, // Disabled for standalone MongoDB compatibility
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("==================================================");
      console.log(`[DEV EMAIL SENDER] Verification email for: ${user.email}`);
      console.log(`Verification URL: ${url}`);
      console.log(`Verification Token: ${token}`);
      console.log("==================================================");
    },
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("==================================================");
      console.log(`[DEV EMAIL SENDER] Password Reset email for: ${user.email}`);
      console.log(`Reset Password URL: ${url}`);
      console.log(`Reset Token: ${token}`);
      console.log("==================================================");
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder_google_client_id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "placeholder_google_client_secret",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
      accountStatus: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
      platformVerification: {
        type: "object",
        required: false,
      },
      warnings: {
        type: "object",
        required: false,
      },
    },
  },
  trustedOrigins,
});
