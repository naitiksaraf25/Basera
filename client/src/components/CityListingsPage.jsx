import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CITY_CATALOG, getPropertyCategory } from "../data/cityData";
import { Navbar } from "./Navbar";

export function CityListingsPage({
  user,
  onOpenAuth,
  theme,
  toggleTheme,
  onSignOut,
  onNavigateToView,
}) {
  const { citySlug } = useParams();
  const navigate = useNavigate();

  // Selected Area filter within the city
  const [selectedArea, setSelectedArea] = useState("All");
  const [maxBudget, setMaxBudget] = useState(16000);
  const [roomTypeFilter, setRoomTypeFilter] = useState("All");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all"); // 'all' | 'PG' | 'Flat'

  // Lookup city data from catalog
  const cityData = CITY_CATALOG[citySlug] || CITY_CATALOG["bengaluru"];

  useEffect(() => {
    // Reset area filter when city changes
    setSelectedArea("All");
  }, [citySlug]);

  // Filter listings by area, budget, room type, and PG vs Flat
  const filteredListings = cityData.listings.filter((listing) => {
    const loc = listing.locality.toLowerCase();
    const area = selectedArea.toLowerCase();
    const matchesArea =
      selectedArea === "All" ||
      loc.includes(area) ||
      area.split(/[\/&]/).map((p) => p.trim()).some((p) => p && loc.includes(p)) ||
      selectedArea.replace(/it corridor|perimeter|sector v/gi, "").trim().split(/[\s,]+/).some((w) => w && w.length >= 3 && loc.includes(w.toLowerCase()));
    const matchesBudget = listing.price <= maxBudget;
    const matchesType =
      roomTypeFilter === "All" ||
      listing.roomType.toLowerCase().includes(roomTypeFilter.toLowerCase());
    const matchesPropertyType =
      propertyTypeFilter === "all" ||
      getPropertyCategory(listing.roomType) === propertyTypeFilter;
    return matchesArea && matchesBudget && matchesType && matchesPropertyType;
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

      {/* 2. DEDICATED CITY HERO BANNER */}
      <section
        style={{
          background:
            "linear-gradient(145deg, #0284C7 0%, #0369A1 40%, #0A58F6 100%)",
          color: "#FFFFFF",
          padding: "3.5rem 1.5rem 4.5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "rgba(255, 255, 255, 0.85)",
              marginBottom: "1.2rem",
            }}
          >
            <Link
              to="/"
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Home
            </Link>
            <span>/</span>
            <span>Rooms</span>
            <span>/</span>
            <span style={{ color: "#FDBA74", fontWeight: 700 }}>
              {cityData.name}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            {/* Left Headline & Metadata */}
            <div>
              {/* Room Count Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.95rem",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.16)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  marginBottom: "1.2rem",
                  backdropFilter: "blur(6px)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    background: "#34D399",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {cityData.totalRoomsText}
                </span>
              </div>

              {/* City Name Headline */}
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                }}
              >
                Verified Student Rooms in{" "}
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#FDBA74",
                  }}
                >
                  {cityData.name}
                </span>
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: "1.08rem",
                  color: "rgba(255, 255, 255, 0.92)",
                  lineHeight: 1.6,
                  maxWidth: "580px",
                  marginBottom: "1.8rem",
                }}
              >
                {cityData.description}
              </p>

              {/* University Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#FDBA74",
                  }}
                >
                  Top Campuses:
                </span>
                {cityData.universities.map((uni) => (
                  <span
                    key={uni}
                    style={{
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {uni}
                  </span>
                ))}
              </div>
            </div>

            {/* Right City Highlight Card */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "24px",
                padding: "1.8rem",
                boxShadow: "0 20px 50px rgba(0, 30, 90, 0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#FDBA74",
                  }}
                >
                  City Snapshot
                </span>
                <span
                  className="pill-chip pill-chip-verified"
                  style={{ fontSize: "0.72rem" }}
                >
                  ✓ 100% Zero Brokerage
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.2rem",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.15)",
                    borderRadius: "16px",
                    padding: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.74rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      display: "block",
                    }}
                  >
                    Starting From
                  </span>
                  <span
                    className="data-mono"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    {cityData.startPrice}
                    <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      /mo
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.15)",
                    borderRadius: "16px",
                    padding: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.74rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      display: "block",
                    }}
                  >
                    Student Rating
                  </span>
                  <span
                    className="data-mono"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      color: "#FDBA74",
                    }}
                  >
                    4.9{" "}
                    <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      / 5.0
                    </span>
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.5,
                }}
              >
                All listings in {cityData.name} are physically verified for
                security, cleanliness, and landlord credibility.
              </p>
            </div>
          </div>
        </div>

        {/* Wave Divider at Bottom */}
        <div className="hero-wave-container">
          <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
            <path
              d="M0,35 C320,85 540,10 780,55 C1040,100 1280,25 1440,65 L1440,90 L0,90 Z"
              fill="var(--bg-canvas)"
            />
          </svg>
        </div>
      </section>

      {/* 3. BROWSE BY AREA (LOCALITY CARDS) */}
      <section
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "1.8rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--accent-primary)",
              }}
            >
              Neighbourhood Clusters
            </span>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginTop: "0.3rem",
              }}
            >
              Browse rooms by area in{" "}
              <span className="headline-accent">{cityData.name}</span>
            </h2>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Click an area to filter listings below
          </span>
        </div>

        {/* Area Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {cityData.areas.map((area) => {
            const isSelected = selectedArea === area.name;
            return (
              <div
                key={area.id}
                onClick={() => setSelectedArea(isSelected ? "All" : area.name)}
                className="basera-card"
                style={{
                  cursor: "pointer",
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "1px solid var(--border-subtle)",
                  transform: isSelected ? "scale(1.02)" : "none",
                  boxShadow: isSelected
                    ? "0 12px 30px rgba(10, 88, 246, 0.2)"
                    : "var(--shadow-md)",
                  position: "relative",
                  borderRadius: "22px",
                  overflow: "hidden",
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    height: "160px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={area.image}
                    alt={area.name}
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
                        "linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 65%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "14px",
                      right: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      color: "#FFFFFF",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {area.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "rgba(255, 255, 255, 0.85)",
                        }}
                      >
                        {area.subtext}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Meta */}
                <div
                  style={{
                    padding: "0.95rem 1.1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "var(--bg-surface)",
                  }}
                >
                  <span
                    className="pill-chip pill-chip-match"
                    style={{ fontSize: "0.72rem", padding: "0.2rem 0.6rem" }}
                  >
                    {area.roomCount}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    From{" "}
                    <strong
                      className="data-mono"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {area.startPrice}
                    </strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Filter Chip if area selected */}
        {selectedArea !== "All" && (
          <div
            style={{
              marginTop: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
            >
              Filtering by: <strong>{selectedArea}</strong>
            </span>
            <button
              onClick={() => setSelectedArea("All")}
              style={{
                border: "none",
                background: "var(--accent-primary-subtle)",
                color: "var(--accent-primary)",
                borderRadius: "9999px",
                padding: "0.25rem 0.75rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Clear Filter ✕
            </button>
          </div>
        )}
      </section>

      {/* 4. FILTER BAR & LISTINGS GRID */}
      <section
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "2rem 1.5rem 5rem 1.5rem",
        }}
      >
        {/* Filter Controls Bar */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "20px",
            padding: "1.2rem 1.5rem",
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.2rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* PG vs Flat Toggle + Room Type Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {/* PG vs Flat Segmented Pill Toggle */}
            <div className="pg-flat-toggle-container">
              <button
                type="button"
                onClick={() => setPropertyTypeFilter("all")}
                className={`pg-flat-toggle-btn ${propertyTypeFilter === "all" ? "active" : ""}`}
              >
                All Types
              </button>
              <button
                type="button"
                onClick={() => setPropertyTypeFilter("PG")}
                className={`pg-flat-toggle-btn ${propertyTypeFilter === "PG" ? "active" : ""}`}
              >
                🏠 PG
              </button>
              <button
                type="button"
                onClick={() => setPropertyTypeFilter("Flat")}
                className={`pg-flat-toggle-btn ${propertyTypeFilter === "Flat" ? "active" : ""}`}
              >
                🏢 Flat
              </button>
            </div>

            {/* Room Type Selector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Type:
              </span>
            {["All", "Studio", "Double", "Twin", "Triple"].map((type) => (
              <button
                key={type}
                onClick={() => setRoomTypeFilter(type)}
                style={{
                  borderRadius: "9999px",
                  padding: "0.35rem 0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  background:
                    roomTypeFilter === type
                      ? "var(--accent-primary)"
                      : "var(--bg-surface-subtle)",
                  color:
                    roomTypeFilter === type
                      ? "#FFFFFF"
                      : "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {type}
              </button>
            ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              minWidth: "260px",
            }}
          >
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              Max:{" "}
              <strong
                className="data-mono"
                style={{ color: "var(--accent-primary)" }}
              >
                ₹{maxBudget.toLocaleString("en-IN")}/mo
              </strong>
            </span>
            <input
              type="range"
              min="5000"
              max="20000"
              step="500"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--accent-primary)" }}
            />
          </div>
        </div>

        {/* Listings Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="basera-card"
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "24px",
                background: "var(--bg-surface)",
                position: "relative",
              }}
            >
              {/* 3px Accent bar */}
              <div
                style={{
                  height: "3px",
                  width: "100%",
                  background: "var(--gradient-accent)",
                }}
              />

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "230px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="curated-photo"
                  style={{ width: "100%", height: "100%" }}
                  loading="lazy"
                />

                {/* Verified Badge */}
                <div
                  style={{ position: "absolute", top: "12px", left: "12px" }}
                >
                  <span className="pill-chip pill-chip-verified">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Verified PG
                  </span>
                </div>

                {/* Compatibility Score Chip */}
                <div
                  style={{ position: "absolute", top: "12px", right: "12px" }}
                >
                  <span className="pill-chip pill-chip-match">
                    <span className="data-mono">{listing.matchScore}%</span>{" "}
                    Match
                  </span>
                </div>

                {/* Room Sharing Type Chip */}
                <div
                  style={{ position: "absolute", bottom: "12px", left: "12px" }}
                >
                  <span
                    style={{
                      background: "rgba(15, 23, 42, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      padding: "0.25rem 0.7rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {listing.roomType}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.4rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {listing.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: "#F59E0B",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <span>★</span>
                    <span
                      className="data-mono"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {listing.rating}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {listing.locality}
                </p>

                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent-primary)",
                    fontWeight: 600,
                    marginBottom: "1rem",
                  }}
                >
                  📍 {listing.distance}
                </p>

                {/* Amenities Pills */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                    marginBottom: "1.4rem",
                  }}
                >
                  {listing.amenities.map((am, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.72rem",
                        padding: "0.2rem 0.55rem",
                        background: "var(--bg-surface-subtle)",
                        borderRadius: "9999px",
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      {am}
                    </span>
                  ))}
                </div>

                {/* Price & Action Row */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        display: "block",
                      }}
                    >
                      Monthly Rent
                    </span>
                    <span
                      className="data-mono"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      ₹{listing.price.toLocaleString("en-IN")}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 400,
                          color: "var(--text-muted)",
                        }}
                      >
                        /mo
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenAuth("signup")}
                    className="pill-btn-primary"
                    style={{ padding: "0.55rem 1.15rem", fontSize: "0.85rem" }}
                  >
                    View & Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1.5rem",
              background: "var(--bg-surface)",
              borderRadius: "24px",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: "0.6rem",
              }}
            >
              No rooms match your filters
            </h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}
            >
              Try adjusting the max budget slider or clearing the area filter.
            </p>
            <button
              onClick={() => {
                setSelectedArea("All");
                setMaxBudget(20000);
                setRoomTypeFilter("All");
              }}
              className="pill-btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

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
            © {new Date().getFullYear()} Basera Housing Technologies • Verified
            Student Housing in {cityData.name}
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
          >
            <Link
              to="/"
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
