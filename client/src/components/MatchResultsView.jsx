import { useState, useEffect } from "react";
import { ReportModal } from "./ReportModal";

export function MatchResultsView({ matchRequest, isCached, onRecompute, onBackToForm, onOpenChat }) {
  const [expandedBreakdown, setExpandedBreakdown] = useState({});
  const [interestStates, setInterestStates] = useState({}); // { candidateId: { status: 'none'|'pending'|'matched', isMutualMatch: bool } }
  const [loadingInterest, setLoadingInterest] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [reportingCandidate, setReportingCandidate] = useState(null); // { id, name }

  const results = matchRequest?.results || [];
  const eligibleCount = matchRequest?.totalEligibleCount ?? results.length;
  const explanatoryMessage = matchRequest?.message || matchRequest?.explanatoryMessage || "";

  const toggleBreakdown = (index) => {
    setExpandedBreakdown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#38bdf8";
    if (score >= 40) return "#eab308";
    return "#f97316";
  };

  // Fetch interest status for each displayed candidate on load
  useEffect(() => {
    if (!Array.isArray(results) || results.length === 0) return;

    results.forEach((res) => {
      const candidateId = res.candidateId;
      if (!candidateId) return;

      fetch(`/api/interest/status/${candidateId}`)
        .then((res) => res.json())
        .then((data) => {
          setInterestStates((prev) => ({
            ...prev,
            [candidateId]: {
              status: data.status || "none",
              isMutualMatch: Boolean(data.isMutualMatch),
            },
          }));
        })
        .catch(() => {});
    });
  }, [matchRequest]);

  const handleExpressInterest = async (candidateId) => {
    setLoadingInterest((prev) => ({ ...prev, [candidateId]: true }));
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: candidateId }),
      });
      const data = await response.json();

      if (response.ok) {
        setInterestStates((prev) => ({
          ...prev,
          [candidateId]: {
            status: data.status || "pending",
            isMutualMatch: Boolean(data.isMutualMatch),
          },
        }));

        if (data.isMutualMatch) {
          setToastMessage(data.message || "🎉 It's a Mutual Match!");
        }
      } else {
        alert(data.message || "Could not express interest.");
      }
    } catch (err) {
      console.error("Express Interest Error:", err);
    } finally {
      setLoadingInterest((prev) => ({ ...prev, [candidateId]: false }));
    }
  };

  const getConfidenceBadgeColor = (label) => {
    if (label === "High") return "badge-success";
    if (label === "Medium") return "badge-warning";
    return "badge-warning";
  };

  const formatFactorName = (key) => {
    const map = {
      cleanliness: "Cleanliness",
      sleepSchedule: "Sleep Schedule",
      smokingDrinking: "Smoking / Drinking",
      foodPreference: "Food Preference",
      guestsFrequency: "Guests Frequency",
      cityProximity: "City & Locality Proximity",
      budgetCloseness: "Budget Closeness",
      linkedTenantsAverage: "Linked Tenants Avg",
    };
    return map[key] || key;
  };

  return (
    <div style={{ maxWidth: "750px", margin: "1rem auto", textAlign: "left" }}>
      {/* Toast Banner Notification for Mutual Match */}
      {toastMessage && (
        <div
          style={{
            backgroundColor: "#22c55e",
            color: "#0f172a",
            padding: "0.85rem 1.25rem",
            borderRadius: "8px",
            fontWeight: "bold",
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
          }}
        >
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{ background: "transparent", border: "none", color: "#0f172a", fontWeight: "bold", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navigation & Status Bar */}
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          padding: "1rem 1.25rem",
          borderRadius: "16px",
        }}
      >
        <div>
          <button onClick={onBackToForm} className="pill-btn-secondary" style={{ fontSize: "0.85rem", padding: "0.45rem 0.95rem" }}>
            ← Modify Search Filters
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {isCached ? (
            <span className="badge badge-warning">
              ⚡ 24h Cached
            </span>
          ) : (
            <span className="badge badge-success">
              ✓ Fresh Computation
            </span>
          )}
          <button
            onClick={() => onRecompute(true)}
            className="pill-btn-primary"
            style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}
          >
            🔄 Recompute
          </button>
        </div>
      </div>

      {/* Explanatory Banner for Fewer Than 3 Results */}
      {(eligibleCount < 3 || results.length < 3) && (
        <div
          className="status-notice"
          style={{
            background: "var(--bg-surface)",
            borderLeft: "4px solid var(--accent-primary)",
            margin: "0 0 1.25rem 0",
            padding: "1rem 1.25rem",
            borderRadius: "14px",
          }}
        >
          <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.25rem", fontSize: "0.92rem" }}>
            ℹ️ Candidate Pool Availability Note
          </div>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            {explanatoryMessage || `Found ${results.length} eligible match(es) in launch city.`}
          </p>
          <p style={{ margin: "0.35rem 0 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            We only match against active, platform-verified student profiles. As new students join in your area, compatible matches will expand automatically.
          </p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
          Top Match Candidates ({results.length})
        </h3>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Ranked by lifestyle compatibility algorithm</span>
      </div>

      {/* Match Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {results.map((res, index) => {
          const snapshot = res.candidateSnapshot || {};
          const factorCoverage = res.factorCoverage || {};
          const score = res.score ?? 0;
          const isExpanded = expandedBreakdown[index];

          const photo = snapshot.photoUrl || (snapshot.photoUrls && snapshot.photoUrls[0]);

          return (
            <div
              key={res.candidateId || index}
              className="card"
              style={{
                border: index === 0 ? "2px solid var(--accent-success)" : "1px solid var(--border-subtle)",
                borderRadius: "20px",
                position: "relative",
                padding: "1.5rem",
                boxShadow: index === 0 ? "0 8px 30px rgba(16, 185, 129, 0.12)" : "var(--shadow-sm)",
              }}
            >
              {/* Rank Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "20px",
                  background: index === 0 ? "linear-gradient(135deg, #10b981, #059669)" : "var(--bg-surface-elevated)",
                  color: index === 0 ? "#ffffff" : "var(--text-secondary)",
                  border: index === 0 ? "none" : "1px solid var(--border-subtle)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  padding: "3px 12px",
                  borderRadius: "9999px",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {index === 0 ? "🏆 Top #1 Match" : `#${index + 1} Candidate`}
              </div>

              {/* Card Header & Main Score */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.35rem",
                  gap: "1rem",
                }}
              >
                {/* Profile Photo & Candidate Basic Info */}
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  {photo ? (
                    <img
                      src={photo}
                      alt={snapshot.name || "Candidate"}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "18px",
                        objectFit: "cover",
                        border: "2px solid var(--accent-primary)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "18px",
                        background: "var(--bg-surface-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        color: "var(--accent-primary)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {(snapshot.name || snapshot.landlordName || "B").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h4 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {snapshot.title || snapshot.name || snapshot.landlordName || "Verified Basera User"}
                    </h4>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      <span style={{ textTransform: "capitalize" }}>
                        {snapshot.candidateType === "landlordListing"
                          ? `Landlord Accommodation (${snapshot.roomType?.replace("_", " ") || "property"})`
                          : `${snapshot.role || "Seeker"} • ${snapshot.gender || "Any"}`}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "2px" }}>
                      📍 {snapshot.locality ? `${snapshot.locality}, ` : ""}{snapshot.city}
                    </div>
                  </div>
                </div>

                {/* Score Badge */}
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "1.85rem",
                      fontWeight: 800,
                      color: getScoreColor(score),
                      lineHeight: "1",
                    }}
                  >
                    {score}%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "4px" }}>
                    Compatibility
                  </div>
                </div>
              </div>

              {/* FACTOR COVERAGE METADATA DISPLAY */}
              <div
                style={{
                  margin: "1rem 0",
                  padding: "0.7rem 1rem",
                  background: "var(--bg-surface-subtle)",
                  borderRadius: "12px",
                  borderLeft: `4px solid ${getScoreColor(score)}`,
                  fontSize: "0.85rem",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                  {score}% Match • Evaluated across {factorCoverage.evaluatedFactorsCount || 0} of {factorCoverage.totalFactorsCount || 7} lifestyle variables ({factorCoverage.confidenceLabel || "Medium"} Confidence)
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Coverage: {factorCoverage.coveragePercentage || 0}% • Applicable Points: {factorCoverage.maxApplicablePoints || 0} / 100
                </div>
              </div>

              {/* Quick Details Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.6rem",
                  fontSize: "0.85rem",
                  margin: "0.85rem 0",
                }}
              >
                <div style={{ background: "var(--bg-surface-subtle)", padding: "0.5rem 0.75rem", borderRadius: "10px" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Rent / Budget</span>
                  <strong style={{ color: "var(--text-primary)" }}>
                    {snapshot.rent !== undefined
                      ? `₹${snapshot.rent.toLocaleString()}/mo`
                      : snapshot.budgetMin !== undefined
                      ? `₹${snapshot.budgetMin.toLocaleString()} – ₹${snapshot.budgetMax?.toLocaleString()}/mo`
                      : "Flexible"}
                  </strong>
                </div>
                <div style={{ background: "var(--bg-surface-subtle)", padding: "0.5rem 0.75rem", borderRadius: "10px" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Sleep / Curfew</span>
                  <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>
                    {snapshot.sleepSchedule
                      ? snapshot.sleepSchedule.replace("_", " ")
                      : snapshot.houseRules?.curfew
                      ? snapshot.houseRules.curfew.replace("_", " ")
                      : "Flexible"}
                  </strong>
                </div>
                <div style={{ background: "var(--bg-surface-subtle)", padding: "0.5rem 0.75rem", borderRadius: "10px" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Habits / House Rules</span>
                  <strong style={{ color: "var(--text-primary)" }}>
                    {snapshot.smokingDrinking
                      ? snapshot.smokingDrinking
                      : snapshot.houseRules
                      ? `Smoking: ${snapshot.houseRules.smokingAllowed ? "Yes" : "No"}, Alcohol: ${snapshot.houseRules.drinkingAllowed ? "Yes" : "No"}`
                      : "Standard"}
                  </strong>
                </div>
                <div style={{ background: "var(--bg-surface-subtle)", padding: "0.5rem 0.75rem", borderRadius: "10px" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Food / Guests</span>
                  <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>
                    {snapshot.foodPreference || snapshot.houseRules?.guestPolicy || "Flexible"}
                  </strong>
                </div>
              </div>

              {/* Bio or House Rules summary */}
              {snapshot.bio && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    margin: "0.6rem 0 0.85rem 0",
                    background: "var(--bg-surface-subtle)",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "10px",
                  }}
                >
                  "{snapshot.bio}"
                </p>
              )}

              {/* Privacy Notice & Express Interest Action */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  margin: "0.85rem 0",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span>🔒</span>
                  <span>Contact info stays private until mutual match is confirmed.</span>
                </div>

                {/* EXPRESS INTEREST BUTTON & OPEN CHAT */}
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {interestStates[res.candidateId]?.isMutualMatch ? (
                    <>
                      <span className="badge badge-success" style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}>
                        🎉 Mutual Match!
                      </span>
                      {onOpenChat && (
                        <button
                          onClick={() => onOpenChat(res.candidateId)}
                          className="pill-btn-primary"
                          style={{ fontSize: "0.85rem", padding: "0.45rem 0.95rem" }}
                        >
                          💬 Open Chat
                        </button>
                      )}
                    </>
                  ) : interestStates[res.candidateId]?.status === "pending" ? (
                    <button disabled className="pill-btn-secondary" style={{ cursor: "default", opacity: 0.85, fontSize: "0.85rem" }}>
                      ⏳ Interest Sent
                    </button>
                  ) : (
                    <button
                      onClick={() => handleExpressInterest(res.candidateId)}
                      disabled={loadingInterest[res.candidateId]}
                      className="pill-btn-primary"
                      style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", fontSize: "0.85rem", padding: "0.45rem 1rem" }}
                    >
                      {loadingInterest[res.candidateId] ? "Connecting..." : "👋 Say Hello"}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setReportingCandidate({
                        id: res.candidateId || snapshot.userId || snapshot.landlordId || snapshot.id,
                        name: snapshot.title || snapshot.name || snapshot.landlordName || "Candidate",
                      })
                    }
                    className="pill-btn-ghost"
                    style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem", color: "var(--text-muted)" }}
                    title="Report candidate"
                  >
                    🚨 Report
                  </button>
                </div>
              </div>

              {/* Toggle Breakdown Button */}
              <button
                onClick={() => toggleBreakdown(index)}
                className="pill-btn-ghost"
                style={{
                  width: "100%",
                  fontSize: "0.8rem",
                  padding: "0.45rem",
                  marginTop: "0.25rem",
                  border: "1px dashed var(--border-subtle)",
                  borderRadius: "10px",
                }}
              >
                {isExpanded ? "▲ Hide Factor Breakdown" : "▼ View Detailed Factor Breakdown"}
              </button>

              {/* Expanded Factor Breakdown */}
              {isExpanded && res.breakdown && (
                <div
                  style={{
                    marginTop: "0.75rem",
                    padding: "0.85rem",
                    background: "var(--bg-surface-subtle)",
                    borderRadius: "12px",
                    fontSize: "0.82rem",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.6rem" }}>
                    Sub-Factor Score Breakdown
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.4rem" }}>
                    {Object.entries(res.breakdown).map(([factorKey, pointsEarned]) => (
                      <div
                        key={factorKey}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.35rem 0.65rem",
                          background: "var(--bg-surface)",
                          borderRadius: "8px",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <span style={{ color: "var(--text-secondary)" }}>{formatFactorName(factorKey)}:</span>
                        <span style={{ fontWeight: 700, color: pointsEarned > 0 ? "var(--accent-success)" : "#ef4444" }}>
                          +{pointsEarned} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Report User Modal */}
      {reportingCandidate && (
        <ReportModal
          reportedUserId={reportingCandidate.id || reportingCandidate.userId || reportingCandidate.candidateId}
          reportedUserName={reportingCandidate.name}
          onClose={() => setReportingCandidate(null)}
          onReportSubmitted={() => {
            setToastMessage("Report submitted successfully to platform moderators.");
          }}
        />
      )}
    </div>
  );
}
