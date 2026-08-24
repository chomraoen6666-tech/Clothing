import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/store/AppContext";
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2 2l14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function Register() {
  const { setUser, toast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Please enter a valid email";
    if (form.phone && !/^\+?[\d\s\-()]{7,}$/.test(form.phone))
      e.phone = "Please enter a valid phone number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    if (!terms) e.terms = "You must agree to the terms";
    return e;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setErrors({});
    await new Promise((r) => setTimeout(r, 900));
    setUser({ name: form.name, email: form.email });
    toast(`Welcome to AURA, ${form.name.split(" ")[0]}!`);
    navigate("/");
    setLoading(false);
  };
  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
    },
  });
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        paddingTop: "70px",
      }}
      className="auth-layout"
    >
      {/* Visual */}
      <div
        className="hidden md:block"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--foreground)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&auto=format"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "3rem",
            right: "3rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.875rem",
              fontWeight: 700,
              color: "#FAFAFA",
              lineHeight: 1.25,
              marginBottom: "0.75rem",
            }}
          >
            "Elegance is not about being noticed, it's about being remembered."
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(250,250,250,0.6)",
            }}
          >
            — Giorgio Armani
          </p>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2rem",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "var(--foreground)",
              textDecoration: "none",
              display: "block",
              marginBottom: "2.5rem",
            }}
          >
            AURA
          </Link>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.875rem",
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--muted-foreground)",
              marginBottom: "2rem",
            }}
          >
            Join AURA and shop with ease
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Name */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                {...field("name")}
                placeholder="Alex Mercer"
                className={`input-field${errors.name ? " error" : ""}`}
              />
              {errors.name && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.375rem",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...field("email")}
                placeholder="your@email.com"
                className={`input-field${errors.email ? " error" : ""}`}
              />
              {errors.email && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.375rem",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                Phone{" "}
                <span
                  style={{ fontWeight: 400, color: "var(--muted-foreground)" }}
                >
                  (optional)
                </span>
              </label>
              <input
                type="tel"
                {...field("phone")}
                placeholder="+1 (555) 000-0000"
                className={`input-field${errors.phone ? " error" : ""}`}
              />
              {errors.phone && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.375rem",
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPwd ? "text" : "password"}
                  {...field("password")}
                  placeholder="Min. 8 characters"
                  className={`input-field${errors.password ? " error" : ""}`}
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted-foreground)",
                    display: "flex",
                  }}
                >
                  <EyeIcon open={showPwd} />
                </button>
              </div>
              {errors.password && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.375rem",
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  {...field("confirm")}
                  placeholder="••••••••"
                  className={`input-field${errors.confirm ? " error" : ""}`}
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: "absolute",
                    right: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted-foreground)",
                    display: "flex",
                  }}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirm && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.375rem",
                  }}
                >
                  {errors.confirm}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => {
                    setTerms(e.target.checked);
                    setErrors((p) => {
                      const n = { ...p };
                      delete n.terms;
                      return n;
                    });
                  }}
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "var(--foreground)",
                    cursor: "pointer",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--foreground)",
                    lineHeight: 1.5,
                  }}
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    style={{
                      color: "var(--accent)",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    style={{
                      color: "var(--accent)",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.375rem",
                  }}
                >
                  {errors.terms}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 2a6 6 0 016 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              marginTop: "1.75rem",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-layout { grid-template-columns: 1fr !important; }
          .hidden.md\\:block { display: none !important; }
        }
      `}</style>
    </div>
  );
}
