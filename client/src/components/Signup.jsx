import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function Signup({ onSignupSuccess, audience, onChangeAudience }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  // Sync intended role to local storage whenever audience is passed
  if (audience) {
    try {
      localStorage.setItem("basera_intended_role", audience);
    } catch {}
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const callbackOrigin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : "";
      const callbackURL = callbackOrigin ? `${callbackOrigin}/app/onboarding` : "/app/onboarding";

      const { data, error: apiError } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (audience) {
        localStorage.setItem("basera_intended_role", audience);
      }
      const { data, error: apiError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "http://localhost:5173",
      });

      if (apiError) {
        throw new Error(apiError.message || "Signup failed");
      }

      setSubmitted(true);
      if (onSignupSuccess) onSignupSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "9999px",
            background: "var(--accent-success-subtle)",
            color: "var(--accent-success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.2rem auto",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Welcome to Basera!
        </h3>
        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--text-secondary)",
            marginBottom: "1.2rem",
          }}
        >
          A verification link has been generated for <strong>{email}</strong>.
        </p>
        <div
          className="status-notice"
          style={{ fontSize: "0.85rem", textAlign: "left" }}
        >
          In local development mode, check your server terminal console for the
          verification link and token.
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="pill-btn-secondary"
          style={{ marginTop: "1.2rem" }}
        >
          Back to Form
        </button>
      </div>
    );
  }

  const isLandlord = audience === "landlord";

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      {/* Audience Indicator Badge */}
      {audience && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: isLandlord
              ? "var(--accent-warm-subtle)"
              : "var(--accent-primary-subtle)",
            border: `1px solid ${
              isLandlord
                ? "rgba(249, 115, 22, 0.25)"
                : "rgba(10, 88, 246, 0.2)"
            }`,
            padding: "0.55rem 0.9rem",
            borderRadius: "12px",
            marginBottom: "1.2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.05rem" }}>
              {isLandlord ? "🏢" : "🎓"}
            </span>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: isLandlord
                  ? "var(--accent-warm)"
                  : "var(--accent-primary)",
              }}
            >
              {isLandlord ? "Listing Property / Host Path" : "Seeking Room / Student Path"}
            </span>
          </div>
          {onChangeAudience && (
            <button
              onClick={onChangeAudience}
              className="btn-link"
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--text-muted)",
              }}
            >
              Change
            </button>
          )}
        </div>
      )}

      <div style={{ marginBottom: "1.4rem" }}>
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          {isLandlord
            ? "Create Host Account"
            : audience === "seeker"
            ? "Create Seeker Account"
            : "Create your account"}
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            marginTop: "0.2rem",
          }}
        >
          {isLandlord
            ? "List verified rooms, apartments, and PG beds to student residents"
            : "Join thousands of students finding verified rooms with zero brokerage"}
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
          {googleLoading ? "Connecting to Google..." : "Sign up with Google"}
        </span>
      </button>

      <div className="divider" style={{ margin: "1.4rem 0" }}>
        <span>or sign up with email</span>
      </div>

      <form
        onSubmit={handleSubmit}
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
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav Sharma"
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
          <label
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.35rem",
            }}
          >
            College or Personal Email
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
          <label
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.35rem",
            }}
          >
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a secure password"
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
          {loading ? "Creating Profile..." : "Create Basera Account"}
        </button>
      </form>
    </div>
  );
}
