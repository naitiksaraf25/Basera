import { useSearchParams } from "react-router-dom";
import { Onboarding } from "./Onboarding";

export function VerificationPage({ user, onUserUpdated }) {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");
  const isVerified = user?.platformVerification?.status === "verified";

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto" }}>
      {reason === "unverified" && !isVerified && (
        <div
          style={{
            background: "var(--accent-warm-subtle)",
            border: "1.5px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "16px",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.85rem",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: "1.4rem" }}>🔒</div>
          <div>
            <h4
              style={{
                margin: "0 0 0.25rem 0",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--accent-warm)",
              }}
            >
              Complete verification to see matches
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                lineHeight: 1.45,
              }}
            >
              Roommate matching and direct messaging are restricted to verified university students and registered hosts per community trust guidelines. Please verify your student email or submit government ID below.
            </p>
          </div>
        </div>
      )}

      {/* Renders verification steps */}
      <Onboarding user={user} onUserUpdated={onUserUpdated} />
    </div>
  );
}
