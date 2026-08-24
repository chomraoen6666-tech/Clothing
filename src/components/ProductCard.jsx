import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/store/AppContext";
function Stars({ rating, small }) {
  const size = small ? 11 : 13;
  return (
    <div style={{ display: "flex", gap: "1px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.27 2.57 2.83.41-2.05 2 .48 2.82L6 7.42l-2.53 1.38.48-2.82-2.05-2 2.83-.41L6 1z"
            fill={s <= Math.round(rating) ? "#C9A96E" : "var(--muted)"}
            stroke={s <= Math.round(rating) ? "#C9A96E" : "var(--border)"}
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
}
export default function ProductCard({ product }) {
  const { toggleWishlist, addToCart, toast, state } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const inWishlist = state.wishlist.includes(product.id);
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      size: product.sizes[0],
      color: product.colors[0].name,
      quantity: 1,
    });
    toast(`${product.name} added to cart`);
  };
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(
      inWishlist
        ? "Removed from wishlist"
        : `${product.name} saved to wishlist`,
    );
  };
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;
  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => {
        setHovered(true);
        if (product.images.length > 1) setImgIdx(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setImgIdx(0);
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          background: "var(--muted)",
          borderRadius: "var(--radius)",
          marginBottom: "0.875rem",
        }}
      >
        <img
          src={product.images[imgIdx] || product.images[0]}
          alt={product.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />

        {/* Top-left badges */}
        <div
          style={{
            position: "absolute",
            top: "0.625rem",
            left: "0.625rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.375rem",
          }}
        >
          {product.isNew && <span className="badge badge-dark">New</span>}
          {product.isBestseller && !product.isNew && (
            <span className="badge badge-muted">Best Seller</span>
          )}
          {discount && <span className="badge badge-accent">-{discount}%</span>}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute",
            top: "0.625rem",
            right: "0.625rem",
            background: "rgba(255,255,255,0.92)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: inWishlist ? "#ef4444" : "var(--muted-foreground)",
            transition: "all 0.2s ease",
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translateY(0) scale(1)"
              : "translateY(-4px) scale(0.85)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 13.5S2 9.5 2 5.5A3 3 0 018 3.35 3 3 0 0114 5.5c0 4-6 8-6 8z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill={inWishlist ? "currentColor" : "none"}
            />
          </svg>
        </button>

        {/* Quick Add overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.625rem",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <button
            onClick={handleQuickAdd}
            style={{
              width: "100%",
              background: "rgba(17,17,17,0.88)",
              color: "#fff",
              border: "none",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "0.75rem",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "background 0.15s",
              borderRadius: "calc(var(--radius) - 2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.375rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(17,17,17,1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(17,17,17,0.88)")
            }
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M4.5 5.5V4a2.5 2.5 0 015 0v1.5"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M2 5.5h10l-1 7H3l-1-7z"
                stroke="white"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.5rem",
            marginBottom: "0.3rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--foreground)",
              lineHeight: 1.35,
              flex: 1,
            }}
          >
            {product.name}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: product.isSale ? "var(--accent)" : "var(--foreground)",
              }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--muted-foreground)",
                  textDecoration: "line-through",
                }}
              >
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--muted-foreground)",
            marginBottom: "0.5rem",
          }}
        >
          {product.subcategory}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <Stars rating={product.rating} small />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.73rem",
              color: "var(--muted-foreground)",
            }}
          >
            ({product.reviewCount})
          </span>
        </div>

        {/* Color dots */}
        <div
          style={{
            display: "flex",
            gap: "0.35rem",
            marginTop: "0.5rem",
            alignItems: "center",
          }}
        >
          {product.colors.slice(0, 4).map((c) => (
            <div
              key={c.name}
              title={c.name}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: c.hex,
                border: "1px solid rgba(0,0,0,0.12)",
                flexShrink: 0,
              }}
            />
          ))}
          {product.colors.length > 4 && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                color: "var(--muted-foreground)",
              }}
            >
              +{product.colors.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
