import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({
  user,
  isPending,
  onOpenLogin,
  requireRole = true,
  requireVerification = false,
  adminOnly = false,
  children,
}) {
  const location = useLocation();

  useEffect(() => {
    if (!isPending && !user && onOpenLogin) {
      onOpenLogin();
    }
  }, [isPending, user, onOpenLogin]);

  if (isPending) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          fontSize: "0.95rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid var(--border-subtle)",
              borderTopColor: "var(--accent-primary)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1rem auto",
            }}
          />
          Verifying session...
        </div>
      </div>
    );
  }

  // 1. Unauthenticated -> redirect to homepage with sign-in prompt
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2. First-login onboarding: if user has no role selected yet and not already on onboarding
  if (requireRole && !user.role && location.pathname !== "/app/onboarding") {
    return <Navigate to="/app/onboarding" replace />;
  }

  // 3. Verification guard: if unverified users hit matches or chats
  const isVerified = user.platformVerification?.status === "verified";
  if (requireVerification && !isVerified) {
    return <Navigate to="/app/verification?reason=unverified" replace />;
  }

  // 4. Admin only guard
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
