import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/store/AppContext";
const steps = ["Shipping", "Payment", "Review"];
export default function Checkout() {
  const { state, cartTotal, clearCart, toast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });
  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [delivery, setDelivery] = useState("standard");
  const deliveryFee = delivery === "express" ? 18 : cartTotal >= 150 ? 0 : 8;
  const shippingFee = deliveryFee;
  const tax = Math.round(cartTotal * 0.08);
  const total = cartTotal + shippingFee + tax;
  if (state.cart.length === 0) {
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
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Your cart is empty
        </p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  const handlePlaceOrder = () => {
    clearCart();
    toast("Order placed successfully! Confirmation sent to your email.");
    navigate("/account?tab=orders");
  };
  const field = (label, name, value, onChange, opts) => (
    <div
      style={{
        gridColumn: opts?.span ? "span 2" : "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
      }}
      className={opts?.span ? "field-full" : ""}
    >
      <label
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--foreground)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        type={opts?.type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={opts?.placeholder || ""}
        required
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--foreground)",
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "0.75rem 0.875rem",
          borderRadius: "var(--radius)",
          outline: "none",
          transition: "border-color 0.2s",
          width: "100%",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />
    </div>
  );
  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        paddingTop: "70px",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--foreground)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            AURA
          </Link>
        </div>

        {/* Stepper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            marginBottom: "3rem",
          }}
        >
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: i <= step ? "var(--primary)" : "var(--muted)",
                    color:
                      i <= step
                        ? "var(--primary-foreground)"
                        : "var(--muted-foreground)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    transition: "all 0.3s",
                  }}
                >
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7l3.5 3.5 6.5-7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    fontWeight: i === step ? 600 : 400,
                    color:
                      i <= step
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: "80px",
                    height: "1px",
                    background: i < step ? "var(--primary)" : "var(--border)",
                    margin: "0 0.5rem",
                    marginBottom: "20px",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "3rem",
            alignItems: "start",
          }}
          className="checkout-layout"
        >
          {/* Form */}
          <div>
            {step === 0 && (
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: "1.75rem",
                  }}
                >
                  Shipping Information
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                  className="form-grid"
                >
                  {field("First Name", "firstName", shipping.firstName, (v) =>
                    setShipping({ ...shipping, firstName: v }),
                  )}
                  {field("Last Name", "lastName", shipping.lastName, (v) =>
                    setShipping({ ...shipping, lastName: v }),
                  )}
                  {field(
                    "Email",
                    "email",
                    shipping.email,
                    (v) => setShipping({ ...shipping, email: v }),
                    { type: "email", span: true },
                  )}
                  {field(
                    "Phone",
                    "phone",
                    shipping.phone,
                    (v) => setShipping({ ...shipping, phone: v }),
                    { type: "tel" },
                  )}
                  {field(
                    "Address",
                    "address",
                    shipping.address,
                    (v) => setShipping({ ...shipping, address: v }),
                    { span: true },
                  )}
                  {field("City", "city", shipping.city, (v) =>
                    setShipping({ ...shipping, city: v }),
                  )}
                  {field("State / Province", "state", shipping.state, (v) =>
                    setShipping({ ...shipping, state: v }),
                  )}
                  {field("ZIP / Postal Code", "zip", shipping.zip, (v) =>
                    setShipping({ ...shipping, zip: v }),
                  )}
                </div>
                {/* Delivery method */}
                <div style={{ marginTop: "1.5rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--foreground)",
                      marginBottom: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Delivery Method
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.625rem",
                    }}
                  >
                    {[
                      {
                        id: "standard",
                        label: "Standard Delivery",
                        desc: "5–7 business days",
                        price: cartTotal >= 150 ? "Free" : "$8",
                      },
                      {
                        id: "express",
                        label: "Express Delivery",
                        desc: "2–3 business days",
                        price: "$18",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem",
                          border: `1.5px solid ${delivery === opt.id ? "var(--foreground)" : "var(--border)"}`,
                          borderRadius: "var(--radius)",
                          cursor: "pointer",
                          transition: "border-color 0.2s",
                          background:
                            delivery === opt.id
                              ? "var(--secondary)"
                              : "var(--card)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            value={opt.id}
                            checked={delivery === opt.id}
                            onChange={() => setDelivery(opt.id)}
                            style={{
                              accentColor: "var(--foreground)",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                          <div>
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                color: "var(--foreground)",
                              }}
                            >
                              {opt.label}
                            </p>
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.8rem",
                                color: "var(--muted-foreground)",
                              }}
                            >
                              {opt.desc}
                            </p>
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color:
                              opt.price === "Free"
                                ? "var(--accent)"
                                : "var(--foreground)",
                          }}
                        >
                          {opt.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="btn-primary"
                  style={{ marginTop: "2rem", width: "100%" }}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: "1.75rem",
                  }}
                >
                  Payment Method
                </h2>

                {/* Method selection */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "2rem",
                  }}
                >
                  {[
                    { value: "card", label: "Credit Card" },
                    { value: "paypal", label: "PayPal" },
                    { value: "apple", label: "Apple Pay" },
                  ].map((m) => (
                    <button
                      key={m.value}
                      onClick={() =>
                        setPayment({ ...payment, method: m.value })
                      }
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        padding: "0.625rem 1rem",
                        background:
                          payment.method === m.value
                            ? "var(--primary)"
                            : "var(--card)",
                        color:
                          payment.method === m.value
                            ? "var(--primary-foreground)"
                            : "var(--foreground)",
                        border: `1px solid ${payment.method === m.value ? "var(--primary)" : "var(--border)"}`,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {payment.method === "card" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                    className="form-grid"
                  >
                    {field(
                      "Name on Card",
                      "nameOnCard",
                      payment.nameOnCard,
                      (v) => setPayment({ ...payment, nameOnCard: v }),
                      { span: true },
                    )}
                    {field(
                      "Card Number",
                      "cardNumber",
                      payment.cardNumber,
                      (v) => setPayment({ ...payment, cardNumber: v }),
                      {
                        span: true,
                        placeholder: "1234 5678 9012 3456",
                      },
                    )}
                    {field(
                      "Expiry Date",
                      "expiry",
                      payment.expiry,
                      (v) => setPayment({ ...payment, expiry: v }),
                      { placeholder: "MM / YY" },
                    )}
                    {field(
                      "CVV",
                      "cvv",
                      payment.cvv,
                      (v) => setPayment({ ...payment, cvv: v }),
                      { placeholder: "•••" },
                    )}
                  </div>
                )}

                {(payment.method === "paypal" ||
                  payment.method === "apple") && (
                  <div
                    style={{
                      background: "var(--secondary)",
                      padding: "3rem 2rem",
                      textAlign: "center",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      You'll be redirected to{" "}
                      {payment.method === "paypal" ? "PayPal" : "Apple Pay"} to
                      complete your purchase.
                    </p>
                  </div>
                )}

                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}
                >
                  <button
                    onClick={() => setStep(0)}
                    className="btn-outline"
                    style={{ flex: 1 }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    style={{ flex: 2 }}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: "1.75rem",
                  }}
                >
                  Review Your Order
                </h2>

                {/* Shipping summary */}
                <div
                  style={{
                    background: "var(--secondary)",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "var(--radius)",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--muted-foreground)",
                          marginBottom: "0.375rem",
                        }}
                      >
                        Shipping to
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          color: "var(--foreground)",
                        }}
                      >
                        {shipping.firstName} {shipping.lastName}
                        <br />
                        {shipping.address}, {shipping.city}, {shipping.state}{" "}
                        {shipping.zip}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(0)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div style={{ marginBottom: "1.5rem" }}>
                  {state.cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "0.875rem 0",
                        borderBottom: "1px solid var(--border)",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{
                          width: "56px",
                          height: "72px",
                          objectFit: "cover",
                          borderRadius: "var(--radius)",
                          background: "var(--muted)",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: "var(--foreground)",
                          }}
                        >
                          {item.product.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8rem",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {item.color} · {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "var(--foreground)",
                        }}
                      >
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-outline"
                    style={{ flex: 1 }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary"
                    style={{ flex: 2 }}
                  >
                    Place Order · ${total}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div
            style={{
              background: "var(--secondary)",
              padding: "1.75rem",
              borderRadius: "var(--radius)",
              position: "sticky",
              top: "90px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "var(--foreground)",
                marginBottom: "1.25rem",
              }}
            >
              Order Summary
            </h3>
            {state.cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.625rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {item.product.name} ×{item.quantity}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                  }}
                >
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "1rem",
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Shipping
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color:
                      shippingFee === 0 ? "var(--accent)" : "var(--foreground)",
                  }}
                >
                  {shippingFee === 0 ? "Free" : `$${shippingFee}`}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Tax (8%)
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--foreground)",
                  }}
                >
                  ${tax}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.5rem",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "0.75rem",
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
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                  }}
                >
                  ${total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .field-full { grid-column: auto !important; }
        }
      `}</style>
    </div>
  );
}
