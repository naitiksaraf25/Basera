import { useState } from "react";

export function Onboarding({ user, onUserUpdated }) {
  const [selectedRole, setSelectedRole] = useState(() => {
    try {
      const intended = localStorage.getItem("basera_intended_role");
      if (intended === "landlord" || intended === "seeker" || intended === "resident") {
        return intended;
      }
    } catch {}
    return "";
  });
  const [collegeEmail, setCollegeEmail] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const handleRoleSubmit = async (roleToSet) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: roleToSet }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to set role");
      }
      if (onUserUpdated) onUserUpdated(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/verification/college-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit college email");
      }
      setNotice(data.message + " (Token: " + data.token + ")");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIdUploadSubmit = async (e) => {
    e.preventDefault();
    if (!idFile) {
      setError("Please select a file to upload.");
      return;
    }
    setLoading(true);
    setError(null);
    setNotice(null);

    const formData = new FormData();
    formData.append("governmentId", idFile);

    try {
      const res = await fetch("/api/verification/landlord-id", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to upload ID document");
      }
      setNotice(data.message);
      if (onUserUpdated) onUserUpdated(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 1: ROLE SELECTION (if role is unset)
  if (!user.role) {
    return (
      <div className="card" style={{ maxWidth: "680px", margin: "1.5rem auto", borderRadius: "24px" }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Welcome to Basera! 👋
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginTop: "0.4rem" }}>
            Choose how you would like to use the platform to customize your experience.
          </p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <div style={{ display: "grid", gap: "1rem", marginTop: "1.25rem" }}>
          <div
            className="card"
            style={{
              cursor: "pointer",
              border: selectedRole === "seeker" ? "2px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
              background: selectedRole === "seeker" ? "var(--accent-primary-subtle)" : "var(--bg-surface-subtle)",
              padding: "1.25rem",
              borderRadius: "16px",
              transition: "all 0.2s ease",
            }}
            onClick={() => setSelectedRole("seeker")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                🎓 Student Seeker
              </h4>
              {selectedRole === "seeker" && <span className="badge badge-primary">Selected</span>}
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0.35rem 0 0 0" }}>
              Looking for a verified private room, shared flat, or PG bed near college.
            </p>
          </div>

          <div
            className="card"
            style={{
              cursor: "pointer",
              border: selectedRole === "resident" ? "2px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
              background: selectedRole === "resident" ? "var(--accent-primary-subtle)" : "var(--bg-surface-subtle)",
              padding: "1.25rem",
              borderRadius: "16px",
              transition: "all 0.2s ease",
            }}
            onClick={() => setSelectedRole("resident")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                🏠 Resident Flatmate
              </h4>
              {selectedRole === "resident" && <span className="badge badge-primary">Selected</span>}
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0.35rem 0 0 0" }}>
              Current tenant living in a flat/PG with an open room or bed to fill with a compatible roommate.
            </p>
          </div>

          <div
            className="card"
            style={{
              cursor: "pointer",
              border: selectedRole === "landlord" ? "2px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
              background: selectedRole === "landlord" ? "var(--accent-primary-subtle)" : "var(--bg-surface-subtle)",
              padding: "1.25rem",
              borderRadius: "16px",
              transition: "all 0.2s ease",
            }}
            onClick={() => setSelectedRole("landlord")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                🏢 Property Owner / PG Host
              </h4>
              {selectedRole === "landlord" && <span className="badge badge-primary">Selected</span>}
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0.35rem 0 0 0" }}>
              Host or property landlord listing accommodations for verified student tenants.
            </p>
          </div>
        </div>

        <button
          style={{ marginTop: "1.75rem", width: "100%", padding: "0.85rem", fontSize: "1rem", fontWeight: 700 }}
          className="pill-btn-primary"
          disabled={!selectedRole || loading}
          onClick={() => handleRoleSubmit(selectedRole)}
        >
          {loading ? "Saving Role..." : "Continue to Basera Portal →"}
        </button>
      </div>
    );
  }

  // STEP 2: VERIFICATION (if role set but status is not 'verified')
  const isVerified = user.platformVerification?.status === "verified";
  const isSeekerOrResident = user.role === "seeker" || user.role === "resident";

  if (!isVerified) {
    return (
      <div className="card" style={{ maxWidth: "680px", margin: "1.5rem auto", borderRadius: "24px", textAlign: "left" }}>
        <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
              🛡️ Verification Status
            </h3>
            <span className="badge badge-warning">
              Pending Verification
            </span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "0.35rem" }}>
            Account Role: <strong style={{ color: "var(--accent-primary)", textTransform: "uppercase" }}>{user.role}</strong> • Complete verification to unlock AI matching and private chats.
          </p>
        </div>

        {error && <div className="error-alert">{error}</div>}
        {notice && (
          <div className="status-notice" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>✓</span>
            <span>{notice}</span>
          </div>
        )}

        {isSeekerOrResident ? (
          <div style={{ background: "var(--bg-surface-subtle)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
            <h4 style={{ margin: "0 0 0.35rem 0", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              🎓 Student College Email Verification
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "0 0 1.25rem 0" }}>
              To ensure platform safety and trusted student housing, verify a valid university email address (.edu or .ac.in).
            </p>
            <form onSubmit={handleCollegeEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Institutional College Email</label>
                <input
                  type="email"
                  required
                  value={collegeEmail}
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  placeholder="name@university.edu or name@iitb.ac.in"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="pill-btn-primary"
                style={{ width: "100%", padding: "0.8rem", fontWeight: 700 }}
              >
                {loading ? "Generating Verification Link..." : "Send Verification Token"}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ background: "var(--bg-surface-subtle)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
            <h4 style={{ margin: "0 0 0.35rem 0", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              🔑 Landlord Identity Verification
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "0 0 1.25rem 0" }}>
              Property owners must provide a government-issued ID (Passport, Driving License, or Aadhaar) for trust & safety review.
            </p>

            {user.platformVerification?.idDocumentUrl ? (
              <div className="status-notice" style={{ marginTop: "1rem" }}>
                <p style={{ margin: 0 }}><strong>✅ ID Document Uploaded:</strong> Under review by Basera Trust & Safety.</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Status: <strong>PENDING REVIEW</strong>
                </p>
                <a
                  href={user.platformVerification.idDocumentUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--accent-primary)", fontSize: "0.88rem", fontWeight: 600, textDecoration: "underline" }}
                >
                  View Uploaded Document ↗
                </a>
              </div>
            ) : (
              <form onSubmit={handleIdUploadSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Government ID Document (PDF, PNG, JPG)</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    required
                    onChange={(e) => setIdFile(e.target.files[0])}
                    style={{ padding: "0.4rem" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="pill-btn-primary"
                  style={{ width: "100%", padding: "0.8rem", fontWeight: 700 }}
                >
                  {loading ? "Uploading Document..." : "Submit ID for Verification"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: "680px", margin: "1.5rem auto", borderRadius: "24px", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "var(--accent-success-subtle)", color: "var(--accent-success)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
          ✓
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Platform Verification Complete
          </h3>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Your identity has been authenticated and approved
          </span>
        </div>
      </div>

      <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.88rem" }}>
          <div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Verified Role</span>
            <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>{user.role}</strong>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Verification Method</span>
            <strong style={{ color: "var(--text-primary)" }}>{user.platformVerification?.method || "College Email"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

