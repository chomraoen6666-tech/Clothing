import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/store/AppContext";
const columns = [
  {
    heading: "Shop",
    links: [
      { label: "Women", to: "/shop?category=women" },
      { label: "Men", to: "/shop?category=men" },
      { label: "Accessories", to: "/shop?category=accessories" },
      { label: "New Arrivals", to: "/shop?category=new" },
      { label: "Sale", to: "/shop?category=sale" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Sustainability", to: "/about#sustainability" },
      { label: "Careers", to: "/about#careers" },
      { label: "Press", to: "/about#press" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact Us", to: "/contact" },
      { label: "Shipping & Returns", to: "/faq#shipping" },
      { label: "Size Guide", to: "/faq#sizing" },
    ],
  },
];
const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="2"
          y="2"
          width="14"
          height="14"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2a7 7 0 100 14c.7 0 1.37-.1 2-.28M9 2c-2.5 0-4.5 2-4.5 4.5 0 1.5.75 2.75 1.75 3.5L5 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9.5 9.5c.5-1.5 1.5-2.5 1.5-2.5s-.5 3.5-1 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M12 2c.5 2 2 3 4 3M8 7v7a3 3 0 103-3H8V7c1.5 0 3.5 0 4-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useApp();
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast("You're on the list — welcome to AURA.");
      setEmail("");
    }
  };
  return (
    <footer
      style={{
        background: "var(--foreground)",
        color: "var(--primary-foreground)",
        padding: "5rem 2rem 2.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top: Newsletter + Logo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            paddingBottom: "3.5rem",
            borderBottom: "1px solid rgba(247,243,238,0.1)",
            alignItems: "start",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(247,243,238,0.5)",
                marginBottom: "1rem",
              }}
            >
              Stay in the edit
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 500,
                color: "var(--primary-foreground)",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              The AURA Newsletter
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(247,243,238,0.6)",
                lineHeight: 1.7,
                marginBottom: "1.75rem",
                maxWidth: "380px",
              }}
            >
              New arrivals, curated edits, and the occasional story behind the
              pieces. No noise — just the good stuff.
            </p>
            {subscribed ? (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.02em",
                }}
              >
                ✓ You're on the list.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                style={{ display: "flex", gap: "0", maxWidth: "400px" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: "rgba(247,243,238,0.08)",
                    border: "1px solid rgba(247,243,238,0.15)",
                    borderRight: "none",
                    color: "var(--primary-foreground)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    padding: "0.75rem 1rem",
                    outline: "none",
                    borderRadius: "var(--radius) 0 0 var(--radius)",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "var(--accent)",
                    border: "1px solid var(--accent)",
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.75rem 1.25rem",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    whiteSpace: "nowrap",
                    borderRadius: "0 var(--radius) var(--radius) 0",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "1.5rem",
            }}
            className="items-start md:items-end"
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3.5rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "rgba(247,243,238,0.08)",
                userSelect: "none",
              }}
            >
              AURA
            </span>
            <div style={{ display: "flex", gap: "0.875rem" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    color: "rgba(247,243,238,0.5)",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--primary-foreground)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(247,243,238,0.5)")
                  }
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Nav columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            padding: "3rem 0 2.5rem",
            borderBottom: "1px solid rgba(247,243,238,0.08)",
          }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(247,243,238,0.4)",
                  marginBottom: "1.25rem",
                }}
              >
                {col.heading}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "rgba(247,243,238,0.65)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--primary-foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(247,243,238,0.65)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "rgba(247,243,238,0.3)",
            }}
          >
            © {new Date().getFullYear()} AURA. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "rgba(247,243,238,0.3)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgba(247,243,238,0.65)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(247,243,238,0.3)")
                  }
                >
                  {label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
