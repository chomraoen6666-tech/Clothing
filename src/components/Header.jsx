// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/store/AppContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const { state, cartCount, toggleDark, setUser, toast } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const searchInputRef = useRef(null);
  const accountRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection for homepage hero dynamic styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input automatically when search opens
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Keyboard navigation & Outside Click handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAllMenus();
      }
    };

    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus on path change
  useEffect(() => {
    closeAllMenus();
  }, [location.pathname, location.search]);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
  };

  const toggleSearch = () => {
    const nextState = !searchOpen;
    closeAllMenus();
    setSearchOpen(nextState);
  };

  const toggleAccount = () => {
    const nextState = !accountOpen;
    closeAllMenus();
    setAccountOpen(nextState);
  };

  const toggleMobileMenu = () => {
    const nextState = !menuOpen;
    closeAllMenus();
    setMenuOpen(nextState);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      closeAllMenus();
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast("Signed out successfully");
    setAccountOpen(false);
  };

  const isTransparent =
    location.pathname === "/" && !scrolled && !menuOpen && !searchOpen;

  return (
    <>
      <header
        className={`site-header ${scrolled ? "scrolled" : ""} ${
          isTransparent ? "transparent" : ""
        }`}
      >
        <div className="header-inner">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Left: Logo */}
          <Link to="/" className="site-logo" onClick={closeAllMenus}>
            AURA
          </Link>

          {/* Center: Desktop Main Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions / Icons */}
          <div className="header-actions">
            {/* Search Icon */}
            <button
              type="button"
              className={`icon-btn ${searchOpen ? "active" : ""}`}
              onClick={toggleSearch}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Dark Mode Icon */}
            <button
              type="button"
              className="icon-btn desktop-only"
              onClick={toggleDark}
              aria-label={`Switch to ${state.darkMode ? "light" : "dark"} mode`}
            >
              {state.darkMode ? (
                /* Sun Icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" strokeLinecap="round" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* Account Menu */}
            <div className="account-menu-container desktop-only" ref={accountRef}>
              <button
                type="button"
                className="icon-btn"
                onClick={toggleAccount}
                aria-label="Account menu"
                aria-expanded={accountOpen}
              >
                {state.user ? (
                  <span className="user-initials">
                    {state.user.name ? state.user.name.slice(0, 2).toUpperCase() : "U"}
                  </span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M4 21v-1a7 7 0 0114 0v1" strokeLinecap="round" />
                  </svg>
                )}
              </button>

              {accountOpen && (
                <div className="account-dropdown">
                  {state.user ? (
                    <>
                      <div className="user-details">
                        <p className="name">{state.user.name}</p>
                        <p className="email">{state.user.email}</p>
                      </div>
                      <Link to="/account" className="dropdown-link" onClick={closeAllMenus}>
                        My Account
                      </Link>
                      <Link to="/account?tab=orders" className="dropdown-link" onClick={closeAllMenus}>
                        Orders
                      </Link>
                      <Link to="/account?tab=wishlist" className="dropdown-link" onClick={closeAllMenus}>
                        Wishlist
                      </Link>
                      <button type="button" className="dropdown-link logout-btn" onClick={handleLogout}>
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-link" onClick={closeAllMenus}>
                        Sign In
                      </Link>
                      <Link to="/register" className="dropdown-link highlight" onClick={closeAllMenus}>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to={state.user ? "/account?tab=wishlist" : "/login"}
              className="icon-btn desktop-only"
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={state.wishlist && state.wishlist.length > 0 ? "currentColor" : "none"}
                />
              </svg>
            </Link>

            {/* Cart Link with Badge */}
            <Link to="/cart" className="icon-btn cart-btn" aria-label={`Cart with ${cartCount} items`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        {searchOpen && (
          <div className="search-bar-wrapper">
            <form onSubmit={handleSearch} className="search-form">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="search-input-icon">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="search-input"
              />
              <button
                type="button"
                className="search-close-btn"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Backdrop Overlay */}
      <div className={`mobile-backdrop ${menuOpen ? "open" : ""}`} onClick={closeAllMenus} />

      {/* Mobile Slide-Out Menu */}
      <aside
        id="mobile-nav"
        className={`mobile-drawer ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-drawer-header">
          <span className="site-logo">AURA</span>
          <button
            type="button"
            className="icon-btn"
            onClick={closeAllMenus}
            aria-label="Close mobile menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Primary Navigation Links Only */}
        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `mobile-nav-item ${isActive ? "active" : ""}`
              }
              onClick={closeAllMenus}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <hr className="mobile-divider" />

        {/* Secondary Utility Actions */}
        <div className="mobile-drawer-footer">
          {state.user ? (
            <div className="mobile-user-block">
              <p className="user-name">{state.user.name}</p>
              <Link to="/account" className="mobile-sub-link" onClick={closeAllMenus}>My Account</Link>
              <Link to="/account?tab=wishlist" className="mobile-sub-link" onClick={closeAllMenus}>Wishlist</Link>
              <button type="button" className="mobile-logout-btn" onClick={handleLogout}>Sign Out</button>
            </div>
          ) : (
            <div className="mobile-auth-block">
              <Link to="/login" className="mobile-sub-link" onClick={closeAllMenus}>Sign In</Link>
              <Link to="/register" className="mobile-sub-link" onClick={closeAllMenus}>Create Account</Link>
            </div>
          )}

          <div className="mobile-theme-row">
            <span>Theme Mode</span>
            <button type="button" className="theme-toggle-btn" onClick={toggleDark}>
              {state.darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}