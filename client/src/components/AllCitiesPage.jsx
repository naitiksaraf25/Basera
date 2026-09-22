import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CITY_CATALOG, CITIES_LIST } from "../data/cityData";
import { Navbar } from "./Navbar";

export function AllCitiesPage({
  user,
  onOpenAuth,
  theme,
  toggleTheme,
  onSignOut,
  onNavigateToView,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");


  const REGIONS = {
    "North India": [
      "delhi-ncr",
      "jaipur",
      "kota",
      "lucknow",
      "kanpur",
      "agra",
      "ludhiana",
      "chandigarh",
      "dehradun",
      "greater-noida",
      "varanasi",
    ],
    "South India": [
      "bengaluru",
      "hyderabad",
      "chennai",
      "coimbatore",
      "kochi",
      "madurai",
      "visakhapatnam",
      "manipal",
      "vellore",
    ],
    "West India": [
      "pune",
      "mumbai",
      "ahmedabad",
      "surat",
      "vadodara",
      "nashik",
      "rajkot",
    ],
    "East & Central": [
      "kolkata",
      "bhubaneswar",
      "patna",
      "ranchi",
      "guwahati",
      "indore",
      "bhopal",
      "jabalpur",
      "nagpur",
    ],
    "Coaching Hubs": [
      "kota",
      "delhi-ncr",
      "indore",
      "patna",
      "chandigarh",
      "ranchi",
      "lucknow",
    ],
  };

  const filteredCities = CITIES_LIST.filter((city) => {
    const matchesRegion =
      regionFilter === "All" ||
      (REGIONS[regionFilter] && REGIONS[regionFilter].includes(city.slug));

    const matchesSearch =
      !searchQuery.trim() ||
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.hubs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (city.universities &&
        city.universities.some((u) =>
          u.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    return matchesRegion && matchesSearch;
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "var(--bg-canvas)",
        color: "var(--text-primary)",
      }}
    >
      {/* 2px Gradient Accent line */}
      <div
        className="gradient-accent-bar"
        style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }}
      />

      {/* 1. SHARED NAVBAR */}
      <Navbar
        user={user}
        onOpenAuth={onOpenAuth}
        theme={theme}
        toggleTheme={toggleTheme}
        onSignOut={onSignOut}
        onNavigateToView={onNavigateToView}
      />

      {/* 2. PAGE HERO HEADER */}
      <section
        style={{
          background:
            "linear-gradient(145deg, #0284c7 0%, #0369a1 40%, #0a58f6 100%)",
          color: "#FFFFFF",
          padding: "3.5rem 1.5rem 4rem 1.5rem",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1.1rem",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              fontSize: "0.82rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            <span>🇮🇳</span>
            <span>Covering 10+ Major University & Coaching Destinations</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "1rem",
              letterSpacing: "-0.03em",
            }}
          >
            Find Student Rooms & Flatmates Across India
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.92)",
              lineHeight: 1.6,
              maxWidth: "640px",
              margin: "0 auto 2rem auto",
            }}
          >
            Browse verified PGs, student co-living spaces, and independent
            shared flats with zero brokerage and transparent lifestyle matching.
          </p>

          {/* Search Box */}
          <div
            style={{
              maxWidth: "580px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              background: "#FFFFFF",
              borderRadius: "9999px",
              padding: "0.4rem 0.5rem 0.4rem 1.2rem",
              boxShadow: "0 12px 35px rgba(0, 20, 60, 0.25)",
            }}
          >
            <span style={{ fontSize: "1.1rem", marginRight: "0.6rem" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by city (e.g. Bengaluru), university, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "0.95rem",
                color: "#1e293b",
                background: "transparent",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "0.4rem",
                  fontSize: "0.9rem",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. REGION FILTER TABS */}
      <section
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "2rem 1.5rem 1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            "All",
            "North India",
            "South India",
            "West India",
            "East & Central",
            "Coaching Hubs",
          ].map((region) => (
              <button
                key={region}
                onClick={() => setRegionFilter(region)}
                className={`pill-btn ${regionFilter === region ? "pill-btn-primary" : "pill-btn-ghost"}`}
                style={{
                  padding: "0.45rem 1.1rem",
                  fontSize: "0.85rem",
                  borderRadius: "9999px",
                }}
              >
                {region === "All" ? "All Locations" : region}
              </button>
            ),
          )}
        </div>

        <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
          Showing <strong>{filteredCities.length}</strong> student hubs
        </div>
      </section>

      {/* 4. CITY CARDS GRID */}
      <main
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "1rem 1.5rem 4.5rem 1.5rem",
        }}
      >
        {filteredCities.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1.5rem",
              background: "var(--bg-surface)",
              borderRadius: "20px",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              No cities matched "{searchQuery}"
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Try searching for "Delhi", "IIT", or reset your region filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setRegionFilter("All");
              }}
              className="pill-btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "1.8rem",
            }}
          >
            {filteredCities.map((city) => (
              <div
                key={city.slug}
                className="basera-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "22px",
                  overflow: "hidden",
                  border: "1px solid var(--border-subtle)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  background: "var(--bg-surface)",
                }}
              >
                {/* City Photo Banner */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "190px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="curated-photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.15) 60%)",
                    }}
                  />

                  {/* Badges on image */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#0F172A",
                      padding: "0.25rem 0.7rem",
                      borderRadius: "9999px",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                    }}
                  >
                    Starts {city.startPrice}/mo
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "14px",
                      right: "14px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.45rem",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {city.name}
                    </h2>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(255, 255, 255, 0.88)",
                      }}
                    >
                      {city.totalRoomsText}
                    </span>
                  </div>
                </div>

                {/* City Details Body */}
                <div
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        margin: "0 0 1rem 0",
                      }}
                    >
                      {city.description}
                    </p>

                    {/* Popular Hubs / Localities */}
                    <div style={{ marginBottom: "1rem" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "var(--accent-primary)",
                          display: "block",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Popular Clusters
                      </span>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--text-muted)",
                          margin: 0,
                        }}
                      >
                        {city.hubs}
                      </p>
                    </div>

                    {/* Universities tags */}
                    {city.universities && city.universities.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.35rem",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {city.universities.slice(0, 3).map((uni, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: "0.72rem",
                              background: "var(--bg-surface-subtle)",
                              border: "1px solid var(--border-subtle)",
                              padding: "0.2rem 0.55rem",
                              borderRadius: "6px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            🎓 {uni}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Link */}
                  <Link
                    to={`/rooms/${city.slug}`}
                    className="pill-btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                      padding: "0.7rem 1.2rem",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      borderRadius: "9999px",
                      width: "100%",
                      boxShadow: "0 4px 14px rgba(10, 88, 246, 0.25)",
                    }}
                  >
                    <span>Browse Rooms in {city.name}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 5. FOOTER */}
      <footer
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          padding: "3rem 1.5rem",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <p style={{ marginBottom: "0.5rem" }}>
            © {new Date().getFullYear()} Basera Housing Technologies • India's
            Premier Student Living & Roommate Network
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              to="/cities"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              All Cities
            </Link>
            <Link
              to="/rooms/bengaluru"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              Bengaluru
            </Link>
            <Link
              to="/rooms/delhi-ncr"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              Delhi NCR
            </Link>
            <Link
              to="/rooms/pune"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              Pune
            </Link>
            <Link
              to="/rooms/mumbai"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              Mumbai
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
