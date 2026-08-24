import { useState } from "react";
import { Link } from "react-router-dom";
const faqs = [
  {
    category: "Shipping & Returns",
    id: "shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5–7 business days. Express (2–3 business days) is available for an additional $18. Orders placed before 12pm ET on weekdays are processed same-day.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes — free standard shipping on all orders over $150. International shipping is available to 40+ countries; rates are calculated at checkout.",
      },
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging. Sale items are final sale. Start a return through your account or contact us at hello@aura.co.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your return (usually 2–3 business days), refunds are issued to the original payment method within 5–7 business days.",
      },
    ],
  },
  {
    category: "Sizing",
    id: "sizing",
    items: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a full size guide with measurements in both inches and centimetres. We recommend measuring your bust, waist, and hips and comparing to the chart. If you're between sizes, our general advice is to size up.",
      },
      {
        q: "Do your clothes run true to size?",
        a: "Most of our women's pieces have a relaxed or slightly oversized fit. Product pages note the model's height and the size worn. If you want a closer fit, size down.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes. Exchanges are free within 30 days. Start an exchange through your account or email us.",
      },
    ],
  },
  {
    category: "Product Care",
    items: [
      {
        q: "How do I care for merino wool?",
        a: "Machine wash cold on a gentle cycle, or hand wash. Lay flat to dry — never hang knits, as they will stretch. Avoid high heat.",
      },
      {
        q: "How do I care for silk?",
        a: "Dry clean is safest. If machine washing, use a mesh laundry bag, cold water, and the delicate cycle. Air dry only.",
      },
      {
        q: "How do I care for linen?",
        a: "Machine wash cold. Our garment-washed linens are pre-softened and should be washed with similar colours. Tumble dry low or air dry. Iron while slightly damp for a crisper finish, or embrace the natural texture.",
      },
    ],
  },
  {
    category: "Orders & Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placing. After that, they enter fulfillment and cannot be changed. Contact us immediately if you need to make a change.",
      },
      {
        q: "Is my payment information secure?",
        a: "All payments are processed via Stripe, which is PCI DSS Level 1 certified. We never store your card details.",
      },
    ],
  },
];
export default function FAQ() {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen(open === key ? null : key);
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
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: "1rem",
          }}
        >
          Frequently Asked Questions
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
          Can't find your answer?{" "}
          <Link
            to="/contact"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Contact us
          </Link>{" "}
          and we'll get back to you within 24 hours.
        </p>
      </div>

      {/* FAQs */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "4rem 2rem 6rem",
        }}
      >
        {faqs.map((section) => (
          <div
            key={section.category}
            id={section.id}
            style={{ marginBottom: "3.5rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 500,
                color: "var(--foreground)",
                marginBottom: "1.25rem",
                paddingBottom: "0.875rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {section.category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = open === key;
                return (
                  <div
                    key={i}
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <button
                      onClick={() => toggle(key)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1.125rem 0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        gap: "1rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9375rem",
                          fontWeight: isOpen ? 600 : 500,
                          color: "var(--foreground)",
                          lineHeight: 1.4,
                          transition: "font-weight 0.2s",
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        style={{
                          color: "var(--muted-foreground)",
                          flexShrink: 0,
                          transition: "transform 0.25s ease",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9 4v10M4 9h10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isOpen ? "400px" : "0",
                        transition: "max-height 0.3s ease",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9375rem",
                          color: "var(--muted-foreground)",
                          lineHeight: 1.75,
                          paddingBottom: "1.25rem",
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div
          style={{
            background: "var(--secondary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.375rem",
              fontWeight: 500,
              color: "var(--foreground)",
              marginBottom: "0.625rem",
            }}
          >
            Still have a question?
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--muted-foreground)",
              marginBottom: "1.5rem",
              lineHeight: 1.65,
            }}
          >
            Our team responds within 24 hours on weekdays.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
