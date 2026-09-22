import { useState } from "react";

export function WarningModal({ warning, onAcknowledged }) {
  if (!warning) return null;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleAcknowledge = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/user/acknowledge-warning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ warningId: warning.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to acknowledge warning.",
        );
      }

      if (onAcknowledged) onAcknowledged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "1rem",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "520px",
          width: "100%",
          backgroundColor: "#1e1b4b",
          border: "2px solid #eab308",
          borderRadius: "12px",
          padding: "1.75rem",
          textAlign: "left",
          boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <span style={{ fontSize: "2rem" }}>⚠️</span>
          <div>
            <h3 style={{ margin: 0, color: "#fef08a", fontSize: "1.25rem" }}>
              Moderation Warning Notice
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#fef9c3" }}>
              Action Required • Platform Guidelines Notice
            </span>
          </div>
        </div>

        {error && (
          <div
            className="error-alert"
            style={{ marginBottom: "1rem", fontSize: "0.85rem" }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #334155",
            marginBottom: "1.25rem",
            fontSize: "0.9rem",
            color: "#e2e8f0",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#eab308",
              marginBottom: "0.4rem",
            }}
          >
            Issue / Context: {warning.reason || "Platform Guidelines"}
          </div>
          <p
            style={{
              margin: 0,
              lineHeight: "1.5",
              fontSize: "0.85rem",
              color: "#f8fafc",
            }}
          >
            "
            {warning.message ||
              "You have received a warning from platform moderators. Please review our community guidelines."}
            "
          </p>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#94a3b8",
              marginTop: "0.6rem",
            }}
          >
            Issued: {new Date(warning.createdAt).toLocaleString()}
          </div>
        </div>

        <p
          style={{
            fontSize: "0.8rem",
            color: "#cbd5e1",
            marginBottom: "1.25rem",
          }}
        >
          Please acknowledge this notice to continue using Basera. Further
          violations may result in account suspension or permanent termination.
        </p>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleAcknowledge}
            disabled={submitting}
            style={{
              backgroundColor: "#eab308",
              color: "#0f172a",
              fontWeight: "bold",
              fontSize: "0.9rem",
              padding: "0.65rem 1.25rem",
              borderRadius: "8px",
              border: "none",
            }}
          >
            {submitting
              ? "Processing..."
              : "I Acknowledge & Agree to Guidelines ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}
