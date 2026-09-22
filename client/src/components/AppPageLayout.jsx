import { Link, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export function AppPageLayout({
  user,
  theme,
  toggleTheme,
  onSignOut,
  title,
  subtitle,
  children,
  health,
  onRefreshSession,
}) {
  const location = useLocation();
  const isVerified = user?.platformVerification?.status === "verified";

  const navItems = [
    {
      label: user?.role === "landlord" ? "Property Listing" : "Lifestyle Profile",
      icon: "👤",
      path: "/app/profile",
    },
    {
      label: "Find Matches",
      icon: "✨",
      path: "/app/matches",
      hidden: user?.role === "landlord", // Landlords manage listings
    },
    {
      label: "Active Chats",
      icon: "💬",
      path: "/app/chats",
    },
    {
      label: "Verification Status",
      icon: "🛡️",
      path: "/app/verification",
    },
  ];

  if (user?.role === "admin") {
    navItems.push({
      label: "Admin Console",
      icon: "👑",
      path: "/app/admin",
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-canvas)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 2px Gradient Bar */}
      <div
        className="gradient-accent-bar"
        style={{ position: "fixed", top: 0, left: 0, zIndex: 110 }}
      />

      {/* 1. Shared Consumer Navbar */}
      <Navbar
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        onSignOut={onSignOut}
        transparentOnTop={false}
      />

      {/* 2. Sub-Header with Breadcrumb & Quick App Navigation Tabs */}
      <div
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "1rem 1.5rem 0.75rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          {/* Top Breadcrumb & Page Meta */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  marginBottom: "0.35rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                ← Back to Basera Home
              </Link>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  style={{
                    margin: "0.2rem 0 0 0",
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Verification Status Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span className="badge badge-primary" style={{ fontSize: "0.78rem" }}>
                {user?.role === "landlord"
                  ? "🏢 Property Host"
                  : user?.role === "resident"
                  ? "🏠 Resident Flatmate"
                  : user?.role === "seeker"
                  ? "🎓 Student Seeker"
                  : "Member"}
              </span>
              {isVerified ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--accent-success)",
                    background: "var(--accent-success-subtle)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  ✓ Verified
                </span>
              ) : (
                <Link
                  to="/app/verification"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--accent-warm)",
                    background: "var(--accent-warm-subtle)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(249, 115, 22, 0.25)",
                    textDecoration: "none",
                  }}
                >
                  ⚠️ ID Verification Required
                </Link>
              )}
            </div>
          </div>

          {/* Quick Switch Nav Tabs */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.2rem",
            }}
          >
            {navItems
              .filter((item) => !item.hidden)
              .map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      padding: "0.45rem 0.95rem",
                      borderRadius: "9999px",
                      fontSize: "0.85rem",
                      fontWeight: isActive ? 700 : 600,
                      textDecoration: "none",
                      background: isActive ? "var(--accent-primary)" : "var(--bg-surface-subtle)",
                      color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                      border: `1px solid ${isActive ? "transparent" : "var(--border-subtle)"}`,
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                      boxShadow: isActive ? "0 2px 8px rgba(15, 82, 224, 0.25)" : "none",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </nav>
        </div>
      </div>

      {/* 3. Main Body Container */}
      <main
        style={{
          flex: 1,
          maxWidth: "1160px",
          width: "100%",
          margin: "0 auto",
          padding: "1.75rem 1.25rem 3rem 1.25rem",
        }}
      >
        {children}

        {/* 4. Diagnostics & Testing Disclosure (Collapsed by default) */}
        <details
          className="app-debug-details"
          style={{
            marginTop: "3rem",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
            padding: "0.85rem 1.25rem",
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              outline: "none",
            }}
          >
            🔍 System Diagnostic & Verification Data (Testing Mode)
          </summary>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "0.85rem",
              fontSize: "0.82rem",
            }}
          >
            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.74rem" }}>
                User ID
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>{user?.id}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.74rem" }}>
                Email Status
              </span>
              <span>{user?.emailVerified ? "✅ Verified" : "⚠️ Unverified"}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.74rem" }}>
                Platform Verification
              </span>
              <span>
                {user?.platformVerification?.status || "pending"} (Method:{" "}
                {user?.platformVerification?.method || "N/A"})
              </span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.74rem" }}>
                API & DB Status
              </span>
              <span>
                API: {health?.status || "connected"} | DB: {health?.mongodb || "connected"}
              </span>
            </div>
          </div>
          {onRefreshSession && (
            <button
              onClick={onRefreshSession}
              className="pill-btn-ghost"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.78rem",
                padding: "0.3rem 0.8rem",
                border: "1px solid var(--border-subtle)",
              }}
            >
              🔄 Refresh Session State
            </button>
          )}
        </details>
      </main>
    </div>
  );
}
