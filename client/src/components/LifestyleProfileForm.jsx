import { useState, useEffect } from "react";

export function LifestyleProfileForm({ user, onProfileSaved }) {
  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    budgetMin: 5000,
    budgetMax: 20000,
    gender: "male",
    genderPreference: "no_preference",
    sleepSchedule: "flexible",
    cleanliness: 3,
    smokingDrinking: "none",
    foodPreference: "any",
    guestsFrequency: "weekends_only",
    bio: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch("/api/profile/lifestyle")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setFormData({
            city: data.profile.city || "",
            locality: data.profile.locality || "",
            budgetMin: data.profile.budgetMin || 5000,
            budgetMax: data.profile.budgetMax || 20000,
            gender: data.profile.gender || "male",
            genderPreference: data.profile.genderPreference || "no_preference",
            sleepSchedule: data.profile.sleepSchedule || "flexible",
            cleanliness: data.profile.cleanliness || 3,
            smokingDrinking: data.profile.smokingDrinking || "none",
            foodPreference: data.profile.foodPreference || "any",
            guestsFrequency: data.profile.guestsFrequency || "weekends_only",
            bio: data.profile.bio || "",
            rent: data.profile.rent || "",
            roomType: data.profile.roomType || "private_room",
            preferredRoomType: data.profile.preferredRoomType || "any",
          });
          setExistingPhotoUrl(data.profile.photoUrl || "");
        }
      })
      .catch((err) => console.error("Error fetching profile:", err))
      .finally(() => setFetching(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });
    if (existingPhotoUrl) {
      body.append("existingPhotoUrl", existingPhotoUrl);
    }
    if (photoFile) {
      body.append("photo", photoFile);
    }

    try {
      const res = await fetch("/api/profile/lifestyle", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.details?.join(", ") || "Failed to save profile");
      }

      setSuccess("Lifestyle Profile saved successfully!");
      if (data.profile?.photoUrl) {
        setExistingPhotoUrl(data.profile.photoUrl);
      }
      if (onProfileSaved) onProfileSaved(data.profile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="card" style={{ maxWidth: "700px", margin: "2rem auto", textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
        <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Loading lifestyle profile data...</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: "720px", margin: "1.5rem auto", textAlign: "left", borderRadius: "24px" }}>
      <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Lifestyle Profile
          </h2>
          <span className="badge badge-primary">
            {user.role?.toUpperCase()}
          </span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
          Tell us your living habits and room requirements so our AI algorithm can match you with compatible flatmates.
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
        
        {/* Section 1: Location & Budget */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">📍 Location & Monthly Budget</div>
          <div className="form-section-subtitle">Target city and monthly rental constraints</div>

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
              <label>Preferred Locality / Area</label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="e.g. Koramangala, Kothrud, North Campus"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Min Budget (₹ / mo) *</label>
              <input
                type="number"
                name="budgetMin"
                required
                min="0"
                value={formData.budgetMin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Max Budget (₹ / mo) *</label>
              <input
                type="number"
                name="budgetMax"
                required
                min="0"
                value={formData.budgetMax}
                onChange={handleChange}
              />
            </div>
          </div>

          {user.role === "resident" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem", background: "var(--bg-surface)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ color: "var(--accent-primary)" }}>Vacancy Rent Amount (₹ / mo) *</label>
                <input
                  type="number"
                  name="rent"
                  placeholder="Rent for the open spot"
                  value={formData.rent}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ color: "var(--accent-primary)" }}>Vacant Spot Type *</label>
                <select name="roomType" value={formData.roomType} onChange={handleChange}>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                  <option value="full_flat">Full Flat</option>
                  <option value="pg_bed">PG Bed</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Room & Gender Preferences */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">🛏️ Room & Co-living Preferences</div>
          <div className="form-section-subtitle">Who you would feel most comfortable sharing space with</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Your Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Roommate Gender Preference *</label>
              <select name="genderPreference" value={formData.genderPreference} onChange={handleChange}>
                <option value="no_preference">No Preference (Any)</option>
                <option value="male_only">Male Only</option>
                <option value="female_only">Female Only</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "1rem", marginBottom: 0 }}>
            <label>Preferred Living Format *</label>
            <select name="preferredRoomType" value={formData.preferredRoomType || "any"} onChange={handleChange}>
              <option value="any">Flexible / Open to Any Option</option>
              <option value="private_room">Private Room in Flat</option>
              <option value="shared_room">Twin / Shared Room</option>
              <option value="full_flat">Full 1BHK / 2BHK Flat</option>
              <option value="pg_bed">PG Bed (Managed Student Living)</option>
            </select>
          </div>
        </div>

        {/* Section 3: Daily Habits & Compatibility */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">🧘 Daily Habits & Compatibility Factors</div>
          <div className="form-section-subtitle">Key attributes evaluated by the Basera compatibility engine</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Sleep Schedule *</label>
              <select name="sleepSchedule" value={formData.sleepSchedule} onChange={handleChange}>
                <option value="early_bird">🌅 Early Bird (Sleeps & wakes early)</option>
                <option value="night_owl">🌙 Night Owl (Studies/works late)</option>
                <option value="flexible">⚡ Flexible / Variable routine</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Cleanliness Standard *</label>
              <select name="cleanliness" value={formData.cleanliness} onChange={handleChange}>
                <option value={1}>1 - Relaxed / Easygoing</option>
                <option value={2}>2 - Casual</option>
                <option value={3}>3 - Moderate (Weekly chores)</option>
                <option value={4}>4 - Neat & Organized</option>
                <option value={5}>5 - Spotless / Very Strict</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Smoking / Drinking *</label>
              <select name="smokingDrinking" value={formData.smokingDrinking} onChange={handleChange}>
                <option value="none">None (Non-smoker & Non-drinker)</option>
                <option value="social">Social / Occasional</option>
                <option value="regular">Regular</option>
                <option value="opposed">Strictly Opposed (Smoke/Drink-Free Flat)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Diet / Food Preference *</label>
              <select name="foodPreference" value={formData.foodPreference} onChange={handleChange}>
                <option value="any">Any / No Restrictions</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "1rem", marginBottom: 0 }}>
            <label>Guests & Social Policy *</label>
            <select name="guestsFrequency" value={formData.guestsFrequency} onChange={handleChange}>
              <option value="never">Peace & Quiet (No guests)</option>
              <option value="rarely">Rarely / Advance Notice Only</option>
              <option value="weekends_only">Weekends Only</option>
              <option value="frequently">Social / Friends Welcome</option>
              <option value="anytime">Open House / Highly Social</option>
            </select>
          </div>
        </div>

        {/* Section 4: Bio & Photo */}
        <div style={{ background: "var(--bg-surface-subtle)", padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <div className="form-section-title">✨ About You & Photo</div>
          <div className="form-section-subtitle">Introduce yourself to future flatmates</div>

          <div className="form-group">
            <label>Short Bio</label>
            <textarea
              name="bio"
              rows="3"
              maxLength={300}
              value={formData.bio}
              onChange={handleChange}
              placeholder="E.g. Computer Science sophomore at IIT. Loves cooking, quiet study sessions during weekdays, and board games on weekends..."
            />
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "right", marginTop: "4px" }}>
              {formData.bio.length} / 300 characters
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Profile Picture</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.35rem" }}>
              {existingPhotoUrl ? (
                <img
                  src={existingPhotoUrl}
                  alt="Profile Preview"
                  style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", border: "2px solid var(--accent-primary)" }}
                />
              ) : (
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                  👤
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                style={{ padding: "0.4rem" }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="pill-btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", fontWeight: 700, borderRadius: "9999px" }}
        >
          {loading ? "Saving Lifestyle Profile..." : "✓ Save Lifestyle Profile"}
        </button>
      </form>
    </div>
  );
}

