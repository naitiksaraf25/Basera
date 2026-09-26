import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { BaseraLogo } from "./BaseraLogo";

export function Navbar({
  user,
  onOpenAuth,
  theme,
  toggleTheme,
  onSignOut,
  onNavigateToView,
  transparentOnTop = false,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [userDropdownOpen]);

  const isDark = theme === "dark";
  const isCitiesPage = location.pathname === "/cities";
  const isHomePage = location.pathname === "/";

  // Background computation: on homepage top it can be transparent or subtle,
  // but on all other pages and when scrolled, it always uses var(--nav-glass-bg)
  const navBg = scrolled || !transparentOnTop
    ? "var(--nav-glass-bg)"
    : "transparent";

  const navBorder = scrolled || !transparentOnTop
    ? "1px solid var(--nav-border)"
    : "1px solid transparent";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: navBg,
        backdropFilter: scrolled || !transparentOnTop ? "blur(18px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled || !transparentOnTop ? "blur(18px) saturate(180%)" : "none",
        borderBottom: navBorder,
        transition: "background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease",
        padding: "0.85rem 1.5rem",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none",
            color: "var(--text-primary)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "var(--bg-surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-subtle)",
              flexShrink: 0,
            }}
          >
            <BaseraLogo size={28} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              lineHeight: 1.15,
            }}
          >
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              Basera
            </span>
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Student Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.75rem",
          }}
          className="desktop-nav"
        >
          <Link
            to="/cities"
            style={{
              textDecoration: "none",
              color: isCitiesPage ? "var(--accent-primary)" : "var(--text-secondary)",
              fontSize: "0.92rem",
              fontWeight: isCitiesPage ? 700 : 500,
              position: "relative",
              paddingBottom: "2px",
            }}
          >
            Cities
            {isCitiesPage && (
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: "2px",
                  borderRadius: "2px",
                  background: "var(--accent-primary)",
                }}
              />
            )}
          </Link>

          {isHomePage ? (
            <>
              <a
                href="#how-it-works"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                How It Works
              </a>
              <a
                href="#listings"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                Verified Rooms
              </a>
              <a
                href="#matching"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                Compatibility Engine
              </a>
              <a
                href="#reviews"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                Reviews
              </a>
            </>
          ) : (
            <>
              <Link
                to="/#how-it-works"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                How It Works
              </Link>
              <Link
                to="/#listings"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                Verified Rooms
              </Link>
              <Link
                to="/#matching"
                style={{
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                }}
              >
                Compatibility Engine
              </Link>
            </>
          )}
        </nav>

        {/* Right Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="pill-btn-ghost"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
            style={{
              width: "40px",
              height: "40px",
              padding: 0,
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-surface-subtle)",
              border: "1px solid var(--border-subtle)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {isDark ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Conditional Auth Controls */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              {/* Standalone Visible Quick-Access Links: Find Matches & Active Chats */}
              <Link
                to="/app/matches"
                id="navbar-find-matches"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: location.pathname === "/app/matches"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                  background: location.pathname === "/app/matches"
                    ? "var(--accent-subtle)"
                    : "transparent",
                  border: "1px solid var(--border-subtle)",
                  transition: "all 0.18s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.background = "var(--bg-surface-subtle)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = location.pathname === "/app/matches"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.background = location.pathname === "/app/matches"
                    ? "var(--accent-subtle)"
                    : "transparent";
                }}
              >
                Find Matches
              </Link>

              <Link
                to="/app/chats"
                id="navbar-active-chats"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: location.pathname === "/app/chats"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                  background: location.pathname === "/app/chats"
                    ? "var(--accent-subtle)"
                    : "transparent",
                  border: "1px solid var(--border-subtle)",
                  transition: "all 0.18s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.background = "var(--bg-surface-subtle)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = location.pathname === "/app/chats"
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.background = location.pathname === "/app/chats"
                    ? "var(--accent-subtle)"
                    : "transparent";
                }}
              >
                Active Chats
              </Link>

              {/* Logged-In User Profile Pill & Dropdown */}
              <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                id="navbar-user-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.4rem 0.85rem 0.4rem 0.45rem",
                  borderRadius: "9999px",
                  background: "var(--bg-surface)",
                  border: "1.5px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "9999px",
                    background: "var(--accent-primary)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    maxWidth: "110px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.name?.split(" ")[0] || "Account"}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: userDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    color: "var(--text-muted)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "220px",
                    background: "var(--bg-surface)",
                    borderRadius: "16px",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "0.5rem",
                    zIndex: 150,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      padding: "0.6rem 0.8rem",
                      borderBottom: "1px solid var(--border-subtle)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {user.name || "User"}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        textTransform: "capitalize",
                      }}
                    >
                      {user.role || "Member"} •{" "}
                      {user.verificationStatus === "verified"
                        ? "Verified ✓"
                        : "Unverified"}
                    </div>
                  </div>

                  <Link
                    to="/app/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.55rem 0.8rem",
                      background: "none",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg-surface-subtle)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <span>👤</span> {user?.role === "landlord" ? "Property Listing" : "Profile & Preferences"}
                  </Link>

                  <Link
                    to="/app/verification"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.55rem 0.8rem",
                      background: "none",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg-surface-subtle)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <span>🛡️</span> Verification Status
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/app/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.55rem 0.8rem",
                        background: "none",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--accent-warm)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--bg-surface-subtle)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                    >
                      <span>👑</span> Admin Console
                    </Link>
                  )}

                  <div
                    style={{
                      borderTop: "1px solid var(--border-subtle)",
                      marginTop: "0.3rem",
                      paddingTop: "0.3rem",
                    }}
                  >
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onSignOut) onSignOut();
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.55rem 0.8rem",
                        background: "none",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#ef4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                    >
                      <span>🚪</span> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
            /* Logged-Out Visitor CTAs */
            <>
              <button
                onClick={() => onOpenAuth && onOpenAuth("login")}
                className="pill-btn-ghost"
                style={{
                  padding: "0.55rem 1.1rem",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth && onOpenAuth("signup")}
                className="pill-btn-primary"
                style={{
                  fontSize: "0.9rem",
                  padding: "0.6rem 1.35rem",
                  cursor: "pointer",
                }}
              >
                Get Started
              </button>
            </>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Open navigation menu"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
              cursor: "pointer",
              padding: "0.4rem",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.2rem 0.5rem 0.5rem 0.5rem",
            borderTop: "1px solid var(--border-subtle)",
            marginTop: "0.8rem",
            textAlign: "left",
          }}
          className="mobile-nav-drawer"
        >
          <Link
            to="/cities"
            style={{
              textDecoration: "none",
              color: isCitiesPage ? "var(--accent-primary)" : "var(--text-primary)",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            🏙️ All Cities
          </Link>
          <Link
            to="/#how-it-works"
            style={{
              textDecoration: "none",
              color: "var(--text-primary)",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            ⚡ How It Works
          </Link>
          <Link
            to="/#listings"
            style={{
              textDecoration: "none",
              color: "var(--text-primary)",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            🏠 Verified Rooms
          </Link>
          <Link
            to="/#matching"
            style={{
              textDecoration: "none",
              color: "var(--text-primary)",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            ✨ Compatibility Engine
          </Link>
          {user ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                marginTop: "0.5rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <Link
                to="/app/profile"
                style={{
                  textDecoration: "none",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                👤 {user.role === "landlord" ? "Property Listing" : "Profile & Preferences"}
              </Link>
              {user.role !== "landlord" && (
                <Link
                  to="/app/matches"
                  style={{
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  ✨ Find Roommate Matches
                </Link>
              )}
              <Link
                to="/app/chats"
                style={{
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                💬 Active Chats
              </Link>
              <Link
                to="/app/verification"
                style={{
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                🛡️ Verification Status
              </Link>
              <button
                onClick={() => {
                  if (onSignOut) onSignOut();
                }}
                className="pill-btn-ghost"
                style={{
                  color: "#ef4444",
                  fontWeight: 700,
                  justifyContent: "flex-start",
                  padding: "0.4rem 0",
                }}
              >
                🚪 Log Out
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "0.5rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <button
                onClick={() => onOpenAuth && onOpenAuth("login")}
                className="pill-btn-secondary"
                style={{ flex: 1, padding: "0.6rem" }}
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth("signup")}
                className="pill-btn-primary"
                style={{ flex: 1, padding: "0.6rem" }}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
