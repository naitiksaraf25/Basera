import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HeroIllustration } from "./HeroIllustration";
import { BaseraLogo } from "./BaseraLogo";
import { Navbar } from "./Navbar";
import { getPropertyCategory, CITIES_LIST, CITY_CATALOG, STATE_CITY_MAP, STATES_LIST } from "../data/cityData";

const CITY_SLUGS = CITIES_LIST.reduce((acc, c) => {
  acc[c.name] = c.slug;
  return acc;
}, {
  "Delhi NCR": "delhi-ncr",
  Bengaluru: "bengaluru",
  Pune: "pune",
  Mumbai: "mumbai",
  Hyderabad: "hyderabad",
  Kota: "kota",
  Chennai: "chennai",
  Kolkata: "kolkata",
  Ahmedabad: "ahmedabad",
  Jaipur: "jaipur",
});

// Full 148 verified listings across all 36 Tier-1 & Tier-2 cities with HTTP 200 imagery
const ALL_CATALOG_LISTINGS = Object.values(CITY_CATALOG).flatMap((c) =>
  c.listings.map((l) => ({
    ...l,
    city: c.name,
    citySlug: c.slug,
    state: c.state,
  }))
);

// Curated high quality Unsplash photography of real student rooms, PGs, and study spaces
// All with unified color grade filter applied via .curated-photo
const ROOM_LISTINGS = [
  {
    id: "del-1",
    title: "Greenwood Residency — Double Suite",
    city: "Delhi NCR",
    locality: "North Campus, Hudson Lane",
    distance: "400m from Delhi University Metro",
    price: 8500,
    rating: 4.9,
    reviewsCount: 42,
    roomType: "Double Sharing",
    verified: true,
    matchScore: 96,
    evaluatedFactors: 7,
    confidence: "High",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    amenities: ["Wi-Fi 100Mbps", "AC", "Daily Housekeeping", "Power Backup"],
  },
  {
    id: "blr-1",
    title: "Indiranagar Urban Living",
    city: "Bengaluru",
    locality: "Koramangala 4th Block",
    distance: "1.2 km from Christ University",
    price: 11000,
    rating: 4.8,
    reviewsCount: 68,
    roomType: "Private Studio",
    verified: true,
    matchScore: 92,
    evaluatedFactors: 7,
    confidence: "High",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "High-speed Wi-Fi",
      "Attached Washroom",
      "Cook on Request",
      "No Lock-in",
    ],
  },
  {
    id: "pun-1",
    title: "Kothrud Scholars PG",
    city: "Pune",
    locality: "Kothrud, Ideal Colony",
    distance: "800m from MIT World Peace Univ",
    price: 6800,
    rating: 4.9,
    reviewsCount: 35,
    roomType: "Double Sharing",
    verified: true,
    matchScore: 94,
    evaluatedFactors: 6,
    confidence: "High",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Pure Veg Mess",
      "Study Library Desk",
      "Solar Water",
      "CCTV 24/7",
    ],
  },
  {
    id: "mum-1",
    title: "Powai Lakeside Student Studio",
    city: "Mumbai",
    locality: "Powai, Hiranandani Gardens",
    distance: "1.5 km from IIT Bombay Main Gate",
    price: 14500,
    rating: 4.7,
    reviewsCount: 51,
    roomType: "Private Balcony Room",
    verified: true,
    matchScore: 89,
    evaluatedFactors: 7,
    confidence: "High",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "AC Included",
      "Gym Access",
      "2-Wheeler Parking",
      "High Security",
    ],
  },
  {
    id: "hyd-1",
    title: "Hitec Valley Co-Living",
    city: "Hyderabad",
    locality: "Gachibowli, Telecom Nagar",
    distance: "900m from University of Hyderabad",
    price: 7900,
    rating: 4.8,
    reviewsCount: 29,
    roomType: "Triple Sharing",
    verified: true,
    matchScore: 91,
    evaluatedFactors: 6,
    confidence: "High",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Fast Wi-Fi",
      "3 Meals Included",
      "Biometric Entry",
      "Laundromat",
    ],
  },
  {
    id: "kot-1",
    title: "Allen Corner Aspirational Stay",
    city: "Kota",
    locality: "Landmark City, Kunhari",
    distance: "300m from Landmark Coaching Park",
    price: 6200,
    rating: 4.9,
    reviewsCount: 88,
    roomType: "Single Study Room",
    verified: true,
    matchScore: 95,
    evaluatedFactors: 7,
    confidence: "High",
    image:
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Sound-insulated",
      "Doctor On-Call",
      "Biometric Attendance",
      "Healthy Mess",
    ],
  },
];

const CITIES = [
  {
    name: "Delhi NCR",
    hubs: "North Campus • Noida • South Campus",
    roomCount: "1,240+ rooms",
    startPrice: "₹6,000",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bengaluru",
    hubs: "Koramangala • HSR • Electronic City",
    roomCount: "980+ rooms",
    startPrice: "₹8,500",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pune",
    hubs: "Kothrud • Viman Nagar • FC Road",
    roomCount: "840+ rooms",
    startPrice: "₹5,500",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mumbai",
    hubs: "Powai • Vile Parle • Bandra",
    roomCount: "650+ rooms",
    startPrice: "₹10,500",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Hyderabad",
    hubs: "Gachibowli • Madhapur • Hitec City",
    roomCount: "590+ rooms",
    startPrice: "₹6,500",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kota",
    hubs: "Landmark City • Vigyan Nagar",
    roomCount: "720+ rooms",
    startPrice: "₹5,000",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
  },
];

