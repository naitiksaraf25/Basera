import { useState, useEffect } from "react";

export function AdminDashboard({ user }) {
  const [activeSubTab, setActiveSubTab] = useState("reports"); // 'reports' | 'verifications' | 'promote'
  const [reports, setReports] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [aiLoading, setAiLoading] = useState({});

  // Form state for promoting user to admin
  const [promoteTarget, setPromoteTarget] = useState("");
  const [promoting, setPromoting] = useState(false);

  // Request AI Advisory Suggestion for a report
  const handleAiSuggest = async (reportId) => {
    setAiLoading((prev) => ({ ...prev, [reportId]: true }));
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/ai-suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.available && data.suggestion) {
        setAiSuggestions((prev) => ({
          ...prev,
          [reportId]: data.suggestion,
        }));
      } else {
        setAiSuggestions((prev) => ({
          ...prev,
          [reportId]: {
            action: "unavailable",
            justification: data.message || "AI suggestion unavailable at this time.",
          },
        }));
      }
    } catch (err) {
      setAiSuggestions((prev) => ({
        ...prev,
        [reportId]: {
          action: "error",
          justification: "Network error fetching AI suggestion.",
        },
      }));
    } finally {
      setAiLoading((prev) => ({ ...prev, [reportId]: false }));
    }
  };

  // Fetch reports
  const fetchReports = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const url =
        statusFilter && statusFilter !== "all"
          ? `/api/admin/reports?status=${statusFilter}`
          : "/api/admin/reports";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setReports(data.reports || []);
      } else {
        setErrorMsg(data.message || "Failed to fetch reports.");
      }
    } catch (err) {
      setErrorMsg("Network error fetching reports.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch verifications
  const fetchVerifications = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/verifications");
      const data = await res.json();
      if (res.ok) {
        setVerifications(data.verifications || []);
      } else {
        setErrorMsg(data.message || "Failed to fetch pending verifications.");
      }
    } catch (err) {
      setErrorMsg("Network error fetching verifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === "reports") {
      fetchReports();
    } else if (activeSubTab === "verifications") {
      fetchVerifications();
    }
  }, [activeSubTab, statusFilter]);

  // Handle report moderation action
  const handleReportAction = async (reportId, action) => {
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(`Action '${action}' applied to report successfully.`);
        fetchReports();
      } else {
        alert(data.message || "Failed to apply report action.");
      }
    } catch (err) {
      alert("Error applying action.");
    }
  };

  // Handle verification action
  const handleVerificationAction = async (userId, action) => {
    try {
      const res = await fetch(`/api/admin/verifications/${userId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(`Verification ${action}d successfully.`);
        fetchVerifications();
      } else {
        alert(data.message || "Failed to update verification status.");
      }
    } catch (err) {
      alert("Error updating verification status.");
    }
  };

  // Handle promote user to admin
  const handlePromoteAdmin = async (e) => {
    e.preventDefault();
    if (!promoteTarget.trim()) return;

    setPromoting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const isEmail = promoteTarget.includes("@");
      const res = await fetch("/api/admin/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEmail
            ? { email: promoteTarget.trim() }
            : { userId: promoteTarget.trim() },
        ),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "User successfully promoted to admin!");
        setPromoteTarget("");
      } else {
        setErrorMsg(data.message || "Failed to promote user.");
      }
    } catch (err) {
      setErrorMsg("Network error promoting user.");
    } finally {
      setPromoting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "1rem auto", textAlign: "left" }}>
      {/* Header Banner */}
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
          padding: "1.25rem 1.5rem",
          borderRadius: "18px",
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: "var(--text-primary)", fontSize: "1.3rem", fontWeight: 800 }}>
            🛡️ Admin Moderation Dashboard
          </h3>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Platform Moderation, User Reports, Identity Approvals & Governance
          </span>
        </div>
        <span className="badge badge-warning">
          👑 Admin Mode
        </span>
      </div>

      {errorMsg && (
        <div className="error-alert" style={{ marginBottom: "1rem" }}>
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div
          className="status-notice"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}
        >
          <span>✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Sub-tab bar */}
      <div
        style={{
          display: "flex",
          gap: "0.35rem",
          background: "var(--bg-surface-subtle)",
          padding: "4px",
          borderRadius: "9999px",
          border: "1px solid var(--border-subtle)",
          marginBottom: "1.25rem",
          width: "fit-content",
        }}
      >
        <button
          className={`app-nav-pill-btn ${activeSubTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveSubTab("reports")}
        >
          🚨 Moderation Reports
        </button>
        <button
          className={`app-nav-pill-btn ${activeSubTab === "verifications" ? "active" : ""}`}
          onClick={() => setActiveSubTab("verifications")}
        >
          📋 Pending Verifications
        </button>
        <button
          className={`app-nav-pill-btn ${activeSubTab === "promote" ? "active" : ""}`}
          onClick={() => setActiveSubTab("promote")}
        >
          🔑 Promote Admin
        </button>
      </div>

      {/* 1. REPORTS TAB */}
      {activeSubTab === "reports" && (
        <div className="card" style={{ borderRadius: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <h4 style={{ margin: 0, color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 700 }}>User Reports</h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
              }}
            >
              <label style={{ color: "var(--text-muted)" }}>Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "9999px",
                  backgroundColor: "var(--bg-surface-subtle)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                }}
              >
                <option value="pending">Pending Only</option>
                <option value="dismissed">Dismissed</option>
                <option value="actioned">Actioned</option>
                <option value="all">All Statuses</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "1.5rem 0" }}>
              ⏳ Loading reports...
            </p>
          ) : reports.length === 0 ? (
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                textAlign: "center",
                padding: "2rem 0",
              }}
            >
              🎉 No reports found for filter '{statusFilter}'. Platform healthy.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {reports.map((rep) => (
                <div
                  key={rep._id || rep.id}
                  style={{
                    padding: "1rem 1.25rem",
                    background: "var(--bg-surface-subtle)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "14px",
                    fontSize: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      <span
                        className="badge badge-warning"
                        style={{ marginRight: "0.5rem" }}
                      >
                        {rep.reason}
                      </span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                        Reporter: {rep.reporterId}
                      </span>
                      <span style={{ color: "var(--text-muted)", margin: "0 0.4rem" }}>
                        ➔
                      </span>
                      <span style={{ color: "#ef4444", fontWeight: 700 }}>
                        Target: {rep.reportedUserId}
                      </span>
                    </div>
                    <span className={`badge ${rep.status === "pending" ? "badge-warning" : "badge-neutral"}`}>
                      {rep.status.toUpperCase()}{" "}
                      {rep.actionTaken !== "none" ? `(${rep.actionTaken})` : ""}
                    </span>
                  </div>

                  {rep.details && (
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        margin: "0.5rem 0",
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                      }}
                    >
                      "{rep.details}"
                    </p>
                  )}

                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginTop: "0.4rem",
                    }}
                  >
                    Submitted: {new Date(rep.createdAt).toLocaleString()}
                  </div>

                  {/* Actions for pending report */}
                  {rep.status === "pending" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "0.85rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "dismiss")
                        }
                        className="pill-btn-secondary"
                        style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "warn")
                        }
                        style={{
                          background: "var(--accent-warm)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          padding: "0.35rem 0.75rem",
                        }}
                      >
                        Warn User
                      </button>
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "suspend")
                        }
                        style={{
                          background: "#ea580c",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          padding: "0.35rem 0.75rem",
                        }}
                      >
                        Suspend Account
                      </button>
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "ban")
                        }
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          padding: "0.35rem 0.75rem",
                        }}
                      >
                        Ban Account
                      </button>

                      {/* 🤖 AI Suggest Action Button */}
                      <button
                        id={`ai-suggest-btn-${rep._id || rep.id}`}
                        onClick={() => handleAiSuggest(rep._id || rep.id)}
                        disabled={aiLoading[rep._id || rep.id]}
                        className="pill-btn-ghost"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.78rem",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "9999px",
                          background: "rgba(99, 102, 241, 0.12)",
                          color: "var(--accent-primary)",
                          border: "1px solid rgba(99, 102, 241, 0.35)",
                          fontWeight: 700,
                          cursor: aiLoading[rep._id || rep.id] ? "not-allowed" : "pointer",
                        }}
                      >
                        {aiLoading[rep._id || rep.id] ? "⏳ Analyzing..." : "🤖 AI Suggest Action"}
                      </button>

                      {/* Advisory Suggestion Display Box */}
                      {aiSuggestions[rep._id || rep.id] && (
                        <div
                          id={`ai-suggestion-box-${rep._id || rep.id}`}
                          style={{
                            width: "100%",
                            marginTop: "0.65rem",
                            padding: "0.75rem 0.9rem",
                            borderRadius: "12px",
                            background: "var(--bg-surface)",
                            border: "1px solid rgba(99, 102, 241, 0.35)",
                            fontSize: "0.82rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.3rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontWeight: 800, color: "var(--accent-primary)" }}>
                              🤖 AI Advisory Suggestion:
                            </span>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontWeight: 800,
                                fontSize: "0.74rem",
                                padding: "0.15rem 0.5rem",
                                borderRadius: "6px",
                                background:
                                  aiSuggestions[rep._id || rep.id].action === "ban"
                                    ? "rgba(239, 68, 68, 0.15)"
                                    : aiSuggestions[rep._id || rep.id].action === "suspend"
                                    ? "rgba(234, 88, 12, 0.15)"
                                    : aiSuggestions[rep._id || rep.id].action === "warn"
                                    ? "rgba(245, 158, 11, 0.15)"
                                    : "rgba(16, 185, 129, 0.15)",
                                color:
                                  aiSuggestions[rep._id || rep.id].action === "ban"
                                    ? "#ef4444"
                                    : aiSuggestions[rep._id || rep.id].action === "suspend"
                                    ? "#ea580c"
                                    : aiSuggestions[rep._id || rep.id].action === "warn"
                                    ? "#f59e0b"
                                    : "#10b981",
                              }}
                            >
                              {aiSuggestions[rep._id || rep.id].action}
                            </span>
                          </div>
                          <div style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
                            "{aiSuggestions[rep._id || rep.id].justification}"
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                            Advisory recommendation only — moderation action must still be confirmed manually by admin.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. VERIFICATIONS TAB */}
      {activeSubTab === "verifications" && (
        <div className="card" style={{ borderRadius: "20px" }}>
          <h4 style={{ margin: "0 0 1.25rem 0", color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 700 }}>
            Pending Verification Requests ({verifications.length})
          </h4>

          {loading ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "1.5rem 0" }}>
              ⏳ Loading pending verifications...
            </p>
          ) : verifications.length === 0 ? (
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                textAlign: "center",
                padding: "2rem 0",
              }}
            >
              🎉 No pending verification requests! All candidate submissions reviewed.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {verifications.map((u) => {
                const pv = u.platformVerification || {};
                return (
                  <div
                    key={u._id || u.id}
                    style={{
                      padding: "1rem 1.25rem",
                      background: "var(--bg-surface-subtle)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "14px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      <div>
                        <h5
                          style={{
                            margin: 0,
                            color: "var(--text-primary)",
                            fontSize: "1.05rem",
                            fontWeight: 700,
                          }}
                        >
                          {u.name || u.email}
                        </h5>
                        <p
                          style={{
                            margin: "3px 0",
                            color: "var(--accent-primary)",
                            textTransform: "capitalize",
                            fontWeight: 600,
                          }}
                        >
                          Role: {u.role || "Unset"} • Method:{" "}
                          {pv.method || "N/A"}
                        </p>
                        <p
                          style={{
                            margin: "2px 0",
                            color: "var(--text-muted)",
                            fontSize: "0.82rem",
                          }}
                        >
                          Email: {u.email}{" "}
                          {pv.collegeEmail
                            ? `(College: ${pv.collegeEmail})`
                            : ""}
                        </p>
                      </div>

                      {pv.idDocumentUrl && (
                        <a
                          href={pv.idDocumentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="pill-btn-secondary"
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.4rem 0.85rem",
                            textDecoration: "none",
                          }}
                        >
                          📄 View Uploaded ID ↗
                        </a>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.6rem",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleVerificationAction(u.id || u._id, "approve")
                        }
                        className="pill-btn-primary"
                        style={{
                          fontSize: "0.82rem",
                          padding: "0.4rem 0.95rem",
                        }}
                      >
                        ✓ Approve Verification
                      </button>
                      <button
                        onClick={() =>
                          handleVerificationAction(u.id || u._id, "reject")
                        }
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          color: "#ef4444",
                          border: "1px solid rgba(239, 68, 68, 0.25)",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          padding: "0.4rem 0.95rem",
                        }}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. PROMOTE ADMIN TAB */}
      {activeSubTab === "promote" && (
        <div className="card" style={{ borderRadius: "20px" }}>
          <h4 style={{ margin: "0 0 0.4rem 0", color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 700 }}>
            Grant Admin Privileges
          </h4>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              marginBottom: "1.25rem",
            }}
          >
            Promote an existing user account to platform administrator.
          </p>

          <form
            onSubmit={handlePromoteAdmin}
            style={{ display: "flex", gap: "0.6rem", maxWidth: "520px" }}
          >
            <input
              type="text"
              placeholder="Enter user email or User ID..."
              value={promoteTarget}
              onChange={(e) => setPromoteTarget(e.target.value)}
              disabled={promoting}
              style={{
                flex: 1,
                padding: "0.65rem 1rem",
                borderRadius: "9999px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface-subtle)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
              }}
            />
            <button
              type="submit"
              disabled={promoting || !promoteTarget.trim()}
              className="pill-btn-primary"
              style={{
                padding: "0.65rem 1.25rem",
                fontSize: "0.88rem",
                fontWeight: 700,
              }}
            >
              {promoting ? "Promoting..." : "Promote 👑"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

