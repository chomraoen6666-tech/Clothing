import { useApp } from "@/store/AppContext";
import { useState, useEffect } from "react";
function ToastItem({ t }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOut(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  const iconPath =
    t.type === "success"
      ? "M5 8l2 2 4-4"
      : t.type === "error"
        ? "M5.5 5.5l5 5M10.5 5.5l-5 5"
        : "M8 7v4M8 5v.5";
  const dotColor =
    t.type === "success"
      ? "#059669"
      : t.type === "error"
        ? "#dc2626"
        : "var(--accent)";
  return (
    <div
      className={out ? "animate-toast-out" : "animate-toast-in"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: "0.875rem 1.125rem",
        minWidth: "260px",
        maxWidth: "340px",
        borderRadius: "var(--radius)",
      }}
    >
      <span style={{ color: dotColor, flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d={iconPath}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--foreground)",
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {t.message}
      </p>
    </div>
  );
}
export default function Toasts() {
  const { state } = useApp();
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        pointerEvents: "none",
      }}
    >
      {state.toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "auto" }}>
          <ToastItem t={t} />
        </div>
      ))}
    </div>
  );
}
