import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function Login({ onLoginSuccess, onToggleForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "http://localhost:5173",
      });

      if (apiError) {
        throw new Error(apiError.message || "Login failed");
      }

      if (onLoginSuccess) onLoginSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { data, error: apiError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:5173",
      });

      if (apiError) {
        throw new Error(
          apiError.message || "Google authentication initialization failed.",
        );
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("[Google OAuth Error]:", err);
      setError("Google Sign-In failed: " + err.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      <div style={{ marginBottom: "1.4rem" }}>
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Welcome back
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            marginTop: "0.2rem",
          }}
        >
          Sign in to your Basera student living account
        </p>
      </div>

      {error && (
        <div
          className="error-alert"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "0.75rem 1.2rem",
          borderRadius: "9999px",
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-medium)",
          fontWeight: 600,
          fontSize: "0.92rem",
          cursor: "pointer",
          boxShadow: "var(--shadow-sm)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--bg-surface-subtle)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--bg-surface)")
        }
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </span>
      </button>

      <div className="divider" style={{ margin: "1.4rem 0" }}>
        <span>or sign in with email</span>
      </div>

      <form
        onSubmit={handleEmailLogin}
        style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
      >
        <div className="form-group" style={{ margin: 0 }}>
          <label
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.35rem",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@university.edu"
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: "9999px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-surface-subtle)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
            }}
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.35rem",
            }}
          >
            <label
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              Password
            </label>
            <button
              type="button"
              className="btn-link"
              onClick={onToggleForgotPassword}
              style={{
                fontSize: "0.8rem",
                color: "var(--accent-primary)",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: "9999px",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-surface-subtle)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="pill-btn-primary"
          style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: "0.95rem",
            marginTop: "0.4rem",
          }}
        >
          {loading ? "Signing In..." : "Sign In to Basera"}
        </button>
      </form>
    </div>
  );
}
