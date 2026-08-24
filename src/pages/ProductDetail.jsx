import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useApp } from "@/store/AppContext";
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, toast, state } = useApp();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [tab, setTab] = useState("description");
  const [sizeError, setSizeError] = useState(false);
  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          paddingTop: "80px",
          background: "var(--background)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Product not found
        </p>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }
  const inWishlist = state.wishlist.includes(product.id);
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  const initColor = selectedColor || product.colors[0].name;
  const colorObj =
    product.colors.find((c) => c.name === initColor) || product.colors[0];
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart({ product, size: selectedSize, color: initColor, quantity: qty });
    toast(`${product.name} (${selectedSize}) added to cart`);
  };
  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart({ product, size: selectedSize, color: initColor, quantity: qty });
    window.location.href = "/checkout";
  };
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;
  return (
    <div style={{ background: "var(--background)", paddingTop: "70px" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "1.25rem 2rem 0",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        {[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          {
            label: product.subcategory,
            to: `/shop?category=${product.category}`,
          },
          { label: product.name, to: "#" },
        ].map((crumb, i, arr) => (
          <span
            key={crumb.label}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {i < arr.length - 1 ? (
              <>
                <Link
                  to={crumb.to}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--muted-foreground)",
                    textDecoration: "none",
                  }}
                >
                  {crumb.label}
                </Link>
                <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>
                  /
                </span>
              </>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--foreground)",
                }}
              >
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="product-detail-grid"
      >
        {/* Gallery */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Thumbnails */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
              flexShrink: 0,
            }}
          >
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: "64px",
                  height: "80px",
                  overflow: "hidden",
                  border:
                    imgIdx === i
                      ? "1.5px solid var(--foreground)"
                      : "1.5px solid transparent",
                  borderRadius: "var(--radius)",
                  cursor: "pointer",
                  background: "var(--muted)",
                  padding: 0,
                  transition: "border-color 0.2s",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              borderRadius: "var(--radius)",
              cursor: zoomed ? "zoom-out" : "zoom-in",
              background: "var(--muted)",
            }}
            onClick={() => setZoomed(!zoomed)}
          >
            <img
              src={product.images[imgIdx]}
              alt={product.name}
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: zoomed ? "scale(1.5)" : "scale(1)",
              }}
            />
            {product.isNew && (
              <span
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "var(--foreground)",
                  color: "var(--primary-foreground)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "var(--radius)",
                }}
              >
                New
              </span>
            )}
          </div>
        </div>

        {/* Product info */}
        <div style={{ position: "sticky", top: "90px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            {product.subcategory}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.25rem",
              fontWeight: 500,
              color: "var(--foreground)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.5 3.9 11l.6-3.5L2 5l3.5-.5L7 1z"
                    fill={
                      star <= Math.round(product.rating)
                        ? "var(--accent)"
                        : "var(--muted)"
                    }
                    stroke={
                      star <= Math.round(product.rating)
                        ? "var(--accent)"
                        : "var(--border)"
                    }
                    strokeWidth="0.5"
                  />
                </svg>
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--muted-foreground)",
              }}
            >
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 500,
                color: product.isSale ? "var(--accent)" : "var(--foreground)",
              }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--muted-foreground)",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.originalPrice}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Color selector */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--foreground)",
                marginBottom: "0.75rem",
                letterSpacing: "0.05em",
              }}
            >
              Color:{" "}
              <span
                style={{ fontWeight: 400, color: "var(--muted-foreground)" }}
              >
                {initColor}
              </span>
            </p>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: c.hex,
                    border:
                      initColor === c.name
                        ? "2px solid var(--foreground)"
                        : "2px solid transparent",
                    outline:
                      initColor === c.name
                        ? "2px solid var(--background)"
                        : "none",
                    outlineOffset: "-3px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: sizeError ? "#dc2626" : "var(--foreground)",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                }}
              >
                {sizeError ? "Please select a size" : "Size"}
              </p>
              <button
                onClick={() => setSizeGuide(true)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Size Guide
              </button>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    padding: "0.5rem 0.875rem",
                    minWidth: "48px",
                    background:
                      selectedSize === size ? "var(--primary)" : "var(--card)",
                    color:
                      selectedSize === size
                        ? "var(--primary-foreground)"
                        : "var(--foreground)",
                    border:
                      selectedSize === size
                        ? "1px solid var(--primary)"
                        : sizeError
                          ? "1px solid #dc2626"
                          : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + wishlist row */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "0.875rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                height: "48px",
              }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{
                  width: "44px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                −
              </button>
              <span
                style={{
                  width: "44px",
                  textAlign: "center",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  borderLeft: "1.5px solid var(--border)",
                  borderRight: "1.5px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                style={{
                  width: "44px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast(
                  inWishlist
                    ? "Removed from wishlist"
                    : `${product.name} saved to wishlist`,
                );
              }}
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--card)",
                border: "1.5px solid var(--border)",
                cursor: "pointer",
                color: inWishlist ? "#ef4444" : "var(--muted-foreground)",
                transition: "all 0.2s",
                borderRadius: "var(--radius)",
                flexShrink: 0,
              }}
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 16.5S3 12 3 7a4 4 0 017-2.65A4 4 0 0117 7c0 5-7 9.5-7 9.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill={inWishlist ? "currentColor" : "none"}
                />
              </svg>
            </button>
          </div>

          {/* CTAs */}
          <div
            style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}
          >
            <button
              onClick={handleAddToCart}
              className="btn-outline"
              style={{ flex: 1 }}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              Buy Now
            </button>
          </div>

          {/* Shipping note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.875rem 1rem",
              background: "var(--secondary)",
              borderRadius: "var(--radius)",
              marginBottom: "2rem",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect
                x="1"
                y="6"
                width="12"
                height="9"
                rx="1"
                stroke="var(--muted-foreground)"
                strokeWidth="1.5"
              />
              <path
                d="M13 10h2l2 2v3h-4V10z"
                stroke="var(--muted-foreground)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M4 6V4a3 3 0 016 0v2"
                stroke="var(--muted-foreground)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--muted-foreground)",
              }}
            >
              Free shipping on orders over $150 · Free returns within 30 days
            </p>
          </div>

          {/* Tabs */}
          <div>
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--border)",
                marginBottom: "1.25rem",
              }}
            >
              {["description", "details", "shipping"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "capitalize",
                    padding: "0.625rem 1rem 0.625rem 0",
                    marginRight: "1.5rem",
                    background: "none",
                    border: "none",
                    borderBottom:
                      tab === t
                        ? "2px solid var(--foreground)"
                        : "2px solid transparent",
                    color:
                      tab === t
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "description" && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.8,
                }}
              >
                {product.description}
              </p>
            )}
            {tab === "details" && (
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {product.details.map((d) => (
                  <li
                    key={d}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--muted-foreground)",
                      display: "flex",
                      gap: "0.625rem",
                      alignItems: "baseline",
                    }}
                  >
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                      —
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
            {tab === "shipping" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {[
                  {
                    label: "Standard Shipping",
                    desc: "Free on orders over $150. $8 otherwise. 5–7 business days.",
                  },
                  {
                    label: "Express Shipping",
                    desc: "$18. 2–3 business days.",
                  },
                  {
                    label: "Free Returns",
                    desc: "Within 30 days of delivery. Items must be unworn and in original packaging.",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--muted-foreground)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "4rem 2rem 6rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: "2rem",
          }}
        >
          You May Also Like
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem 1rem",
          }}
          className="related-grid"
        >
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Size Guide Modal */}
      {sizeGuide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(28,24,20,0.6)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setSizeGuide(false)}
        >
          <div
            style={{
              background: "var(--card)",
              borderRadius: "var(--radius)",
              padding: "2.5rem",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                Size Guide
              </h3>
              <button
                onClick={() => setSizeGuide(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted-foreground)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
              }}
            >
              <thead>
                <tr>
                  {["Size", "Bust (cm)", "Waist (cm)", "Hip (cm)"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.625rem 0.5rem",
                        borderBottom: "1px solid var(--border)",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS", "80–84", "62–66", "87–91"],
                  ["S", "84–88", "66–70", "91–95"],
                  ["M", "88–92", "70–74", "95–99"],
                  ["L", "92–96", "74–78", "99–103"],
                  ["XL", "96–100", "78–82", "103–107"],
                ].map((row, i) => (
                  <tr
                    key={row[0]}
                    style={{
                      background:
                        i % 2 === 0 ? "transparent" : "var(--secondary)",
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "0.625rem 0.5rem",
                          color:
                            j === 0
                              ? "var(--foreground)"
                              : "var(--muted-foreground)",
                          fontWeight: j === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