// Actual 7 factors from server/services/matchingEngine.js
const MATCHING_FACTORS = [
  {
    key: "cleanliness",
    name: "Cleanliness & Chores Routine",
    weight: 25,
    userValue: "Spick & Span (Daily cleaning schedule)",
    matchValue: "Spick & Span",
    score: 100,
    desc: "Chore duty discipline and shared space tidiness",
  },
  {
    key: "sleepSchedule",
    name: "Sleep Schedule & Chronotype",
    weight: 20,
    userValue: "Night Owl (Bedtime ~1:30 AM)",
    matchValue: "Night Owl (Bedtime ~1:00 AM)",
    score: 95,
    desc: "Light-out timings, quiet study hours, morning alarms",
  },
  {
    key: "smokingDrinking",
    name: "Smoking & Drinking Tolerance",
    weight: 20,
    userValue: "Strictly Non-Smoker",
    matchValue: "Strictly Non-Smoker",
    score: 100,
    desc: "Substance boundaries and flat comfort rules",
  },
  {
    key: "foodPreference",
    name: "Food & Dietary Preferences",
    weight: 15,
    userValue: "Vegetarian / Separate Cookware",
    matchValue: "Vegetarian Friendly",
    score: 90,
    desc: "Kitchen sharing, refrigerator habits, meal schedules",
  },
  {
    key: "guestsFrequency",
    name: "Guest & Gathering Comfort",
    weight: 10,
    userValue: "Occasional Weekend Study Friends",
    matchValue: "Weekends Only",
    score: 92,
    desc: "Visitor frequency, party vibes vs. quiet sanctuary",
  },
  {
    key: "cityProximity",
    name: "City & Campus Proximity",
    weight: 5,
    userValue: "Within 1.5 km of DU North Campus",
    matchValue: "800m away (Same Metro Line)",
    score: 90,
    desc: "Target university distance and transit convenience",
  },
  {
    key: "budgetCloseness",
    name: "Budget & Deposit Alignment",
    weight: 5,
    userValue: "₹7,500 – ₹9,500 / month",
    matchValue: "₹8,500 / month",
    score: 95,
    desc: "Rent bracket overlap and shared utility split readiness",
  },
];

const REVIEWS = [
  {
    initials: "TS",
    name: "Tanmay S.",
    role: "Computer Science, DU Hansraj",
    city: "Delhi",
    verified: "Verified Resident",
    text: "Finding a flatmate who also stays up until 2 AM coding without blasting speakers was impossible on Facebook groups. Basera matched me with Rohan in 2 days. 8 months in, zero arguments.",
    score: 96,
  },
  {
    initials: "AP",
    name: "Ananya Patel",
    role: "B.Des, Christ University",
    city: "Bengaluru",
    verified: "Verified Resident",
    text: "As a vegetarian moving from Ahmedabad, sharing cookware with the wrong flatmate was my biggest dread. The dietary and chore alignment breakdown made all the difference.",
    score: 94,
  },
  {
    initials: "MK",
    name: "Mohit Kulkarni",
    role: "M.Tech, COEP Pune",
    city: "Pune",
    verified: "Verified Resident",
    text: "The zero brokerage and platform ID verification saved me from shady brokers near FC Road. The room photo was 100% genuine and the landlord was super professional.",
    score: 91,
  },
];

