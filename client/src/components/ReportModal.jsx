import { useState } from "react";

export function ReportModal({
  reportedUserId,
  reportedUserName,
  onClose,
  onReportSubmitted,
}) {
  const [reason, setReason] = useState("Harassment");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportedUserId) {
      setError("Target user ID for report could not be determined.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportedUserId,
          reason,
          details: details.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to submit report.",
        );
      }

      setSuccessMsg(data.message || "Report submitted successfully.");
      setTimeout(() => {
        if (onReportSubmitted) onReportSubmitted();
        onClose();
      }, 1500);
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
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "1.5rem",
          textAlign: "left",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0, color: "#f8fafc", fontSize: "1.15rem" }}>
            🚨 Report User
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            color: "#cbd5e1",
            marginBottom: "1rem",
          }}
        >
          Reporting <strong>{reportedUserName || reportedUserId}</strong> to
          platform moderators. Please specify the reason below.
        </p>

        {error && (
          <div
            className="error-alert"
            style={{ marginBottom: "1rem", fontSize: "0.85rem" }}
          >
            {error}
          </div>
        )}

        {successMsg && (
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "1px solid #22c55e",
              color: "#22c55e",
              padding: "0.75rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}
          >
            ✓ {successMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#94a3b8",
                marginBottom: "0.4rem",
              }}
            >
              Reason for Report *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={submitting}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "6px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#f8fafc",
                fontSize: "0.9rem",
              }}
            >
              <option value="Harassment">Harassment</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate Content">
                Inappropriate Content
              </option>
              <option value="Fake Listing">Fake Listing</option>
              <option value="Safety Concern">Safety Concern</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#94a3b8",
                marginBottom: "0.4rem",
              }}
            >
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context or description of the incident..."
              disabled={submitting}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "6px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#f8fafc",
                fontSize: "0.85rem",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "flex-end",
              marginTop: "0.5rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                background: "#475569",
                padding: "0.55rem 1rem",
                fontSize: "0.85rem",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: "#ef4444",
                fontWeight: "bold",
                padding: "0.55rem 1rem",
                fontSize: "0.85rem",
              }}
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
