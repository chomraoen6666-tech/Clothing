import { useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { useApp } from "@/store/AppContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
const mockOrders = [
  {
    id: "ORD-4821",
    date: "August 12, 2026",
    status: "Delivered",
    total: 705,
    items: [
      {
        name: "Merino Wrap Coat",
        size: "S",
        color: "Camel",
        qty: 1,
        price: 485,
        img: products[0].images[0],
      },
      {
        name: "Cashmere Rib Sweater",
        size: "S",
        color: "Ivory",
        qty: 1,
        price: 220,
        img: products[3].images[0],
      },
    ],
  },
  {
    id: "ORD-4763",
    date: "July 28, 2026",
    status: "Shipped",
    total: 310,
    items: [
      {
        name: "Silk Column Dress",
        size: "M",
        color: "Midnight",
        qty: 1,
        price: 310,
        img: products[1].images[0],
      },
    ],
  },
  {
    id: "ORD-4510",
    date: "June 14, 2026",
    status: "Delivered",
    total: 298,
    items: [
      {
        name: "Structured Tote",
        size: "One Size",
        color: "Tan",
        qty: 1,
        price: 298,
        img: products[8].images[0],
      },
    ],
  },
];
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "My Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
  { id: "settings", label: "Settings" },
];
const statusColors = {
  Delivered: "#059669",
  Shipped: "var(--accent)",
  Processing: "var(--muted-foreground)",
};
export default function Account() {
  const { state, toast } = useApp();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [settings, setSettings] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
  });
  if (!state.user) return <Navigate to="/login" replace />;
  const wishlisted = products.filter((p) => state.wishlist.includes(p.id));
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
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                flexShrink: 0,
              }}
            >
              {state.user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                {state.user.name}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                }}
              >
                {state.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="account-layout"
        >
          <aside>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color:
                      activeTab === tab.id
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    background:
                      activeTab === tab.id ? "var(--secondary)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.625rem 0.875rem",
                    textAlign: "left",
                    transition: "all 0.2s",
                    borderRadius: "var(--radius)",
                    borderLeft:
                      activeTab === tab.id
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <div>
            {activeTab === "overview" && (
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    marginBottom: "0.375rem",
                  }}
                >
                  Welcome back, {state.user.name.split(" ")[0]}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--muted-foreground)",
                    marginBottom: "2rem",
                  }}
                >
                  Here's a summary of your account activity.
                </p>

                {/* Stats cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                    marginBottom: "2.5rem",
                  }}
                  className="stats-grid"
                >
                  {[
                    {
                      label: "Total Orders",
                      value: mockOrders.length,
                      icon: "📦",
                      color: "var(--accent)",
                    },
                    {
                      label: "Completed",
                      value: mockOrders.filter((o) => o.status === "Delivered")
                        .length,
                      icon: "✓",
                      color: "#16a34a",
                    },
                    {
                      label: "Pending / Shipped",
                      value: mockOrders.filter((o) => o.status !== "Delivered")
                        .length,
                      icon: "🚚",
                      color: "#2563eb",
                    },
                    {
                      label: "Wishlist Items",
                      value: state.wishlist.length,
                      icon: "♥",
                      color: "#ef4444",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: `${stat.color}18`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          flexShrink: 0,
                        }}
                      >
                        {stat.icon}
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.75rem",
                            fontWeight: 800,
                            color: "var(--foreground)",
                            lineHeight: 1,
                          }}
                        >
                          {stat.value}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8rem",
                            color: "var(--muted-foreground)",
                            marginTop: "0.25rem",
                          }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                      }}
                    >
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--accent)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      View all →
                    </button>
                  </div>
                  {mockOrders.slice(0, 2).map((order) => (
                    <div
                      key={order.id}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        padding: "1rem 1.25rem",
                        marginBottom: "0.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "var(--foreground)",
                          }}
                        >
                          {order.id}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8rem",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {order.date} · ${order.total}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: statusColors[order.status],
                          background: `${statusColors[order.status]}18`,
                          padding: "0.25rem 0.625rem",
                          borderRadius: "99px",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
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
                  Order History
                </h2>
                {mockOrders.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        color: "var(--foreground)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      No orders yet
                    </p>
                    <Link
                      to="/shop"
                      className="btn-primary"
                      style={{ marginTop: "1rem", display: "inline-flex" }}
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius)",
                          overflow: "hidden",
                        }}
                      >
                        {/* Order header */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1rem 1.25rem",
                            background: "var(--secondary)",
                            borderBottom: "1px solid var(--border)",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "2rem",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "1rem",
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.7rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--muted-foreground)",
                                }}
                              >
                                Order
                              </p>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "var(--foreground)",
                                }}
                              >
                                {order.id}
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.7rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--muted-foreground)",
                                }}
                              >
                                Date
                              </p>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.875rem",
                                  color: "var(--foreground)",
                                }}
                              >
                                {order.date}
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.7rem",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--muted-foreground)",
                                }}
                              >
                                Total
                              </p>
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "var(--foreground)",
                                }}
                              >
                                ${order.total}
                              </p>
                            </div>
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color:
                                statusColors[order.status] ||
                                "var(--muted-foreground)",
                              background: `${statusColors[order.status]}18`,
                              padding: "0.25rem 0.625rem",
                              borderRadius: "99px",
                            }}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Order items */}
                        <div
                          style={{
                            padding: "1rem 1.25rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.875rem",
                          }}
                        >
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                gap: "0.875rem",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                style={{
                                  width: "48px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "var(--radius)",
                                  background: "var(--muted)",
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flex: 1 }}>
                                <p
                                  style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    color: "var(--foreground)",
                                  }}
                                >
                                  {item.name}
                                </p>
                                <p
                                  style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.8rem",
                                    color: "var(--muted-foreground)",
                                  }}
                                >
                                  {item.color} · {item.size}
                                </p>
                              </div>
                              <span
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.875rem",
                                  color: "var(--foreground)",
                                }}
                              >
                                ${item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
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
                  Wishlist
                </h2>
                {wishlisted.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      style={{ margin: "0 auto 1.25rem", display: "block" }}
                    >
                      <path
                        d="M24 40S8 30 8 18a10 10 0 0116-8 10 10 0 0116 8c0 12-16 22-16 22z"
                        stroke="var(--muted-foreground)"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        color: "var(--foreground)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Your wishlist is empty
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--muted-foreground)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      Save pieces you love to find them later.
                    </p>
                    <Link
                      to="/shop"
                      className="btn-primary"
                      style={{ display: "inline-flex" }}
                    >
                      Browse the Collection
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1.25rem",
                    }}
                    className="wishlist-grid"
                  >
                    {wishlisted.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
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
                  Address Book
                </h2>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "1.5rem",
                    background: "var(--secondary)",
                    maxWidth: "340px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                      }}
                    >
                      Default
                    </span>
                    <button
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        color: "var(--muted-foreground)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--foreground)",
                      lineHeight: 1.65,
                    }}
                  >
                    {state.user.name}
                    <br />
                    142 West 26th Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div style={{ maxWidth: "480px" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: "1.75rem",
                  }}
                >
                  Account Settings
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast("Settings saved.");
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {[
                    { label: "Full Name", value: settings.name, key: "name" },
                    {
                      label: "Email",
                      value: settings.email,
                      key: "email",
                      type: "email",
                    },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--foreground)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type || "text"}
                        value={f.value}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            [f.key]: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          color: "var(--foreground)",
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          padding: "0.875rem 1rem",
                          borderRadius: "var(--radius)",
                          outline: "none",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ alignSelf: "flex-start" }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .account-layout { grid-template-columns: 1fr !important; }
          .wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
