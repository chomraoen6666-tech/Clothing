import { useState } from "react";
import { useApp } from "@/store/AppContext";
const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 5l7 6 7-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Email",
    value: "hello@aura.co",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 5.5A1.5 1.5 0 014.5 4h1.879a.5.5 0 01.464.314l1.5 3.5a.5.5 0 01-.2.605L6.5 9.5S7.5 12 10.5 13.5l1.081-1.643a.5.5 0 01.605-.2l3.5 1.5a.5.5 0 01.314.464V15.5a1.5 1.5 0 01-1.5 1.5C6.268 17 3 10.732 3 5.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Phone",
    value: "+1 (800) 287-2100",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    label: "Studio",
    value: "142 West 26th Street, New York, NY 10001",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle
          cx="10"
          cy="10"
          r="7.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 5v5l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Hours",
    value: "Mon–Fri, 9am–6pm ET",
  },
];
export default function Contact() {
  const { toast } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    toast("Message sent — we'll be in touch within 24 hours.");
  };
  return (
    <div style={{ background: "var(--background)", paddingTop: "70px" }}>
      {/* Header */}
      <div
        style={{
          background: "var(--secondary)",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          borderBottom: "1px solid var(--border)",
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
          Get in touch
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: "1rem",
          }}
        >
          We'd love to hear from you.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Questions about sizing, a specific piece, or just want to say hello —
          we're here.
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2rem 6rem",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="contact-layout"
      >
        {/* Contact info */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "var(--foreground)",
              marginBottom: "2rem",
            }}
          >
            Contact Information
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--foreground)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "var(--foreground)",
              marginBottom: "2rem",
            }}
          >
            Send a Message
          </h2>

          {sent ? (
            <div
              style={{
                background: "var(--secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "3rem 2rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#05966918",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#059669",
                  margin: "0 auto 1.25rem",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5 9-10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Message received
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                }}
              >
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
                className="contact-form-row"
              >
                {[
                  { label: "Name", key: "name", type: "text" },
                  { label: "Email", key: "email", type: "email" },
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
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      required
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
                        transition: "border-color 0.2s",
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
              </div>

              <div>
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
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: form.subject
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    padding: "0.875rem 1rem",
                    borderRadius: "var(--radius)",
                    outline: "none",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238A8278' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>Order inquiry</option>
                  <option>Returns & exchanges</option>
                  <option>Sizing help</option>
                  <option>Product availability</option>
                  <option>Press & media</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
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
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
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
                    resize: "vertical",
                    lineHeight: 1.65,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
