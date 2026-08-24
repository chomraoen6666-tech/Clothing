import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/store/AppContext";
export default function Cart() {
  const { state, removeFromCart, updateQty, toast } = useApp();
  const { cart } = state;
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 8;
  const tax = Math.round(subtotal * 0.08);
  const discountAmount = appliedDiscount?.amount ?? 0;
  const total = subtotal + shipping + tax - discountAmount;
  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === "AURA20") {
      setAppliedDiscount({ code, amount: Math.round(subtotal * 0.2) });
      toast("Discount applied — 20% off!");
    } else if (code === "WELCOME10") {
      setAppliedDiscount({ code, amount: Math.round(subtotal * 0.1) });
      toast("Discount applied — 10% off!");
    } else {
      toast("Invalid discount code", "error");
    }
    setDiscountCode("");
  };
  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          background: "var(--background)",
          textAlign: "center",
          padding: "120px 2rem 4rem",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "var(--muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.5rem",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M11 13.5V10a7 7 0 0114 0v3.5"
              stroke="var(--muted-foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M5 13.5h26l-2.5 15h-21L5 13.5z"
              stroke="var(--muted-foreground)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          Your cart is empty
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            maxWidth: "360px",
          }}
        >
          Looks like you haven't added anything yet. Let's fix that.
        </p>
        <Link
          to="/shop"
          className="btn-primary"
          style={{ marginTop: "0.5rem" }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }
  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        paddingTop: "70px",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.25rem",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: "0.5rem",
          }}
        >
          Shopping Cart
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            marginBottom: "3rem",
          }}
        >
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "3rem",
            alignItems: "start",
          }}
          className="cart-layout"
        >
          {/* Items */}
          <div>
            {cart.map((item, i) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderBottom:
                    i < cart.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "start",
                }}
              >
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{
                      width: "100px",
                      height: "130px",
                      objectFit: "cover",
                      borderRadius: "var(--radius)",
                      background: "var(--muted)",
                    }}
                  />
                </Link>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        color: "var(--foreground)",
                        textDecoration: "none",
                      }}
                    >
                      {item.product.name}
                    </Link>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "var(--foreground)",
                      }}
                    >
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {item.color} · Size {item.size}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "0.875rem",
                    }}
                  >
                    {/* Qty */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQty(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1,
                              )
                            : (() => {
                                removeFromCart(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                );
                                toast("Item removed from cart", "info");
                              })()
                        }
                        style={{
                          width: "34px",
                          height: "34px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--foreground)",
                          fontSize: "1.1rem",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: "36px",
                          textAlign: "center",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "var(--foreground)",
                          borderLeft: "1px solid var(--border)",
                          borderRight: "1px solid var(--border)",
                          lineHeight: "34px",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                        style={{
                          width: "34px",
                          height: "34px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--foreground)",
                          fontSize: "1.1rem",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item.product.id, item.size, item.color);
                        toast("Item removed", "info");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--muted-foreground)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        transition: "color 0.2s",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            style={{
              background: "var(--secondary)",
              padding: "2rem",
              borderRadius: "var(--radius)",
              position: "sticky",
              top: "90px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "var(--foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Order Summary
            </h2>

            {/* Discount code */}
            <div style={{ marginBottom: "1.25rem" }}>
              {appliedDiscount ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "var(--radius)",
                    padding: "0.625rem 0.875rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "#16a34a",
                      fontWeight: 600,
                    }}
                  >
                    ✓ {appliedDiscount.code} applied
                  </span>
                  <button
                    onClick={() => setAppliedDiscount(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#16a34a",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0" }}>
                  <input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                    style={{
                      flex: 1,
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--foreground)",
                      background: "var(--card)",
                      border: "1.5px solid var(--border)",
                      borderRight: "none",
                      padding: "0.625rem 0.875rem",
                      outline: "none",
                      borderRadius: "var(--radius) 0 0 var(--radius)",
                    }}
                  />
                  <button
                    onClick={applyDiscount}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      background: "var(--secondary)",
                      border: "1.5px solid var(--border)",
                      color: "var(--foreground)",
                      padding: "0.625rem 1rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      borderRadius: "0 var(--radius) var(--radius) 0",
                      transition: "background 0.15s",
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Line items */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                marginBottom: "1.25rem",
              }}
            >
              {[
                { label: "Subtotal", value: `$${subtotal}` },
                {
                  label: "Shipping",
                  value: shipping === 0 ? "Free" : `$${shipping}`,
                  note:
                    subtotal < 150
                      ? `$${150 - subtotal} away from free shipping`
                      : undefined,
                  accent: shipping === 0,
                },
                { label: "Tax (8%)", value: `$${tax}` },
                ...(appliedDiscount
                  ? [
                      {
                        label: `Discount (${appliedDiscount.code})`,
                        value: `-$${discountAmount}`,
                        accent: true,
                      },
                    ]
                  : []),
              ].map((row) => (
                <div key={row.label}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: row.accent
                          ? "var(--accent)"
                          : "var(--foreground)",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                  {row.note && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.73rem",
                        color: "var(--accent)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {row.note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "1.125rem",
                marginBottom: "1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                ${total}
              </span>
            </div>

            <Link
              to="/checkout"
              className="btn-primary"
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "0.75rem",
              }}
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="btn-outline"
              style={{ width: "100%", textAlign: "center" }}
            >
              Continue Shopping
            </Link>

            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="10"
                  height="8"
                  rx="1"
                  stroke="var(--muted-foreground)"
                  strokeWidth="1.2"
                />
                <path
                  d="M4.5 5V3.5a2.5 2.5 0 015 0V5"
                  stroke="var(--muted-foreground)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Secure checkout · SSL encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
