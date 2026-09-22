import { useState, useEffect } from "react";

export function LandlordListingForm({ user, onListingSaved }) {
  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    rent: 12000,
    roomType: "private_room",
    genderPreference: "any",
    status: "active",
    houseRules: {
      smokingAllowed: false,
      drinkingAllowed: false,
      petsAllowed: false,
      guestPolicy: "daytime_only",
      curfew: "no_curfew",
    },
  });

  const [photosFiles, setPhotosFiles] = useState([]);
  const [existingPhotoUrls, setExistingPhotoUrls] = useState([]);
  const [linkedTenants, setLinkedTenants] = useState([]); // [{ id, name, maskedEmail }]
  
  // Resident tenant search state
  const [tenantSearchEmail, setTenantSearchEmail] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch("/api/profile/landlord-listing")
      .then((res) => res.json())
      .then((data) => {
        if (data.listing) {
          setFormData({
            city: data.listing.city || "",
            locality: data.listing.locality || "",
            rent: data.listing.rent || 12000,
            roomType: data.listing.roomType || "private_room",
            genderPreference: data.listing.genderPreference || "any",
            status: data.listing.status || "active",
            houseRules: {
              smokingAllowed: Boolean(data.listing.houseRules?.smokingAllowed),
              drinkingAllowed: Boolean(data.listing.houseRules?.drinkingAllowed),
              petsAllowed: Boolean(data.listing.houseRules?.petsAllowed),
              guestPolicy: data.listing.houseRules?.guestPolicy || "daytime_only",
              curfew: data.listing.houseRules?.curfew || "no_curfew",
            },
          });
          setExistingPhotoUrls(data.listing.photoUrls || []);
        }
      })
      .catch((err) => console.error("Error fetching listing:", err))
      .finally(() => setFetching(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("houseRules.")) {
      const ruleKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        houseRules: {
          ...prev.houseRules,
          [ruleKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSearchResident = async () => {
    if (!tenantSearchEmail.trim()) {
      setSearchError("Please enter an exact email address");
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await fetch(`/api/profile/search-residents?email=${encodeURIComponent(tenantSearchEmail.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "No resident found");
      }
      setSearchResult(data.resident);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddTenant = (resident) => {
    if (!linkedTenants.some((t) => t.id === resident.id)) {
      setLinkedTenants((prev) => [...prev, resident]);
    }
    setSearchResult(null);
    setTenantSearchEmail("");
  };

  const handleRemoveTenant = (tenantId) => {
    setLinkedTenants((prev) => prev.filter((t) => t.id !== tenantId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const body = new FormData();
    body.append("city", formData.city);
    body.append("locality", formData.locality);
    body.append("rent", formData.rent);
    body.append("roomType", formData.roomType);
    body.append("genderPreference", formData.genderPreference);
    body.append("status", formData.status);
    body.append("houseRules", JSON.stringify(formData.houseRules));
    body.append("linkedTenantIds", JSON.stringify(linkedTenants.map((t) => t.id)));

    existingPhotoUrls.forEach((url) => body.append("existingPhotoUrls", url));
    Array.from(photosFiles).forEach((file) => body.append("photos", file));

    try {
      const res = await fetch("/api/profile/landlord-listing", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.details?.join(", ") || "Failed to save listing");
      }

      setSuccess("Landlord Property Listing saved successfully!");
      if (data.listing?.photoUrls) {
        setExistingPhotoUrls(data.listing.photoUrls);
      }
      if (onListingSaved) onListingSaved(data.listing);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="card" style={{ maxWidth: "720px", margin: "2rem auto", textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
        <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Loading property listing data...</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: "740px", margin: "1.5rem auto", textAlign: "left", borderRadius: "24px" }}>
      <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Property Listing Form
          </h2>
          <span className="badge badge-warning">
            LANDLORD PORTAL
          </span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
          List your PG beds or apartments for student seekers and manage verified resident tenants.
        </p>
      </div>

      {error && <div className="error-alert">{error}</div>}
      {success && (
        <div className="status-notice" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>✓</span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        
        {/* Section 1: Property Location */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">📍 Property Location</div>
          <div className="form-section-subtitle">City and neighborhood where accommodation is situated</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Bengaluru, Pune, Delhi NCR"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Locality / Neighborhood *</label>
              <input
                type="text"
                name="locality"
                required
                value={formData.locality}
                onChange={handleChange}
                placeholder="e.g. Koramangala, Kothrud, North Campus"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Accommodation Type */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">💰 Pricing & Room Category</div>
          <div className="form-section-subtitle">Monthly rental rate and accommodation classification</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Monthly Rent (₹ / mo) *</label>
              <input
                type="number"
                name="rent"
                required
                min="0"
                value={formData.rent}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Room Type *</label>
              <select name="roomType" value={formData.roomType} onChange={handleChange}>
                <option value="pg_bed">PG Bed (Hostel/Co-living)</option>
                <option value="private_room">Private Room in Flat</option>
                <option value="shared_room">Shared Room / Twin Bed</option>
                <option value="full_flat">Full Flat / Independent Apartment</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Tenant Preference *</label>
              <select name="genderPreference" value={formData.genderPreference} onChange={handleChange}>
                <option value="any">Any / All Students</option>
                <option value="male_only">Male Students Only</option>
                <option value="female_only">Female Students Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: House Rules & Living Policies */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">📋 House Rules & Guest Policies</div>
          <div className="form-section-subtitle">Clearly set expectations for incoming student residents</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", margin: "1rem 0" }}>
            <label className={`custom-checkbox-chip ${formData.houseRules.smokingAllowed ? "active" : ""}`}>
              <input
                type="checkbox"
                name="houseRules.smokingAllowed"
                checked={formData.houseRules.smokingAllowed}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {formData.houseRules.smokingAllowed ? "✓ Smoking Allowed" : "✕ No Smoking"}
            </label>

            <label className={`custom-checkbox-chip ${formData.houseRules.drinkingAllowed ? "active" : ""}`}>
              <input
                type="checkbox"
                name="houseRules.drinkingAllowed"
                checked={formData.houseRules.drinkingAllowed}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {formData.houseRules.drinkingAllowed ? "✓ Alcohol Allowed" : "✕ No Alcohol"}
            </label>

            <label className={`custom-checkbox-chip ${formData.houseRules.petsAllowed ? "active" : ""}`}>
              <input
                type="checkbox"
                name="houseRules.petsAllowed"
                checked={formData.houseRules.petsAllowed}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {formData.houseRules.petsAllowed ? "✓ Pets Welcome" : "✕ No Pets"}
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Guest Policy *</label>
              <select name="houseRules.guestPolicy" value={formData.houseRules.guestPolicy} onChange={handleChange}>
                <option value="no_guests">Strictly No Guests</option>
                <option value="daytime_only">Daytime Visitors Only</option>
                <option value="overnight_allowed">Overnight Guests Allowed</option>
                <option value="flexible">Flexible Guest Policy</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Curfew Rule *</label>
              <select name="houseRules.curfew" value={formData.houseRules.curfew} onChange={handleChange}>
                <option value="no_curfew">No Curfew (24/7 Key Access)</option>
                <option value="10_pm">10:00 PM Gate Closure</option>
                <option value="11_pm">11:00 PM Gate Closure</option>
                <option value="12_am">12:00 AM Midnight Curfew</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Link Verified Student Tenants */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">👥 Link Existing Student Tenants (Optional)</div>
          <div className="form-section-subtitle">Connect registered student residents to boost listing credibility & calculate flatmate compatibility</div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="email"
              placeholder="Exact resident email (e.g. resident@university.edu)"
              value={tenantSearchEmail}
              onChange={(e) => setTenantSearchEmail(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleSearchResident}
              disabled={searchLoading}
              className="pill-btn-secondary"
              style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}
            >
              {searchLoading ? "Searching..." : "🔍 Find Resident"}
            </button>
          </div>

          {searchError && <div className="error-alert" style={{ marginTop: "0.75rem" }}>{searchError}</div>}

          {searchResult && (
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "var(--bg-surface)",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div>
                <strong>{searchResult.name}</strong> ({searchResult.maskedEmail}) — <span className="badge badge-primary">{searchResult.role}</span>
              </div>
              <button
                type="button"
                onClick={() => handleAddTenant(searchResult)}
                className="pill-btn-primary"
                style={{ fontSize: "0.8rem", padding: "0.35rem 0.8rem" }}
              >
                + Link Tenant
              </button>
            </div>
          )}

          {linkedTenants.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Linked Student Tenants ({linkedTenants.length}):
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {linkedTenants.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "var(--bg-surface)",
                      padding: "0.5rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>👤 {t.name} ({t.maskedEmail})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTenant(t.id)}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        color: "#ef4444",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        padding: "0.2rem 0.6rem",
                        fontSize: "0.75rem"
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Photos */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">📸 Property Photos</div>
          <div className="form-section-subtitle">Showcase bright, inviting rooms to attract high quality student seekers</div>

          {existingPhotoUrls.length > 0 && (
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {existingPhotoUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Listing ${i + 1}`}
                  style={{ width: "100px", height: "75px", borderRadius: "10px", objectFit: "cover", border: "1px solid var(--border-subtle)" }}
                />
              ))}
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setPhotosFiles(e.target.files)}
            style={{ padding: "0.4rem" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="pill-btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", fontWeight: 700, borderRadius: "9999px" }}
        >
          {loading ? "Saving Listing..." : "✓ Save Property Listing"}
        </button>
      </form>
    </div>
  );
}