export function Homepage({
  user,
  onOpenAuth,
  theme,
  toggleTheme,
  onSignOut,
  onNavigateToView,
}) {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [budgetMax, setBudgetMax] = useState(12000);
  const [selectedCategory, setSelectedCategory] =
    useState("All Accommodations");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all"); // 'all' | 'PG' | 'Flat'
  const [searchLocality, setSearchLocality] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  // Animated Count-Up State
  const [counters, setCounters] = useState({
    students: 0,
    rooms: 0,
    campuses: 0,
    rating: 0,
  });
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Detect scroll for navbar frosted treatment
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for counting stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          const duration = 1800;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);

            setCounters({
              students: Math.floor(easeOutQuad * 50000),
              rooms: Math.floor(easeOutQuad * 12000),
              campuses: Math.floor(easeOutQuad * 120),
              rating: (easeOutQuad * 4.9).toFixed(1),
            });

            if (step >= steps) {
              clearInterval(timer);
              setCounters({
                students: 50000,
                rooms: 12000,
                campuses: 120,
                rating: "4.9",
              });
            }
          }, interval);
        }
      },
      { threshold: 0.2 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [statsAnimated]);

  const filteredListings = ALL_CATALOG_LISTINGS.filter((r) => {
    const matchesState =
      selectedState === "All" ||
      r.state === selectedState ||
      (STATE_CITY_MAP[selectedState] &&
        STATE_CITY_MAP[selectedState].includes(r.city));
    const matchesCity = selectedCity === "All" || r.city === selectedCity;
    const matchesBudget = r.price <= budgetMax;
    const matchesCategory =
      selectedCategory === "All Accommodations" ||
      (selectedCategory === "Twin Sharing" &&
        r.roomType.toLowerCase().includes("double")) ||
      (selectedCategory === "Private Single" &&
        (r.roomType.toLowerCase().includes("single") ||
          r.roomType.toLowerCase().includes("studio") ||
          r.roomType.toLowerCase().includes("private"))) ||
      (selectedCategory === "Girls PG" || selectedCategory === "Boys PG"
        ? true
        : true);
    const matchesLocality =
      !searchLocality.trim() ||
      r.locality.toLowerCase().includes(searchLocality.toLowerCase()) ||
      r.distance.toLowerCase().includes(searchLocality.toLowerCase()) ||
      r.title.toLowerCase().includes(searchLocality.toLowerCase());
    const matchesPropertyType =
      propertyTypeFilter === "all" ||
      getPropertyCategory(r.roomType) === propertyTypeFilter;
    return (
      matchesState &&
      matchesCity &&
      matchesBudget &&
      matchesCategory &&
      matchesLocality &&
      matchesPropertyType
    );
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* 2px Gradient Accent line across top edge */}
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
        transparentOnTop={false}
      />

      {/* 2. HERO SECTION — VIVID AZURE BLUE BAND WITH WAVE BREAK & OVERLAPPING SEARCH CARD */}
      <section className="vivid-hero-band">
        {/* Ambient Video Background with Confident Azure Scrim */}
        <div className="hero-video-backdrop" aria-hidden="true">
          <video
            className="hero-video-element"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-video-poster.jpg"
            preload="auto"
          >
            <source src="/videos/basera-hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-scrim" />
        </div>

        <div
          className="hero-two-col"
          style={{ position: "relative", zIndex: 10 }}
        >
          {/* Left Column: Bold Headline, Subtext, Trust Line */}
          <div>
            {/* Prominent Admissions Live Announcement Banner */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.55rem 1.35rem",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.22)",
                border: "1.5px solid rgba(255, 255, 255, 0.45)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.16)",
                marginBottom: "0.9rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: "#34D399",
                  display: "inline-block",
                  boxShadow: "0 0 10px #34D399, 0 0 4px #FFFFFF",
                }}
              />
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.015em",
                }}
              >
                Fall 2026 Admissions: 3,850+ Verified Student Rooms Live
              </span>
            </div>

            {/* Confident, Scaled Headline with Warm Italic Serif Accent Word */}
            <h1
              style={{
                fontSize: "clamp(2.1rem, 3.8vw, 3.3rem)",
                fontWeight: 800,
                lineHeight: 1.14,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "0.85rem",
                textShadow:
                  "0 2px 16px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.6)",
              }}
            >
              Find your{" "}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#FDBA74",
                  padding: "0 0.12em",
                  textShadow:
                    "0 2px 16px rgba(253, 186, 116, 0.5), 0 2px 10px rgba(0, 0, 0, 0.6)",
                }}
              >
                people
              </span>
              , not just a room.
            </h1>

            {/* High-Contrast Subtext */}
            <p
              style={{
                fontSize: "clamp(0.96rem, 1.3vw, 1.1rem)",
                lineHeight: 1.5,
                color: "rgba(255, 255, 255, 0.95)",
                maxWidth: "560px",
                margin: "0 0 1.25rem 0",
                fontWeight: 400,
                textShadow: "0 1px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              Verified student housing and transparent lifestyle-compatibility
              matching across India's top university hubs. Zero brokerage, 100%
              verified flatmates.
            </p>

            {/* Hero Trust Badges in High Contrast White */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
                color: "#FFFFFF",
                fontSize: "0.84rem",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Zero Brokerage Forever</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>ID & College-Verified Profiles</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>24h Compatibility Transparency</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame with Real Student Housing Photography & Floating Match Card */}
          <div className="hero-visual-frame">
            {/* Floating Top-Right Verified Context Badge */}
            <div className="hero-floating-badge-top">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ color: "var(--text-primary)" }}>Verified PG Flat • North Campus, Delhi</span>
            </div>

            {/* Main Hero Photo Box */}
            <div
              className="hero-main-photo-box"
              style={{
                boxShadow: "0 25px 60px rgba(0, 20, 60, 0.35)",
                border: "3px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85"
                alt="Bright sunlit student studio apartment interior"
                className="curated-photo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Bottom Gradient Scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15, 23, 42, 0.45) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Floating Match-Score Card Overlay with Real Student Avatars & Frosted Glass */}
            <div className="hero-floating-match-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  {/* Two overlapping student portrait avatars */}
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      width: "46px",
                      height: "28px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Ananya"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "9999px",
                        objectFit: "cover",
                        border: "2px solid var(--bg-surface)",
                        position: "absolute",
                        left: 0,
                        zIndex: 2,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    />
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Rohan"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "9999px",
                        objectFit: "cover",
                        border: "2px solid var(--bg-surface)",
                        position: "absolute",
                        left: "18px",
                        zIndex: 1,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Ananya & Rohan
                  </span>
                </div>

                <span
                  className="pill-chip pill-chip-match"
                  style={{ padding: "0.22rem 0.65rem", fontSize: "0.78rem" }}
                >
                  <strong className="data-mono">94%</strong> Match
                </span>
              </div>

              {/* Compatibility Progress Indicator */}
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  background: "var(--border-subtle)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "94%",
                    height: "100%",
                    background: "var(--gradient-accent)",
                    borderRadius: "9999px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.74rem",
                  color: "var(--text-muted)",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "9999px",
                      background: "#10B981",
                      display: "inline-block",
                    }}
                  />
                  7 of 7 factors evaluated
                </span>
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
                  High Confidence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charming Layered Townscape & Student Arrival Hero Illustration */}
        <HeroIllustration />

        {/* BOLD FLOATING OVERLAPPING SEARCH CARD BRIDGING HERO & CITY SECTION */}
        <div className="hero-overlap-search-wrapper">
          <div className="hero-overlap-search-card">
            {/* Search Top Filter Controls: PG vs Flat Toggle + Category Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginBottom: "0.9rem",
              }}
            >
              {/* PG vs Flat Toggle */}
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

              {/* Category Pill Tabs */}
              <div className="search-category-tabs" style={{ marginBottom: 0 }}>
                {[
                  "All Accommodations",
                  "Twin Sharing",
                  "Private Single",
                  "Girls PG",
                  "Boys PG",
                  "Near Metro",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`search-category-tab ${selectedCategory === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input Fields Grid */}
            <div className="search-fields-grid">
              {/* 1. State / Region */}
              <div className="search-input-box">
                <label>🏛️ State / Region</label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    const st = e.target.value;
                    setSelectedState(st);
                    if (st !== "All") {
                      const citiesInState = STATE_CITY_MAP[st] || [];
                      if (!citiesInState.includes(selectedCity)) {
                        setSelectedCity("All");
                      }
                    }
                  }}
                >
                  <option value="All">All States (18 Regions)</option>
                  {STATES_LIST.map((st) => (
                    <option key={st} value={st}>
                      {st} ({STATE_CITY_MAP[st]?.length} {STATE_CITY_MAP[st]?.length === 1 ? "Hub" : "Hubs"})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Target City */}
              <div className="search-input-box">
                <label>📍 Target Education Hub</label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    const city = e.target.value;
                    setSelectedCity(city);
                    if (city !== "All") {
                      const found = Object.entries(STATE_CITY_MAP).find(([st, cities]) =>
                        cities.includes(city),
                      );
                      if (found) setSelectedState(found[0]);
                    }
                  }}
                >
                  <option value="All">
                    {selectedState === "All"
                      ? "All 36 University Hubs"
                      : `All Hubs in ${selectedState}`}
                  </option>
                  {selectedState !== "All" ? (
                    (STATE_CITY_MAP[selectedState] || []).map((cityName) => {
                      const cityObj = CITIES_LIST.find((c) => c.name === cityName);
                      return (
                        <option key={cityName} value={cityName}>
                          {cityName} {cityObj ? `(${cityObj.tier === 1 ? "Tier 1" : "Tier 2"})` : ""}
                        </option>
                      );
                    })
                  ) : (
                    STATES_LIST.map((st) => (
                      <optgroup
                        key={st}
                        label={`${st} (${STATE_CITY_MAP[st]?.length} ${STATE_CITY_MAP[st]?.length === 1 ? "Hub" : "Hubs"})`}
                      >
                        {STATE_CITY_MAP[st].map((cityName) => {
                          const cityObj = CITIES_LIST.find((c) => c.name === cityName);
                          return (
                            <option key={cityName} value={cityName}>
                              {cityName} {cityObj?.tier === 1 ? "★" : ""}
                            </option>
                          );
                        })}
                      </optgroup>
                    ))
                  )}
                </select>
              </div>

              {/* 3. Locality / Campus */}
              <div className="search-input-box">
                <label>🎓 Campus / Locality</label>
                <input
                  type="text"
                  placeholder="e.g. Powai, North Campus, HSR"
                  value={searchLocality}
                  onChange={(e) => setSearchLocality(e.target.value)}
                />
              </div>

              {/* 4. Max Monthly Budget */}
              <div className="search-input-box">
                <label>
                  💰 Max Budget:{" "}
                  <strong className="data-mono" style={{ color: "#0A58F6" }}>
                    ₹{budgetMax.toLocaleString("en-IN")}/mo
                  </strong>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#0A58F6",
                    height: "6px",
                    marginTop: "4px",
                  }}
                />
              </div>

              {/* 5. Action Button */}
              <button
                onClick={() => {
                  if (selectedCity && selectedCity !== "All") {
                    const slug =
                      CITY_SLUGS[selectedCity] ||
                      selectedCity.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    navigate(`/rooms/${slug}`);
                  } else if (
                    selectedState !== "All" &&
                    STATE_CITY_MAP[selectedState]?.length > 0
                  ) {
                    const firstCity = STATE_CITY_MAP[selectedState][0];
                    const slug =
                      CITY_SLUGS[firstCity] ||
                      firstCity.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    navigate(`/rooms/${slug}`);
                  } else {
                    const target = document.getElementById("listings");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="pill-btn-primary"
                style={{
                  background:
                    "linear-gradient(135deg, #0A58F6 0%, #0843BA 100%)",
                  padding: "0.85rem 1.6rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  boxShadow: "0 4px 20px rgba(10, 88, 246, 0.45)",
                  height: "100%",
                  minHeight: "52px",
                  whiteSpace: "nowrap",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search Rooms</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wave Shape Break Cutting into White/Canvas Section Below */}
        <div className="hero-wave-container">
          <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
            <path
              d="M0,35 C320,85 540,10 780,55 C1040,100 1280,25 1440,65 L1440,90 L0,90 Z"
              fill="var(--bg-canvas)"
            />
          </svg>
        </div>
      </section>

      {/* 3. AUTO-SCROLLING CITY CAROUSEL */}
      <section
        id="cities"
        style={{
          padding: "2.5rem 0 3rem 0",
          background: "var(--bg-canvas)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          overflow: "hidden",
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 1.5rem 1.5rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
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
              Student Hubs
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
              Explore rooms in <span className="headline-accent">major</span>{" "}
              education clusters
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Hover to pause • Click city for dedicated listings
            </span>
            <Link
              to="/cities"
              className="pill-btn-secondary"
              style={{
                fontSize: "0.82rem",
                padding: "0.35rem 0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              View All Cities &rarr;
            </Link>
            <button
              onClick={() => navigate("/rooms/bengaluru")}
              className="pill-btn-secondary"
              style={{ fontSize: "0.82rem", padding: "0.35rem 0.95rem" }}
            >
              Explore Bengaluru &rarr;
            </button>
          </div>
        </div>

        {/* Endless Marquee Track */}
        <div className="city-scroller-container">
          <div className="city-scroller-track">
            {/* Duplicated 2x for seamless continuous infinite scroll */}
            {[...CITIES, ...CITIES].map((city, idx) => (
              <div
                key={`${city.name}-${idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const slug =
                    CITY_SLUGS[city.name] ||
                    city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  navigate(`/rooms/${slug}`);
                }}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const slug =
                      CITY_SLUGS[city.name] ||
                      city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    navigate(`/rooms/${slug}`);
                  }
                }}
                className="basera-card"
                style={{
                  width: "280px",
                  height: "360px",
                  position: "relative",
                  flexShrink: 0,
                  cursor: "pointer",
                  borderRadius: "24px",
                }}
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="curated-photo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
                {/* Gradient Scrim for readable text */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1.4rem",
                    textAlign: "left",
                    color: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {city.name}
                    </span>
                    <span
                      className="pill-chip pill-chip-match"
                      style={{
                        color: "#FFFFFF",
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {city.roomCount}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255, 255, 255, 0.75)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {city.hubs}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "rgba(255, 255, 255, 0.85)",
                      }}
                    >
                      Starting from{" "}
                      <strong
                        className="data-mono"
                        style={{ color: "#FDBA74" }}
                      >
                        {city.startPrice}
                      </strong>
                    </span>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: "#93C5FD",
                        fontWeight: 700,
                      }}
                    >
                      Explore {city.name} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section
        id="how-it-works"
        style={{
          padding: "5rem 1.5rem",
          background: "var(--bg-canvas)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--accent-primary)",
            }}
          >
            Simple 3-Step Journey
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              margin: "0.4rem 0 1rem 0",
            }}
          >
            How Basera matches your{" "}
            <span className="headline-accent">lifestyle</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              maxWidth: "620px",
              margin: "0 auto 3.5rem auto",
            }}
          >
            Moving to a new city shouldn't be a gamble. We replace awkward
            Facebook group messages with deep multi-factor compatibility.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            {/* Step 1 */}
            <div
              className="basera-card"
              style={{
                padding: "2.4rem",
                background: "var(--bg-surface)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "9999px",
                  background: "var(--accent-primary-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                01
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.6rem",
                }}
              >
                Declare Your Daily Rhythm
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Share your actual habits without judgement: sleep & wake hours,
                chore frequency, smoking/drinking preferences, guest comfort,
                and campus budget.
              </p>
              <div
                style={{
                  marginTop: "1.2rem",
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                }}
              >
                <span className="pill-chip pill-chip-neutral">
                  Night Owl / Early Riser
                </span>
                <span className="pill-chip pill-chip-neutral">
                  Veg / Non-Veg
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="basera-card"
              style={{
                padding: "2.4rem",
                background: "var(--bg-surface)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "9999px",
                  background: "var(--accent-warm-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--accent-warm)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                02
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.6rem",
                }}
              >
                AI Evaluates Compatibility
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Our 7-factor engine computes your mutual score. Transparent
                factor coverage lets you inspect exactly why you matched — no
                mysterious black box algorithms.
              </p>
              <div
                style={{
                  marginTop: "1.2rem",
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                }}
              >
                <span className="pill-chip pill-chip-match">
                  7-Factor Weighted Engine
                </span>
                <span className="pill-chip pill-chip-match">
                  Confidence Score
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="basera-card"
              style={{
                padding: "2.4rem",
                background: "var(--bg-surface)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "9999px",
                  background: "var(--accent-success-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "var(--accent-success)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                03
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.6rem",
                }}
              >
                Chat & Lock Your Room
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Connect through verified in-app chat with zero spam or phone
                number exposure. Tour the room together, agree on house rules,
                and settle in with peace of mind.
              </p>
              <div
                style={{
                  marginTop: "1.2rem",
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                }}
              >
                <span className="pill-chip pill-chip-verified">
                  Verified In-App Chat
                </span>
                <span className="pill-chip pill-chip-verified">
                  Zero Brokerage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED ROOMS & PGS (OYO / AIRBNB STYLE HORIZONTAL SCROLL / GRID) */}
      <section
        id="listings"
        style={{
          padding: "5rem 1.5rem",
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          {/* Section Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "2.4rem",
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
                Verified Stays & PGs
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginTop: "0.3rem",
                }}
              >
                Featured listings in{" "}
                <span className="headline-accent">
                  {selectedCity === "All"
                    ? selectedState === "All"
                      ? "prime student areas"
                      : selectedState
                    : selectedCity}
                </span>
              </h2>
            </div>

            {/* City Quick Filter Pills */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {selectedState !== "All" && (
                <button
                  onClick={() => {
                    setSelectedState("All");
                    setSelectedCity("All");
                  }}
                  style={{
                    borderRadius: "9999px",
                    padding: "0.38rem 0.85rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    background: "rgba(239, 68, 68, 0.12)",
                    color: "#EF4444",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  title="Clear state filter"
                >
                  ✕ {selectedState}
                </button>
              )}
              {(selectedState !== "All"
                ? ["All", ...(STATE_CITY_MAP[selectedState] || [])]
                : [
                    "All",
                    "Delhi NCR",
                    "Bengaluru",
                    "Pune",
                    "Mumbai",
                    "Hyderabad",
                    "Kota",
                    "Chennai",
                    "Kolkata",
                    "Jaipur",
                  ]
              ).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  style={{
                    borderRadius: "9999px",
                    padding: "0.4rem 0.95rem",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    background:
                      selectedCity === c
                        ? "var(--accent-primary)"
                        : "var(--bg-surface-subtle)",
                    color:
                      selectedCity === c ? "#FFFFFF" : "var(--text-secondary)",
                    border: "1px solid var(--border-subtle)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Room Cards Grid */}
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
                {/* 2px Gradient Bar on Top Edge */}
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    background: "var(--gradient-accent)",
                  }}
                />

                {/* Photo Container */}
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
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                    }}
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
                      color: "var(--text-muted)",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {listing.distance}
                  </p>

                  {/* Amenities Chips */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      flexWrap: "wrap",
                      marginBottom: "1.2rem",
                    }}
                  >
                    {listing.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="pill-chip pill-chip-neutral"
                        style={{ fontSize: "0.72rem" }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer: Price & CTA */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          display: "block",
                        }}
                      >
                        Monthly Rent
                      </span>
                      <span
                        className="data-mono"
                        style={{
                          fontSize: "1.35rem",
                          fontWeight: 700,
                          color: "var(--accent-primary)",
                        }}
                      >
                        ₹{listing.price.toLocaleString("en-IN")}
                      </span>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {" "}
                        / mo
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenAuth("signup")}
                      className="pill-btn-secondary"
                      style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem" }}
                    >
                      Connect Flatmate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPATIBILITY / MATCH-SCORING EXPLAINER (TIED TO REAL ENGINE) */}
      <section
        id="matching"
        style={{
          padding: "5.5rem 1.5rem",
          background: "var(--bg-canvas)",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span
              style={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--accent-primary)",
              }}
            >
              The Matching Engine
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                margin: "0.4rem 0 1rem 0",
              }}
            >
              How our <span className="headline-accent">7-factor</span>{" "}
              algorithm evaluates harmony
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                maxWidth: "660px",
                margin: "0 auto",
              }}
            >
              Roommate friction doesn't happen over rent — it happens over dirty
              dishes at midnight and unannounced guests. We score what actually
              counts.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Left: Factor Weights Breakdown */}
            <div
              className="basera-card"
              style={{
                padding: "2.4rem",
                background: "var(--bg-surface)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Weighted Evaluation Criteria
                  </h3>
                  <p
                    style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}
                  >
                    Total Score: 100 Points • Fair Normalization
                  </p>
                </div>
                <span className="pill-chip pill-chip-match">
                  server/services/matchingEngine.js
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                {MATCHING_FACTORS.map((factor) => (
                  <div
                    key={factor.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {factor.name}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                        }}
                      >
                        <span
                          className="data-mono"
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          Weight: {factor.weight}%
                        </span>
                        <span
                          className="data-mono"
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "var(--accent-primary)",
                          }}
                        >
                          {factor.score}%
                        </span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div
                      style={{
                        width: "100%",
                        height: "7px",
                        background: "var(--bg-surface-subtle)",
                        borderRadius: "9999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${factor.score}%`,
                          height: "100%",
                          background:
                            factor.score >= 95
                              ? "var(--accent-primary)"
                              : "var(--accent-warm)",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {factor.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Sample Match Card with Real factorCoverage & confidenceLabel */}
            <div
              className="basera-card"
              style={{
                padding: "2.4rem",
                background: "var(--bg-surface)",
                textAlign: "left",
                position: "sticky",
                top: "90px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <span className="pill-chip pill-chip-verified">
                  Simulated Candidate Pair
                </span>
                <span
                  className="data-mono"
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                >
                  PRD §8 Verification
                </span>
              </div>

              {/* Match Header with Profiles */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.8rem",
                }}
              >
                {/* Person 1 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "9999px",
                      background:
                        "linear-gradient(135deg, #38BDF8 0%, #1A53B8 100%)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                    }}
                  >
                    AR
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--text-primary)",
                        display: "block",
                      }}
                    >
                      Aarav R.
                    </strong>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      DU Hansraj • Seeker
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    color: "var(--accent-warm)",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                  }}
                >
                  ⇄
                </div>

                {/* Person 2 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "9999px",
                      background:
                        "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                    }}
                  >
                    RS
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--text-primary)",
                        display: "block",
                      }}
                    >
                      Rohan S.
                    </strong>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      SRCC • Resident
                    </span>
                  </div>
                </div>
              </div>

              {/* Big Score Box */}
              <div
                style={{
                  background: "var(--bg-surface-subtle)",
                  borderRadius: "20px",
                  padding: "1.4rem",
                  marginBottom: "1.5rem",
                  border: "1px solid var(--border-subtle)",
                  textAlign: "center",
                }}
              >
                <span
                  className="data-mono"
                  style={{
                    fontSize: "2.8rem",
                    fontWeight: 800,
                    color: "var(--accent-primary)",
                    lineHeight: 1,
                  }}
                >
                  94%
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    display: "block",
                    marginTop: "0.2rem",
                  }}
                >
                  Overall Compatibility Score
                </span>

                {/* REAL FACTOR COVERAGE METADATA CONCEPT */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    marginTop: "0.6rem",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "9999px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "9999px",
                      background: "var(--accent-success)",
                    }}
                  />
                  <span>
                    Based on <strong>7 of 7 factors</strong> (High Confidence)
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: "0.4rem",
                  }}
                >
                  Factor Coverage: 100% • Evaluated Points: 100 / 100
                </div>
              </div>

              {/* Breakdown Points */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  marginBottom: "1.5rem",
                  fontSize: "0.84rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>✓ Mutual Chronotype</span>
                  <strong style={{ color: "var(--accent-success)" }}>
                    Night Owls (1 AM)
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>✓ Cleanliness CADENCE</span>
                  <strong style={{ color: "var(--accent-success)" }}>
                    Spick & Span (Daily)
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>✓ Substance Rules</span>
                  <strong style={{ color: "var(--accent-success)" }}>
                    Strictly Non-Smoking
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>✓ Food Sharing</span>
                  <strong style={{ color: "var(--accent-success)" }}>
                    Both Pure Veg
                  </strong>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth("signup")}
                className="pill-btn-primary"
                style={{ width: "100%", padding: "0.75rem" }}
              >
                Unlock My Personalized Matches &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ANIMATED TRUST / STATS BAND — SOLID VIVID BLUE SECTION FOR COLOR CONFIDENCE */}
      <section
        ref={statsRef}
        style={{
          padding: "5rem 1.5rem",
          background: "linear-gradient(135deg, #0E44C4 0%, #092E8C 100%)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ padding: "0 1rem" }}>
            <span
              className="data-mono"
              style={{
                fontSize: "clamp(2.5rem, 4.2vw, 3.4rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              {counters.students.toLocaleString("en-IN")}+
            </span>
            <span
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: "0.3rem",
              }}
            >
              Students Matched
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              Across 6 metro education clusters
            </span>
          </div>

          <div style={{ padding: "0 1rem" }}>
            <span
              className="data-mono"
              style={{
                fontSize: "clamp(2.5rem, 4.2vw, 3.4rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              {counters.rooms.toLocaleString("en-IN")}+
            </span>
            <span
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: "0.3rem",
              }}
            >
              Verified Rooms & PGs
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              Physically audited & landlord verified
            </span>
          </div>

          <div style={{ padding: "0 1rem" }}>
            <span
              className="data-mono"
              style={{
                fontSize: "clamp(2.5rem, 4.2vw, 3.4rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              {counters.campuses}+
            </span>
            <span
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: "0.3rem",
              }}
            >
              University Campuses
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              DU, IITs, Christ, COEP, BITS, NMIMS
            </span>
          </div>

          <div style={{ padding: "0 1rem" }}>
            <span
              className="data-mono"
              style={{
                fontSize: "clamp(2.5rem, 4.2vw, 3.4rem)",
                fontWeight: 800,
                color: "#FDBA74",
                letterSpacing: "-0.03em",
              }}
            >
              {counters.rating} / 5.0
            </span>
            <span
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: "0.3rem",
              }}
            >
              Student Rating
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              From 1,800+ authenticated reviews
            </span>
          </div>
        </div>
      </section>

      {/* 8. STUDENT REVIEWS / TESTIMONIALS */}
      <section
        id="reviews"
        style={{
          padding: "5.5rem 1.5rem",
          background: "var(--bg-canvas)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--accent-primary)",
            }}
          >
            Student Voices
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              margin: "0.4rem 0 1rem 0",
            }}
          >
            Real stories from students who found their{" "}
            <span className="headline-accent">sanctuary</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 3.5rem auto",
            }}
          >
            No fake stock testimonials. Authentic feedback from students settled
            into university life.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              textAlign: "left",
            }}
          >
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="basera-card"
                style={{
                  padding: "2.2rem",
                  background: "var(--bg-surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Rating Stars & Compatibility chip */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.2rem",
                    }}
                  >
                    <div style={{ color: "#F59E0B", fontSize: "0.95rem" }}>
                      ★★★★★
                    </div>
                    <span className="pill-chip pill-chip-match">
                      <span className="data-mono">{review.score}%</span> Harmony
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      marginBottom: "1.5rem",
                    }}
                  >
                    "{review.text}"
                  </p>
                </div>

                {/* Author Info with Initials Avatar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "9999px",
                      background: "var(--accent-primary-subtle)",
                      color: "var(--accent-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--text-primary)",
                        display: "block",
                      }}
                    >
                      {review.name}
                    </strong>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                        display: "block",
                      }}
                    >
                      {review.role}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--accent-success)",
                        fontWeight: 600,
                      }}
                    >
                      ✓ {review.verified}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DAWN HORIZON CTA BAND */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "var(--bg-canvas)",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            borderRadius: "32px",
            background: "linear-gradient(135deg, #0D45C9 0%, #08349E 100%)",
            color: "#FFFFFF",
            padding: "4.5rem 2rem",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(13, 69, 201, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle warm glow radial background */}
          <div
            style={{
              position: "absolute",
              top: "-40%",
              right: "-10%",
              width: "400px",
              height: "400px",
              borderRadius: "9999px",
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#FDBA74",
                background: "rgba(255, 255, 255, 0.12)",
                padding: "0.35rem 0.95rem",
                borderRadius: "9999px",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            >
              Join Basera Today
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                marginBottom: "1rem",
              }}
            >
              Ready to find a place that feels like{" "}
              <span className="headline-accent" style={{ color: "#FDBA74" }}>
                home
              </span>
              ?
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: "2.4rem",
                lineHeight: 1.6,
              }}
            >
              Set up your student profile in 3 minutes. Unlock verified PGs,
              lifestyle matches, and zero brokerage peace of mind.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => onOpenAuth("signup")}
                style={{
                  background: "#FFFFFF",
                  color: "#0D45C9",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "0.85rem 2.2rem",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.15)";
                }}
              >
                Create Student Account
              </button>
              <button
                onClick={() => onOpenAuth("login")}
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "0.85rem 2rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.12)")
                }
              >
                Sign In With Email
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COMPREHENSIVE FOOTER */}
      <footer
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          padding: "4.5rem 1.5rem 2rem 1.5rem",
          textAlign: "left",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "3rem",
              marginBottom: "3.5rem",
            }}
          >
            {/* Brand Column */}
            <div style={{ gridColumn: "span 2" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "var(--bg-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <BaseraLogo size={22} />
                </div>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                  }}
                >
                  Basera
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  maxWidth: "340px",
                  marginBottom: "1.4rem",
                }}
              >
                Basera (बसेरा) — A sanctuary to settle. Empowering university
                students across India to discover compatible roommates and
                verified PG homes without brokerage or compromise.
              </p>
              {/* Social / Contact Icons (Generic SVGs) */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {["globe", "mail", "message-circle"].map((icon, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "9999px",
                      background: "var(--bg-surface-subtle)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    {icon === "globe" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {icon === "mail" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {icon === "message-circle" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-primary)",
                  marginBottom: "1.2rem",
                }}
              >
                Platform
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.7rem",
                  fontSize: "0.88rem",
                }}
              >
                <li>
                  <Link
                    to="/cities"
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Browse Cities
                  </Link>
                </li>
                <li>
                  <a
                    href="#listings"
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Verified Rooms
                  </a>
                </li>
                <li>
                  <a
                    href="#matching"
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Compatibility Engine
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenAuth("signup");
                    }}
                    style={{
                      textDecoration: "none",
                      color: "var(--accent-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Landlord Listing Portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-primary)",
                  marginBottom: "1.2rem",
                }}
              >
                Company
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.7rem",
                  fontSize: "0.88rem",
                }}
              >
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    College Ambassadors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Student Safety Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Support & Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-primary)",
                  marginBottom: "1.2rem",
                }}
              >
                Legal & Safety
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.7rem",
                  fontSize: "0.88rem",
                }}
              >
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Cookie Preferences
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div
            style={{
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
            }}
          >
            <span>
              &copy; {new Date().getFullYear()} Basera Housing Technologies.
              Made with care for students moving to new horizons.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span>Zero Brokerage Verified</span>
              <span>100% Encrypted Identity Verification</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
