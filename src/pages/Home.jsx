import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products, categories, lookbookImages } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useApp } from "@/store/AppContext";
function useInView(threshold = 0.15) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      {
        threshold,
      },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return [setRef, inView];
}
export default function Home() {
  const { toast } = useApp();
  const [email, setEmail] = useState("");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [featRef, featInView] = useInView();
  const [bestRef, bestInView] = useInView();
  const [lookRef, lookInView] = useInView();
  const [promoRef, promoInView] = useInView();
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 3);
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast("Welcome to AURA. Expect good things.");
    setEmail("");
  };
  return (
    <div style={{ background: "var(--background)" }}>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          minHeight: "600px",
          overflow: "hidden",
          background: "#1A1814",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&h=1200&fit=crop&auto=format&q=80"
          alt="AURA Autumn Collection"
          onLoad={() => setHeroLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transition: "opacity 0.8s ease",
            opacity: heroLoaded ? 1 : 0,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(18,15,12,0.15) 0%, rgba(18,15,12,0.45) 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "100%",
            padding: "0 1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(247,243,238,0.7)",
              marginBottom: "1rem",
              animation: heroLoaded ? "fadeUp 0.8s 0.2s ease both" : "none",
            }}
          >
            Autumn / Winter 2025
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 500,
              color: "#F7F3EE",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
              animation: heroLoaded ? "fadeUp 0.8s 0.35s ease both" : "none",
            }}
          >
            Dressed
            <br />
            <em>without effort.</em>
          </h1>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              animation: heroLoaded ? "fadeUp 0.8s 0.5s ease both" : "none",
            }}
          >
            <Link
              to="/shop"
              style={{
                background: "#F7F3EE",
                color: "#1C1814",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.875rem 2.25rem",
                textDecoration: "none",
                transition: "all 0.25s ease",
                borderRadius: "var(--radius)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.color = "#F7F3EE";
                el.style.outline = "1px solid rgba(247,243,238,0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "#F7F3EE";
                el.style.color = "#1C1814";
                el.style.outline = "none";
              }}
            >
              Shop New Collection
            </Link>
            <Link
              to="/about"
              style={{
                background: "transparent",
                color: "rgba(247,243,238,0.85)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.875rem 2.25rem",
                textDecoration: "none",
                border: "1px solid rgba(247,243,238,0.3)",
                transition: "all 0.25s ease",
                borderRadius: "var(--radius)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(247,243,238,0.7)";
                el.style.color = "#F7F3EE";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(247,243,238,0.3)";
                el.style.color = "rgba(247,243,238,0.85)";
              }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            color: "rgba(247,243,238,0.5)",
            animation: heroLoaded ? "fadeIn 1s 1s ease both" : "none",
          }}
          className="hidden md:flex"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "rgba(247,243,238,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(247,243,238,0.6)",
                animation: "scrollLine 1.5s ease infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────────────── */}
      <section
        ref={featRef}
        style={{
          padding: "6rem 2rem",
          maxWidth: "1300px",
          margin: "0 auto",
          opacity: featInView ? 1 : 0,
          transform: featInView ? "none" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            Shop by Category
          </h2>
          <Link
            to="/shop"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              textDecoration: "none",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "0.125rem",
              transition: "color 0.2s",
            }}
          >
            View All
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
          className="grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                display: "block",
                textDecoration: "none",
                borderRadius: "var(--radius)",
                background: "var(--muted)",
                opacity: featInView ? 1 : 0,
                transform: featInView ? "none" : "translateY(20px)",
                transition: `all 0.6s ${i * 0.1}s ease`,
              }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition:
                    "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.07)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(18,15,12,0.55) 0%, transparent 50%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#F7F3EE",
                    marginBottom: "0.25rem",
                  }}
                >
                  {cat.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "rgba(247,243,238,0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {cat.count} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BEST SELLERS ────────────────────────────────────────────────── */}
      <section
        ref={bestRef}
        style={{
          padding: "4rem 2rem 6rem",
          background: "var(--secondary)",
          opacity: bestInView ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "3rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.5rem",
                }}
              >
                Most loved
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                Best Sellers
              </h2>
            </div>
            <Link
              to="/shop"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "0.125rem",
              }}
            >
              View All
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
            }}
            className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            {bestsellers.map((product, i) => (
              <div
                key={product.id}
                style={{
                  opacity: bestInView ? 1 : 0,
                  transform: bestInView ? "none" : "translateY(20px)",
                  transition: `all 0.6s ${i * 0.1}s ease`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMO BANNER ────────────────────────────────────────────────── */}
      <section
        ref={promoRef}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--foreground)",
          padding: "6rem 2rem",
          textAlign: "center",
          opacity: promoInView ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.25rem",
          }}
        >
          Limited Time
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 500,
            color: "var(--primary-foreground)",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          End of Season Sale.
          <br />
          <em>Up to 40% off.</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "rgba(247,243,238,0.6)",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          Last pieces in wool coats, linen essentials, and summer silks.
        </p>
        <Link
          to="/shop?category=sale"
          style={{
            display: "inline-block",
            background: "var(--accent)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "1rem 2.5rem",
            textDecoration: "none",
            transition: "opacity 0.25s ease",
            borderRadius: "var(--radius)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Shop the Sale
        </Link>
      </section>

      {/* ─── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "0.75rem",
              }}
            >
              Just in
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 500,
                color: "var(--foreground)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              New
              <br />
              Arrivals
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              The latest pieces from the AURA collection. Clean lines,
              considered fabrics, made to last.
            </p>
            <Link to="/shop?category=new" className="btn-primary">
              All New Arrivals
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
            className="grid-cols-1 sm:grid-cols-3"
          >
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOOKBOOK ─────────────────────────────────────────────────────── */}
      <section
        ref={lookRef}
        style={{
          padding: "4rem 2rem 6rem",
          background: "var(--secondary)",
          opacity: lookInView ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "0.75rem",
              }}
            >
              @aurastudio
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              The Lookbook
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gridTemplateRows: "repeat(2, 280px)",
              gap: "0.75rem",
            }}
            className="hidden md:grid"
          >
            {lookbookImages.map((img, i) => {
              const spans = [
                { col: "span 2", row: "span 2" },
                { col: "span 1", row: "span 1" },
                { col: "span 1", row: "span 1" },
                { col: "span 1", row: "span 1" },
                { col: "span 1", row: "span 1" },
                { col: "span 2", row: "span 2" },
              ];
              const span = spans[i] || { col: "span 1", row: "span 1" };
              return (
                <div
                  key={img.id}
                  style={{
                    gridColumn: span.col,
                    gridRow: span.row,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "var(--radius)",
                    background: "var(--muted)",
                    opacity: lookInView ? 1 : 0,
                    transform: lookInView ? "none" : "scale(0.97)",
                    transition: `all 0.6s ${i * 0.08}s ease`,
                    cursor: "pointer",
                  }}
                  className="image-hover-zoom"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    loading="lazy"
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
                      background: "rgba(18,15,12,0)",
                      transition: "background 0.3s ease",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "1rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(18,15,12,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(18,15,12,0)";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#F7F3EE",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                      className="lookbook-caption"
                    >
                      {img.caption}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: simple 2-col grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
            }}
            className="md:hidden"
          >
            {lookbookImages.slice(0, 4).map((img) => (
              <div
                key={img.id}
                style={{
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  borderRadius: "var(--radius)",
                  background: "var(--muted)",
                }}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.75rem",
            }}
          >
            Why AURA
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--foreground)",
            }}
          >
            Shopping made better
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
          }}
          className="benefits-grid"
        >
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect
                    x="2"
                    y="10"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M6 10V8a6 6 0 0112 0v2"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 13l3 3-3 3M20 16h5"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              title: "Free Shipping",
              body: "Free standard shipping on all orders over $150. Fast delivery to your door.",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9L14 2z"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              title: "Secure Payment",
              body: "All transactions are encrypted and protected. Shop with complete confidence.",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M5 14H2l5-10 4 6 3-3 5 8 3-4 3 3h-2"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 20h22"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 20v4M20 20v4"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              title: "Easy Returns",
              body: "Hassle-free 30-day returns. Not happy? Send it back, no questions asked.",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle
                    cx="14"
                    cy="11"
                    r="5"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M5 25c0-4.97 4.03-9 9-9s9 4.03 9 9"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 7l2-2M22 9h2M20 11l2 2"
                    stroke="var(--accent)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              title: "Expert Support",
              body: "Our styling team is here Mon–Fri, 9am–6pm ET to help you find the perfect piece.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                textAlign: "center",
                padding: "2rem 1.5rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                background: "var(--card)",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "none";
                el.style.borderColor = "var(--border)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  marginBottom: "0.625rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "6rem 2rem",
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}
        >
          Join the community
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
            color: "var(--foreground)",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          First to know,
          <br />
          <em>first to wear.</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
          }}
        >
          New arrivals, exclusive offers, and the stories behind our pieces —
          delivered to your inbox.
        </p>
        <form
          onSubmit={handleNewsletterSubmit}
          style={{
            display: "flex",
            gap: "0",
            maxWidth: "420px",
            margin: "0 auto",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRight: "none",
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              padding: "0.875rem 1rem",
              outline: "none",
              borderRadius: "var(--radius) 0 0 var(--radius)",
            }}
          />
          <button
            type="submit"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.875rem 1.5rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
              borderRadius: "0 var(--radius) var(--radius) 0",
            }}
          >
            Subscribe
          </button>
        </form>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
            marginTop: "1rem",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </section>

      <style>{`
        @keyframes scrollLine {
          0% { top: -40px; }
          100% { top: 100%; }
        }
        .image-hover-zoom:hover .lookbook-caption {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .grid-cols-1 { grid-template-columns: 1fr !important; }
          .grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .md\\:grid-cols-3 { grid-template-columns: 1fr !important; }
          .md\\:hidden { display: grid !important; }
          .hidden.md\\:grid { display: none !important; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
