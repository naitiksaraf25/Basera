import { useState, useEffect } from "react";
import { useSession, signOut } from "./lib/auth-client";
import { Homepage } from "./components/Homepage";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ForgotPassword } from "./components/ForgotPassword";
import { EmailVerification } from "./components/EmailVerification";
import { Onboarding } from "./components/Onboarding";
import { LifestyleProfileForm } from "./components/LifestyleProfileForm";
import { LandlordListingForm } from "./components/LandlordListingForm";
import { MatchRequirementForm } from "./components/MatchRequirementForm";
import { MatchResultsView } from "./components/MatchResultsView";
import { ChatView } from "./components/ChatView";
import { AdminDashboard } from "./components/AdminDashboard";
import { WarningModal } from "./components/WarningModal";
import { Routes, Route, Navigate } from "react-router-dom";
import { CityListingsPage } from "./components/CityListingsPage";
import "./index.css";

export function App() {
  const { data: sessionData, isPending, refetch } = useSession();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("basera_theme") || "light";
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup' | 'verify' | 'forgot'
  const [activeView, setActiveView] = useState("profile"); // 'profile' | 'onboarding' | 'matching' | 'chat'
  const [selectedChatTarget, setSelectedChatTarget] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("basera_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [matchState, setMatchState] = useState({
    matchRequest: null,
    isCached: false,
    loading: false,
    error: null,
    viewMode: "form", // 'form' | 'results'
  });

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => {});
  }, []);

  const user = sessionData?.user;
  const isVerified = user?.platformVerification?.status === "verified";
  const unacknowledgedWarning = Array.isArray(user?.warnings)
    ? user.warnings.find((w) => w.acknowledged === false)
    : null;

  // Fetch latest match request if switching to matching view
  useEffect(() => {
    if (
      user &&
      isVerified &&
      activeView === "matching" &&
      !matchState.matchRequest
    ) {
      fetch("/api/match/history/latest")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.matchRequest) {
            setMatchState((prev) => ({
              ...prev,
              matchRequest: data.matchRequest,
              isCached: true,
              viewMode: "results",
            }));
          }
        })
        .catch(() => {});
    }
  }, [user, isVerified, activeView]);

  const handleLogout = async () => {
    await signOut();
    refetch();
  };

  const handleFindMatches = async (
    { requesterType, criteria },
    forceRecompute = false,
  ) => {
    setMatchState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch(
        `/api/match/request${forceRecompute ? "?recompute=true" : ""}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requesterType, criteria, forceRecompute }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to calculate matches",
        );
      }

      setMatchState({
        matchRequest: data.matchRequest,
        isCached: Boolean(data.isCached),
        loading: false,
        error: null,
        viewMode: "results",
      });
    } catch (err) {
      setMatchState((prev) => ({
        ...prev,
        loading: false,
        error: err.message,
      }));
    }
  };

  // Default routing for unauthenticated visitors
  if (!user && !showAuthModal) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              onOpenAuth={(tab) => {
                setActiveTab(tab);
                setShowAuthModal(true);
              }}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/rooms/:citySlug"
          element={
            <CityListingsPage
              onOpenAuth={(tab) => {
                setActiveTab(tab);
                setShowAuthModal(true);
              }}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Auth screen view with return to Homepage button
  if (!user && !isPending && showAuthModal) {
    return (
      <div
        style={{
          maxWidth: "520px",
          margin: "2rem auto",
          padding: "1.5rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setShowAuthModal(false)}
            className="pill-btn-secondary"
            style={{ fontSize: "0.85rem", padding: "0.45rem 1.1rem" }}
          >
            ← Back to Homepage
          </button>
        </div>

        <div
          className="auth-card"
          style={{ padding: "2.5rem 2rem", borderRadius: "28px" }}
        >
          {/* Basera Logo Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1.8rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "9999px",
                background: "var(--gradient-horizon)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(15, 82, 224, 0.15)",
                border: "1px solid var(--border-subtle)",
                marginBottom: "0.6rem",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "1.45rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              Basera
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginTop: "2px",
              }}
            >
              Student Living • A place to settle
            </span>
          </div>

          {/* Segmented Pill Tabs */}
          <div
            style={{
              display: "flex",
              background: "var(--bg-surface-subtle)",
              padding: "4px",
              borderRadius: "9999px",
              border: "1px solid var(--border-subtle)",
              marginBottom: "1.8rem",
            }}
          >
            <button
              style={{
                flex: 1,
                padding: "0.55rem 0.8rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                background:
                  activeTab === "login" ? "var(--bg-surface)" : "transparent",
                color:
                  activeTab === "login"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                boxShadow:
                  activeTab === "login" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              style={{
                flex: 1,
                padding: "0.55rem 0.8rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                background:
                  activeTab === "signup" ? "var(--bg-surface)" : "transparent",
                color:
                  activeTab === "signup"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                boxShadow:
                  activeTab === "signup"
                    ? "0 2px 8px rgba(0,0,0,0.06)"
                    : "none",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveTab("signup")}
            >
              Create Account
            </button>
            <button
              style={{
                flex: 1,
                padding: "0.55rem 0.8rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                background:
                  activeTab === "verify" ? "var(--bg-surface)" : "transparent",
                color:
                  activeTab === "verify"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                boxShadow:
                  activeTab === "verify"
                    ? "0 2px 8px rgba(0,0,0,0.06)"
                    : "none",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveTab("verify")}
            >
              Verify Token
            </button>
          </div>

          {activeTab === "login" && (
            <Login
              onLoginSuccess={() => refetch()}
              onToggleForgotPassword={() => setActiveTab("forgot")}
            />
          )}

          {activeTab === "signup" && (
            <Signup onSignupSuccess={() => setActiveTab("login")} />
          )}

          {activeTab === "verify" && (
            <EmailVerification
              onVerificationComplete={() => setActiveTab("login")}
            />
          )}

          {activeTab === "forgot" && (
            <ForgotPassword onBackToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "1.5rem",
        width: "100%",
      }}
    >
      {/* Top bar for authenticated session */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Basera
          </span>
          <span className="badge badge-success" style={{ fontSize: "0.75rem" }}>
            App Session
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setShowAuthModal(false)}
            className="pill-btn-secondary"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.9rem" }}
          >
            Preview Homepage
          </button>
          <button
            onClick={toggleTheme}
            className="pill-btn-ghost"
            style={{
              width: "36px",
              height: "36px",
              padding: 0,
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-surface-subtle)",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Backend & DB Status Ribbon */}
      {health && (
        <div
          style={{
            marginBottom: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          Server Status:{" "}
          <span className="badge badge-success">{health.status}</span> |
          MongoDB:{" "}
          <span
            className={`badge ${health.mongodb === "connected" ? "badge-success" : "badge-warning"}`}
          >
            {health.mongodb}
          </span>
        </div>
      )}

      {isPending ? (
        <div className="card">Loading session state...</div>
      ) : user ? (
        /* Authenticated View */
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Welcome, {user.name || user.email}!</h2>
            <button onClick={handleLogout} style={{ background: "#ef4444" }}>
              Log Out
            </button>
          </div>

          <div
            className="status-notice"
            style={{ textAlign: "left", margin: "1rem 0" }}
          >
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}{" "}
              {user.emailVerified ? "✅ Verified" : "⚠️ Unverified"}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span style={{ color: user.role ? "#a5b4fc" : "#f59e0b" }}>
                {user.role
                  ? user.role.toUpperCase()
                  : "UNSET (Onboarding Required)"}
              </span>
            </p>
            <p>
              <strong>Account Status:</strong> {user.accountStatus || "active"}
            </p>
            <p>
              <strong>Platform Verification:</strong>{" "}
              {user.platformVerification?.status || "pending"} (Method:{" "}
              {user.platformVerification?.method || "N/A"})
            </p>
          </div>

          {/* Onboarding vs Profile vs Matching View Routing */}
          {!user.role ? (
            <Onboarding user={user} onUserUpdated={() => refetch()} />
          ) : (
            <div>
              <div
                className="tab-bar"
                style={{ justifyContent: "center", marginBottom: "1rem" }}
              >
                <button
                  className={activeView === "profile" ? "active" : ""}
                  onClick={() => setActiveView("profile")}
                >
                  {user.role === "landlord"
                    ? "Property Listing Form"
                    : "Lifestyle Profile Form"}
                </button>
                <button
                  className={activeView === "matching" ? "active" : ""}
                  onClick={() => setActiveView("matching")}
                >
                  ⚡ Find Top Matches
                </button>
                <button
                  className={activeView === "chat" ? "active" : ""}
                  onClick={() => setActiveView("chat")}
                >
                  💬 Active Chats
                </button>
                <button
                  className={activeView === "onboarding" ? "active" : ""}
                  onClick={() => setActiveView("onboarding")}
                >
                  Verification Status
                </button>
                {user.role === "admin" && (
                  <button
                    className={activeView === "admin" ? "active" : ""}
                    onClick={() => setActiveView("admin")}
                    style={{
                      background: "#4338ca",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    🛡️ Admin Dashboard
                  </button>
                )}
              </div>

              {activeView === "onboarding" && (
                <Onboarding user={user} onUserUpdated={() => refetch()} />
              )}

              {activeView === "profile" && (
                <div>
                  {(user.role === "seeker" || user.role === "resident") && (
                    <LifestyleProfileForm
                      user={user}
                      onProfileSaved={() => refetch()}
                    />
                  )}

                  {user.role === "landlord" && (
                    <LandlordListingForm
                      user={user}
                      onListingSaved={() => refetch()}
                    />
                  )}
                </div>
              )}

              {activeView === "matching" && (
                <div>
                  {!isVerified ? (
                    <div
                      className="error-alert"
                      style={{ textAlign: "left", margin: "1rem 0" }}
                    >
                      <h4>🔒 Platform Verification Required</h4>
                      <p>
                        Matching is restricted to platform-verified users per
                        PRD §5.3 & §7.
                      </p>
                      <p style={{ marginTop: "0.5rem" }}>
                        Your verification status is{" "}
                        <strong>
                          {user.platformVerification?.status || "unverified"}
                        </strong>
                        . Please switch to the{" "}
                        <strong>Verification Status</strong> tab to verify your
                        email/ID and unlock AI matching.
                      </p>
                    </div>
                  ) : (
                    <div>
                      {matchState.error && (
                        <div
                          className="error-alert"
                          style={{ textAlign: "left", marginBottom: "1rem" }}
                        >
                          {matchState.error}
                        </div>
                      )}

                      {matchState.viewMode === "form" ? (
                        <MatchRequirementForm
                          user={user}
                          loading={matchState.loading}
                          onFindMatches={handleFindMatches}
                          onNavigateToProfile={() => setActiveView("profile")}
                        />
                      ) : (
                        <MatchResultsView
                          matchRequest={matchState.matchRequest}
                          isCached={matchState.isCached}
                          onRecompute={(force) => {
                            if (matchState.matchRequest?.criteria) {
                              handleFindMatches(
                                {
                                  requesterType:
                                    matchState.matchRequest.requesterType,
                                  criteria: matchState.matchRequest.criteria,
                                },
                                force,
                              );
                            } else {
                              setMatchState((prev) => ({
                                ...prev,
                                viewMode: "form",
                              }));
                            }
                          }}
                          onBackToForm={() =>
                            setMatchState((prev) => ({
                              ...prev,
                              viewMode: "form",
                            }))
                          }
                          onOpenChat={(targetId) => {
                            setSelectedChatTarget(targetId);
                            setActiveView("chat");
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeView === "chat" && (
                <div>
                  {!isVerified ? (
                    <div
                      className="error-alert"
                      style={{ textAlign: "left", margin: "1rem 0" }}
                    >
                      <h4>🔒 Platform Verification Required</h4>
                      <p>
                        Chat functionality is restricted to platform-verified
                        users per PRD §5.4 & §7.
                      </p>
                      <p style={{ marginTop: "0.5rem" }}>
                        Your verification status is{" "}
                        <strong>
                          {user.platformVerification?.status || "unverified"}
                        </strong>
                        . Please switch to the{" "}
                        <strong>Verification Status</strong> tab to verify your
                        email/ID and unlock in-app messaging.
                      </p>
                    </div>
                  ) : (
                    <ChatView
                      user={user}
                      initialChatId={selectedChatTarget}
                      onBackToMatching={() => setActiveView("matching")}
                    />
                  )}
                </div>
              )}

              {activeView === "admin" && user.role === "admin" && (
                <AdminDashboard user={user} />
              )}
            </div>
          )}

          <div
            style={{
              margin: "1.5rem 0",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button onClick={() => refetch()}>Refresh Session</button>
          </div>

          {unacknowledgedWarning && (
            <WarningModal
              warning={unacknowledgedWarning}
              onAcknowledged={() => refetch()}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
