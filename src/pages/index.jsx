// src/pages/HomePage.jsx
import React from "react";
import Hero from "../components/Hero/Hero";
import Plans from "../components/Plans/Plans";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Plans />
    </>
  );
}

// ─────────────────────────────────────────────
// src/pages/PlansPage.jsx
export function PlansPage() {
  return (
    <div style={{ paddingTop: "88px" }}>
      <Plans />
    </div>
  );
}

// ─────────────────────────────────────────────
// src/pages/SupportPage.jsx
import SupportForm from "../components/Support/SupportForm";
import { useTranslation } from "react-i18next";

export function SupportPage() {
  const { t } = useTranslation();
  return (
    <div className="page-wrapper container" style={{ paddingTop: "108px", paddingBottom: "80px", maxWidth: "640px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", marginBottom: "10px" }}>
        {t("support.title")}
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: "36px" }}>{t("support.subtitle")}</p>
      <SupportForm />
    </div>
  );
}

// ─────────────────────────────────────────────
// src/pages/ContactPage.jsx
export function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="container" style={{ paddingTop: "108px", paddingBottom: "80px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", marginBottom: "10px", textAlign: "center" }}>
        {t("contact.title")}
      </h2>
      <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: "48px" }}>
        {t("contact.subtitle")}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {[
          { icon: "📞", label: t("contact.call"), value: "9948241631", sub: "Free, 24/7" },
          { icon: "💬", label: t("contact.whatsapp"), value: "+91 98765 43210", sub: "Chat with us" },
          { icon: "🕐", label: t("contact.office"), value: t("contact.hours"), sub: "Mon–Sat" },
          { icon: "📍", label: t("contact.address"), value: "Pedaputlapudi, Kalidindi", sub: "AP" },
        ].map((card) => (
          <div key={card.label} style={{
            background: "var(--surface)", border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-lg)", padding: "28px 24px", textAlign: "center",
            transition: "var(--transition)"
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{card.icon}</div>
            <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{card.label}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}>{card.value}</div>
            <div style={{ fontSize: "13px", color: "var(--muted)" }}>{card.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
