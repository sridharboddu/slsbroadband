// src/components/Hero/Hero.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        {/* Badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          {t("hero.badge")}
        </div>

        {/* Headline */}
        <h1 className="hero__headline">
          {t("hero.headline")}
          <br />
          <em className="hero__headline-em">{t("hero.headline2")}</em>
        </h1>

        {/* Subtitle */}
        <p className="hero__sub">{t("hero.sub")}</p>

        {/* CTAs */}
        <div className="hero__ctas">
          <Link to="/plans" className="btn btn--primary">
            {t("hero.cta_plans")}
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/support" className="btn btn--outline">
            {t("hero.cta_support")}
          </Link>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-val">10,000+</div>
            <div className="hero__stat-label">{t("hero.stat_customers")}</div>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <div className="hero__stat-val">1 Gbps</div>
            <div className="hero__stat-label">{t("hero.stat_speed")}</div>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <div className="hero__stat-val">24 / 7</div>
            <div className="hero__stat-label">{t("hero.stat_support")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
