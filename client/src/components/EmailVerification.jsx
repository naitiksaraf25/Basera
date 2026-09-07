import { useState, useEffect } from "react";
import { authClient } from "../lib/auth-client";

export function EmailVerification({ tokenFromUrl, onVerificationComplete }) {
  const [token, setToken] = useState(tokenFromUrl || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (tokenToUse) => {
    const activeToken = tokenToUse || token;
    if (!activeToken) return;

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const { data, error: apiError } = await authClient.verifyEmail({
        query: {
          token: activeToken,
        },
      });

      if (apiError) throw new Error(apiError.message);

      setStatus("Email verified successfully! You may now sign in.");
      if (onVerificationComplete) onVerificationComplete(data);
    } catch (err) {
      setError(err.message || "Email verification failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenFromUrl) {
      handleVerify(tokenFromUrl);
    }
  }, [tokenFromUrl]);

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
          Verify your email
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            marginTop: "0.2rem",
          }}
        >
          Confirm your address to activate university verified badge
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

      {status && (
        <div
          className="status-notice"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{status}</span>
        </div>
      )}

      {!tokenFromUrl && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
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
              Verification Token
            </label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste verification token"
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
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      )}
    </div>
  );
}
