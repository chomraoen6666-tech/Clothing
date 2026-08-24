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
export default function Login() {
  const { setUser, toast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setErrors({});
    await new Promise((r) => setTimeout(r, 900));
    setUser({ name: "Alex Mercer", email });
    toast("Welcome back to AURA.");
    navigate("/");
    setLoading(false);
  };
  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setForgotSent(true);
    setLoading(false);
    toast("Reset link sent to your email.");
  };
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
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop&auto=format"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.65,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
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
            "Dressing well is a form of good manners."
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(250,250,250,0.6)",
            }}
          >
            — Tom Ford
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

          {!forgot ? (
            <>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Welcome back
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--muted-foreground)",
                  marginBottom: "2rem",
                }}
              >
                Sign in to your AURA account
              </p>

              {errors.general && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "var(--radius)",
                    padding: "0.75rem 1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "#ef4444",
                    }}
                  >
                    {errors.general}
                  </p>
                </div>
              )}

              <form
                onSubmit={handleLogin}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.125rem",
                }}
              >
                <div>
                  <label className="label">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: undefined }));
                    }}
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

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <label className="label" style={{ marginBottom: 0 }}>
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgot(true)}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        color: "var(--accent)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((p) => ({ ...p, password: undefined }));
                      }}
                      placeholder="••••••••"
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
                      aria-label={showPwd ? "Hide password" : "Show password"}
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

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      width: "16px",
                      height: "16px",
                      accentColor: "var(--foreground)",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--foreground)",
                    }}
                  >
                    Remember me
                  </span>
                </label>

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
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
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
                New to AURA?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Create account
                </Link>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setForgot(false);
                  setForgotSent(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  marginBottom: "2rem",
                  padding: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Sign In
              </button>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Reset Password
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                  marginBottom: "2rem",
                }}
              >
                Enter your email and we'll send you a link to reset your
                password.
              </p>

              {forgotSent ? (
                <div
                  style={{
                    background: "var(--secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "#dcfce7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                      color: "#16a34a",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path
                        d="M4 11l5 5 9-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--foreground)",
                      fontWeight: 500,
                    }}
                  >
                    Reset link sent!
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--muted-foreground)",
                      marginTop: "0.375rem",
                    }}
                  >
                    Check your inbox at <strong>{forgotEmail}</strong>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleForgot}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="label">Email address</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="input-field"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}
            </>
          )}
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
