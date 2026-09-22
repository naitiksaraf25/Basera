import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSession, signOut } from "./lib/auth-client";
import { Homepage } from "./components/Homepage";
import { AllCitiesPage } from "./components/AllCitiesPage";
import { CityListingsPage } from "./components/CityListingsPage";
import { AppPageLayout } from "./components/AppPageLayout";
import { RequireAuth } from "./components/RequireAuth";
import { ProfilePage } from "./components/ProfilePage";
import { MatchesPage } from "./components/MatchesPage";
import { ChatsPage } from "./components/ChatsPage";
import { VerificationPage } from "./components/VerificationPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { Onboarding } from "./components/Onboarding";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ForgotPassword } from "./components/ForgotPassword";
import { EmailVerification } from "./components/EmailVerification";
import { AudienceChooser } from "./components/AudienceChooser";
import { BaseraLogo } from "./components/BaseraLogo";
import { WarningModal } from "./components/WarningModal";
import { ScrollToTop } from "./components/ScrollToTop";
import "./index.css";

export function App() {
  const { data: sessionData, isPending, refetch } = useSession();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("basera_theme") || "light";
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup' | 'verify' | 'forgot'
  const [chosenAudience, setChosenAudience] = useState(null); // 'seeker' | 'landlord' | null
  const [health, setHealth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("basera_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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

  const handleLogout = async () => {
    await signOut();
    await refetch();
    navigate("/");
  };

  const handleOpenAuth = (tab, roleHint) => {
    setActiveTab(tab);
    if (roleHint) {
      setChosenAudience(roleHint);
      try {
        localStorage.setItem("basera_intended_role", roleHint);
      } catch {}
    } else if (tab === "signup") {
      setChosenAudience(null);
    }
    setShowAuthModal(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Global Moderation Warning Modal (triggers on ANY route) */}
      <WarningModal
        user={user}
        warning={unacknowledgedWarning}
        onAcknowledged={() => refetch()}
      />

      {/* 2. Floating Auth Modal Dialog (Overlays current page context) */}
      {showAuthModal && !user && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(11, 15, 25, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.2rem",
            overflowY: "auto",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAuthModal(false);
          }}
        >
          <div
            className="auth-card"
            style={{
              position: "relative",
              maxWidth: "520px",
              width: "100%",
              margin: "auto",
              padding: "2.5rem 2rem",
              borderRadius: "28px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
              animation: "fadeInUp 0.25s ease",
            }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setShowAuthModal(false)}
              aria-label="Close dialog"
              style={{
                position: "absolute",
                top: "1.2rem",
                right: "1.2rem",
                width: "36px",
                height: "36px",
                borderRadius: "9999px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface-subtle)",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              ✕
            </button>

            {/* Basera Logo Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "1.6rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "var(--bg-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--border-subtle)",
                  marginBottom: "0.6rem",
                }}
              >
                <BaseraLogo size={28} />
              </div>
              <span
                style={{
                  fontSize: "1.45rem",
                  fontWeight: 800,
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
                marginBottom: "1.6rem",
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
                  background: activeTab === "login" ? "var(--bg-surface)" : "transparent",
                  color: activeTab === "login" ? "var(--accent-primary)" : "var(--text-secondary)",
                  boxShadow: activeTab === "login" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
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
                  background: activeTab === "signup" ? "var(--bg-surface)" : "transparent",
                  color: activeTab === "signup" ? "var(--accent-primary)" : "var(--text-secondary)",
                  boxShadow: activeTab === "signup" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
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
                  background: activeTab === "verify" ? "var(--bg-surface)" : "transparent",
                  color: activeTab === "verify" ? "var(--accent-primary)" : "var(--text-secondary)",
                  boxShadow: activeTab === "verify" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setActiveTab("verify")}
              >
                Verify Token
              </button>
            </div>

            {activeTab === "login" && (
              <Login
                onLoginSuccess={() => {
                  refetch();
                  setShowAuthModal(false);
                }}
                onToggleForgotPassword={() => setActiveTab("forgot")}
              />
            )}

            {activeTab === "signup" && (
              !chosenAudience ? (
                <AudienceChooser
                  onSelectAudience={(aud) => {
                    setChosenAudience(aud);
                    try {
                      localStorage.setItem("basera_intended_role", aud);
                    } catch {}
                  }}
                  onSwitchToLogin={() => setActiveTab("login")}
                />
              ) : (
                <Signup
                  audience={chosenAudience}
                  onChangeAudience={() => setChosenAudience(null)}
                  onSignupSuccess={() => setActiveTab("login")}
                />
              )
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
      )}

      {/* 3. React Router Application Routes */}
      <ScrollToTop />
      <Routes>
        {/* Public Discovery Routes (Directly accessible to both guests & logged-in users) */}
        <Route
          path="/"
          element={
            <Homepage
              user={user}
              onOpenAuth={handleOpenAuth}
              theme={theme}
              toggleTheme={toggleTheme}
              onSignOut={handleLogout}
            />
          }
        />
        <Route
          path="/cities"
          element={
            <AllCitiesPage
              user={user}
              onOpenAuth={handleOpenAuth}
              theme={theme}
              toggleTheme={toggleTheme}
              onSignOut={handleLogout}
            />
          }
        />
        <Route
          path="/rooms/:citySlug"
          element={
            <CityListingsPage
              user={user}
              onOpenAuth={handleOpenAuth}
              theme={theme}
              toggleTheme={toggleTheme}
              onSignOut={handleLogout}
            />
          }
        />

        {/* Authenticated Consumer Routes (with Route Guards) */}
        <Route
          path="/app/onboarding"
          element={
            <RequireAuth
              user={user}
              isPending={isPending}
              onOpenLogin={() => handleOpenAuth("login")}
              requireRole={false}
            >
              <AppPageLayout
                user={user}
                theme={theme}
                toggleTheme={toggleTheme}
                onSignOut={handleLogout}
                title="Welcome to Basera"
                subtitle="Select your role to personalize your experience"
                health={health}
                onRefreshSession={() => refetch()}
              >
                <Onboarding
                  user={user}
                  onUserUpdated={() => {
                    refetch();
                    navigate("/app/profile");
                  }}
                />
              </AppPageLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/profile"
          element={
            <RequireAuth
              user={user}
              isPending={isPending}
              onOpenLogin={() => handleOpenAuth("login")}
            >
              <AppPageLayout
                user={user}
                theme={theme}
                toggleTheme={toggleTheme}
                onSignOut={handleLogout}
                title={user?.role === "landlord" ? "Property Listing & Host Portal" : "My Lifestyle Profile"}
                subtitle={
                  user?.role === "landlord"
                    ? "Manage your student accommodations, pricing, house rules, and resident listings"
                    : "Tune your habits, sleep schedule, and chores to get matched with compatible flatmates"
                }
                health={health}
                onRefreshSession={() => refetch()}
              >
                <ProfilePage user={user} onProfileSaved={() => refetch()} />
              </AppPageLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/matches"
          element={
            <RequireAuth
              user={user}
              isPending={isPending}
              onOpenLogin={() => handleOpenAuth("login")}
              requireVerification={true}
            >
              <AppPageLayout
                user={user}
                theme={theme}
                toggleTheme={toggleTheme}
                onSignOut={handleLogout}
                title="Find Roommate Matches"
                subtitle="Evaluate compatibility across 7 key lifestyle factors"
                health={health}
                onRefreshSession={() => refetch()}
              >
                <MatchesPage user={user} isVerified={isVerified} />
              </AppPageLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/chats"
          element={
            <RequireAuth
              user={user}
              isPending={isPending}
              onOpenLogin={() => handleOpenAuth("login")}
              requireVerification={true}
            >
              <AppPageLayout
                user={user}
                theme={theme}
                toggleTheme={toggleTheme}
                onSignOut={handleLogout}
                title="Active Conversations"
                subtitle="Direct real-time messaging with your compatible roommates and verified hosts"
                health={health}
                onRefreshSession={() => refetch()}
              >
                <ChatsPage user={user} />
              </AppPageLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/verification"
          element={
            <RequireAuth
              user={user}
              isPending={isPending}
              onOpenLogin={() => handleOpenAuth("login")}
              requireRole={false}
            >
              <AppPageLayout
                user={user}
                theme={theme}
                toggleTheme={toggleTheme}
                onSignOut={handleLogout}
                title="Identity & Platform Verification"
                subtitle="Verify your college email or government ID for verified badge and unlocking AI matching"
                health={health}
                onRefreshSession={() => refetch()}
              >
                <VerificationPage user={user} onUserUpdated={() => refetch()} />
              </AppPageLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/admin"
          element={
            <RequireAuth
              user={user}
              isPending={isPending}
              onOpenLogin={() => handleOpenAuth("login")}
              adminOnly={true}
            >
              <AppPageLayout
                user={user}
                theme={theme}
                toggleTheme={toggleTheme}
                onSignOut={handleLogout}
                title="Basera Admin Console"
                subtitle="Platform moderation, user verification queue, and safety controls"
                health={health}
                onRefreshSession={() => refetch()}
              >
                <AdminDashboard />
              </AppPageLayout>
            </RequireAuth>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
