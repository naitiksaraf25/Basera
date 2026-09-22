export function AudienceChooser({ onSelectAudience, onSwitchToLogin }) {
  return (
    <div style={{ textAlign: "left" }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <h3
          style={{
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            margin: "0 0 0.4rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          How would you like to use Basera?
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Select the option that best describes you to personalize your journey
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.2rem" }}>
        {/* Card 1: Room Seeker */}
        <div
          onClick={() => onSelectAudience("seeker")}
          className="card"
          style={{
            cursor: "pointer",
            padding: "1.5rem",
            borderRadius: "20px",
            border: "1.5px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            transition: "all 0.2s ease",
            boxShadow: "var(--shadow-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-primary)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "var(--accent-primary-subtle)",
                color: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              🎓
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  I'm looking for a room or flatmate
                </h4>
                <span className="badge badge-primary" style={{ fontSize: "0.72rem" }}>
                  Students & Residents
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  margin: "0.4rem 0 0.85rem 0",
                  lineHeight: 1.45,
                }}
              >
                Find verified PGs, private flats, or match with compatible roommates using our 7-factor lifestyle compatibility engine.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  ✓ Zero Brokerage
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  ✓ University Verified
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  ✓ AI Compatibility Match
                </span>
              </div>
            </div>
          </div>
          <button
            className="pill-btn-primary"
            style={{
              width: "100%",
              marginTop: "1.25rem",
              padding: "0.65rem",
              fontSize: "0.9rem",
              fontWeight: 700,
            }}
          >
            Find a Room or Flatmate →
          </button>
        </div>

        {/* Card 2: Landlord / Property Lister */}
        <div
          onClick={() => onSelectAudience("landlord")}
          className="card"
          style={{
            cursor: "pointer",
            padding: "1.5rem",
            borderRadius: "20px",
            border: "1.5px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            transition: "all 0.2s ease",
            boxShadow: "var(--shadow-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-warm)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "var(--accent-warm-subtle)",
                color: "var(--accent-warm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              🏢
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  I have a room or property to list
                </h4>
                <span className="badge badge-warning" style={{ fontSize: "0.72rem" }}>
                  Hosts & Property Owners
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  margin: "0.4rem 0 0.85rem 0",
                  lineHeight: 1.45,
                }}
              >
                List PG beds or apartments directly to thousands of verified student tenants. Connect resident flatmates and fill rooms faster.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  ✓ Direct Student Inquiries
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  ✓ Background Screened Tenants
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  ✓ House Rule Enforcement
                </span>
              </div>
            </div>
          </div>
          <button
            className="pill-btn-primary"
            style={{
              width: "100%",
              marginTop: "1.25rem",
              padding: "0.65rem",
              fontSize: "0.9rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #f97316, #ea580c)",
            }}
          >
            List My Property →
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
        Already have a Basera account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="btn-link"
          style={{ fontWeight: 700, fontSize: "0.88rem" }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
