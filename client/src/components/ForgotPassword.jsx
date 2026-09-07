import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("request"); // 'request' | 'reset' | 'done'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: apiError } = await authClient.forgetPassword({
        email,
        redirectTo: "http://localhost:5173",
      });

      if (apiError) throw new Error(apiError.message);

      setMessage(
        "Password reset token generated! (Check server console log in dev mode).",
      );
      setStep("reset");
    } catch (err) {
      setError(err.message || "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: apiError } = await authClient.resetPassword({
        newPassword,
        token: resetToken,
      });

      if (apiError) throw new Error(apiError.message);

      setMessage(
        "Password reset successful! You can now log in with your new password.",
      );
      setStep("done");
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
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
          Reset your password
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            marginTop: "0.2rem",
          }}
        >
          Recover access to your Basera student account
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

      {message && <div className="status-notice">{message}</div>}

      {step === "request" && (
        <form
          onSubmit={handleRequestReset}
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
              Registered Email Address
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
          <button
            type="submit"
            disabled={loading}
            className="pill-btn-primary"
            style={{ width: "100%", padding: "0.8rem", marginTop: "0.4rem" }}
          >
            {loading ? "Sending..." : "Request Reset Token"}
          </button>
        </form>
      )}

      {step === "reset" && (
        <form
          onSubmit={handleResetConfirm}
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
              Reset Token
            </label>
            <input
              type="text"
              required
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              placeholder="Paste token from console"
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
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            style={{ width: "100%", padding: "0.8rem", marginTop: "0.4rem" }}
          >
            {loading ? "Resetting..." : "Confirm Password Reset"}
          </button>
        </form>
      )}

      {step === "done" && (
        <button
          type="button"
          className="pill-btn-primary"
          onClick={onBackToLogin}
          style={{ width: "100%", padding: "0.8rem", marginTop: "1rem" }}
        >
          Sign In with New Password
        </button>
      )}

      {step !== "done" && (
        <div style={{ marginTop: "1.2rem", textAlign: "center" }}>
          <button
            type="button"
            className="btn-link"
            onClick={onBackToLogin}
            style={{ fontSize: "0.88rem" }}
          >
            &larr; Back to Sign In
          </button>
        </div>
      )}
    </div>
  );
}
