import { useState, useEffect } from "react";

export function MatchRequirementForm({ user, onFindMatches, onNavigateToProfile, loading }) {
  const [profileDoc, setProfileDoc] = useState(null);
  const [listingDoc, setListingDoc] = useState(null);
  const [fetching, setFetching] = useState(true);

  const isLandlord = user?.role === "landlord";

  useEffect(() => {
    setFetching(true);
    if (isLandlord) {
      fetch("/api/profile/landlord-listing")
        .then((res) => res.json())
        .then((data) => setListingDoc(data.listing || null))
        .catch(() => {})
        .finally(() => setFetching(false));
    } else {
      fetch("/api/profile/lifestyle")
        .then((res) => res.json())
        .then((data) => setProfileDoc(data.profile || null))
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user, isLandlord]);

  const handleTriggerMatch = (e) => {
    e.preventDefault();
    onFindMatches({});
  };

  if (fetching) {
    return (
      <div className="card" style={{ maxWidth: "680px", margin: "2rem auto", textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
        <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Checking saved profile criteria...</p>
      </div>
    );
  }

  const activeDoc = isLandlord ? listingDoc : profileDoc;

  if (!activeDoc) {
    return (
      <div className="card" style={{ textAlign: "left", maxWidth: "680px", margin: "1.5rem auto", borderRadius: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.75rem" }}>📋</span>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--accent-warm)" }}>
              Profile Setup Required
            </h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              One step away from finding your ideal living match
            </span>
          </div>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
          To calculate AI compatibility scores across habits, budget, and location, you must first complete your {isLandlord ? "Property Listing" : "Lifestyle Profile"}.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={onNavigateToProfile} className="pill-btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
            ✏️ Complete Your {isLandlord ? "Property Listing" : "Lifestyle Profile"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ textAlign: "left", maxWidth: "700px", margin: "1.5rem auto", borderRadius: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          ⚡ AI Match Engine
        </h3>
        <span className="badge badge-success">
          ✓ Profile Active & Ready
        </span>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0 0 1.25rem 0" }}>
        Compatibility is evaluated across budget alignment, geographic proximity, sleep schedule, cleanliness, and dietary choices.
      </p>

      {/* Saved Preferences Summary Card */}
      <div
        style={{
          background: "var(--bg-surface-subtle)",
          borderRadius: "16px",
          padding: "1.25rem",
          marginBottom: "1.5rem",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <span style={{ fontWeight: 700, color: "var(--accent-primary)", fontSize: "0.92rem", letterSpacing: "0.01em" }}>
            Active Search Criteria
          </span>
          <button
            onClick={onNavigateToProfile}
            className="pill-btn-ghost"
            style={{ fontSize: "0.78rem", padding: "0.3rem 0.75rem" }}
          >
            ✏️ Edit Criteria
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", fontSize: "0.85rem" }}>
          <div style={{ background: "var(--bg-surface)", padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Location</span>
            <strong style={{ color: "var(--text-primary)" }}>{activeDoc.city} {activeDoc.locality ? `• ${activeDoc.locality}` : ""}</strong>
          </div>

          <div style={{ background: "var(--bg-surface)", padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Budget Constraint</span>
            <strong style={{ color: "var(--text-primary)" }}>
              {activeDoc.rent !== undefined
                ? `₹${activeDoc.rent.toLocaleString()}/mo`
                : `₹${activeDoc.budgetMin?.toLocaleString()} – ₹${activeDoc.budgetMax?.toLocaleString()}/mo`}
            </strong>
          </div>

          <div style={{ background: "var(--bg-surface)", padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Room Preference</span>
            <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>
              {(activeDoc.preferredRoomType || activeDoc.roomType || "Any").replace("_", " ")}
            </strong>
          </div>

          <div style={{ background: "var(--bg-surface)", padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Gender Filter</span>
            <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>
              {(activeDoc.genderPreference || "No Preference").replace("_", " ")}
            </strong>
          </div>

          {!isLandlord && (
            <>
              <div style={{ background: "var(--bg-surface)", padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Cleanliness Standard</span>
                <strong style={{ color: "var(--text-primary)" }}>{activeDoc.cleanliness} / 5</strong>
              </div>

              <div style={{ background: "var(--bg-surface)", padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-subtle)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Sleep Routine</span>
                <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>
                  {(activeDoc.sleepSchedule || "Flexible").replace("_", " ")}
                </strong>
              </div>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleTriggerMatch}>
        <button
          type="submit"
          disabled={loading}
          className="pill-btn-primary"
          style={{ width: "100%", padding: "0.9rem", fontSize: "1.05rem", fontWeight: 700 }}
        >
          {loading ? "Calculating Compatibility Scores..." : "⚡ Find Top Compatible Matches"}
        </button>
      </form>
    </div>
  );
}

      