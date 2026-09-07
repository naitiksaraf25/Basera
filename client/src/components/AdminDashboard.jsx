import { useState, useEffect } from "react";

export function AdminDashboard({ user }) {
  const [activeSubTab, setActiveSubTab] = useState("reports"); // 'reports' | 'verifications' | 'promote'
  const [reports, setReports] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form state for promoting user to admin
  const [promoteTarget, setPromoteTarget] = useState("");
  const [promoting, setPromoting] = useState(false);

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
          justify: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          padding: "1rem 1.25rem",
          backgroundColor: "#1e1b4b",
          border: "1px solid #4338ca",
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: "#a5b4fc" }}>
            🛡️ Admin Moderation Dashboard
          </h3>
          <span style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>
            Platform Moderation, Reports, Verification Approvals & Governance
          </span>
        </div>
        <span className="badge badge-warning" style={{ fontSize: "0.8rem" }}>
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

      {/* Sub-tab bar */}
      <div
        className="tab-bar"
        style={{ justifyContent: "flex-start", marginBottom: "1rem" }}
      >
        <button
          className={activeSubTab === "reports" ? "active" : ""}
          onClick={() => setActiveSubTab("reports")}
        >
          🚨 Moderation Reports
        </button>
        <button
          className={activeSubTab === "verifications" ? "active" : ""}
          onClick={() => setActiveSubTab("verifications")}
        >
          📋 Pending Verifications
        </button>
        <button
          className={activeSubTab === "promote" ? "active" : ""}
          onClick={() => setActiveSubTab("promote")}
        >
          🔑 Promote Admin
        </button>
      </div>

      {/* 1. REPORTS TAB */}
      {activeSubTab === "reports" && (
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: 0, color: "#f8fafc" }}>User Reports</h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
              }}
            >
              <label style={{ color: "#94a3b8" }}>Status Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "0.3rem 0.6rem",
                  borderRadius: "6px",
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  color: "#f8fafc",
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
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Loading reports...
            </p>
          ) : reports.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.9rem",
                textAlign: "center",
                padding: "1.5rem 0",
              }}
            >
              No reports found for filter '{statusFilter}'.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {reports.map((rep) => (
                <div
                  key={rep._id || rep.id}
                  style={{
                    padding: "0.85rem 1rem",
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <div>
                      <span
                        className="badge badge-warning"
                        style={{ marginRight: "0.5rem" }}
                      >
                        {rep.reason}
                      </span>
                      <span style={{ color: "#f8fafc", fontWeight: "bold" }}>
                        Reporter: {rep.reporterId}
                      </span>
                      <span style={{ color: "#94a3b8", margin: "0 0.4rem" }}>
                        ➔
                      </span>
                      <span style={{ color: "#ef4444", fontWeight: "bold" }}>
                        Reported User: {rep.reportedUserId}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        backgroundColor:
                          rep.status === "pending"
                            ? "#eab30830"
                            : rep.status === "actioned"
                              ? "#ef444430"
                              : "#64748b30",
                        color:
                          rep.status === "pending"
                            ? "#eab308"
                            : rep.status === "actioned"
                              ? "#ef4444"
                              : "#94a3b8",
                        fontWeight: "bold",
                      }}
                    >
                      {rep.status.toUpperCase()}{" "}
                      {rep.actionTaken !== "none" ? `(${rep.actionTaken})` : ""}
                    </span>
                  </div>

                  {rep.details && (
                    <p
                      style={{
                        color: "#cbd5e1",
                        margin: "0.4rem 0",
                        fontStyle: "italic",
                        fontSize: "0.8rem",
                      }}
                    >
                      "{rep.details}"
                    </p>
                  )}

                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
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
                        gap: "0.4rem",
                        marginTop: "0.75rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "dismiss")
                        }
                        style={{
                          background: "#475569",
                          fontSize: "0.75rem",
                          padding: "0.3rem 0.6rem",
                        }}
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "warn")
                        }
                        style={{
                          background: "#eab308",
                          color: "#0f172a",
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          padding: "0.3rem 0.6rem",
                        }}
                      >
                        Warn User
                      </button>
                      <button
                        onClick={() =>
                          handleReportAction(rep._id || rep.id, "suspend")
                        }
                        style={{
                          background: "#f97316",
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          padding: "0.3rem 0.6rem",
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
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          padding: "0.3rem 0.6rem",
                        }}
                      >
                        Ban Account
                      </button>
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
        <div className="card">
          <h4 style={{ margin: "0 0 1rem 0", color: "#f8fafc" }}>
            Pending Verification Requests ({verifications.length})
          </h4>

          {loading ? (
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Loading pending verifications...
            </p>
          ) : verifications.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.9rem",
                textAlign: "center",
                padding: "1.5rem 0",
              }}
            >
              🎉 No pending verification requests! All candidate submissions
              reviewed.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {verifications.map((u) => {
                const pv = u.platformVerification || {};
                return (
                  <div
                    key={u._id || u.id}
                    style={{
                      padding: "0.85rem 1rem",
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <h5
                          style={{
                            margin: 0,
                            color: "#f8fafc",
                            fontSize: "1rem",
                          }}
                        >
                          {u.name || u.email}
                        </h5>
                        <p
                          style={{
                            margin: "2px 0",
                            color: "#38bdf8",
                            textTransform: "capitalize",
                          }}
                        >
                          Role: {u.role || "Unset"} • Method:{" "}
                          {pv.method || "N/A"}
                        </p>
                        <p
                          style={{
                            margin: "2px 0",
                            color: "#94a3b8",
                            fontSize: "0.8rem",
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
                          style={{
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            padding: "0.3rem 0.6rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            textDecoration: "none",
                          }}
                        >
                          📄 View Uploaded ID
                        </a>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "0.75rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleVerificationAction(u.id || u._id, "approve")
                        }
                        style={{
                          background: "#22c55e",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                          padding: "0.35rem 0.75rem",
                        }}
                      >
                        ✓ Approve Verification
                      </button>
                      <button
                        onClick={() =>
                          handleVerificationAction(u.id || u._id, "reject")
                        }
                        style={{
                          background: "#ef4444",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                          padding: "0.35rem 0.75rem",
                        }}
                      >
                        ✕ Reject Verification
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
        <div className="card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
            Grant Admin Role to User
          </h4>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginBottom: "1rem",
            }}
          >
            Promote an existing account to <strong>role: "admin"</strong>. Only
            accessible by current admins.
          </p>

          <form
            onSubmit={handlePromoteAdmin}
            style={{ display: "flex", gap: "0.5rem", maxWidth: "500px" }}
          >
            <input
              type="text"
              placeholder="Enter user email or User ID..."
              value={promoteTarget}
              onChange={(e) => setPromoteTarget(e.target.value)}
              disabled={promoting}
              style={{
                flex: 1,
                padding: "0.6rem",
                borderRadius: "6px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#f8fafc",
                fontSize: "0.9rem",
              }}
            />
            <button
              type="submit"
              disabled={promoting || !promoteTarget.trim()}
              style={{
                background: "#4338ca",
                fontWeight: "bold",
                padding: "0.6rem 1rem",
              }}
            >
              {promoting ? "Promoting..." : "Promote to Admin 👑"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
