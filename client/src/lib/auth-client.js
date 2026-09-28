import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    import.meta.env.VITE_SERVER_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:5000"),
});

export const { useSession, signIn, signUp, signOut } = authClient;
