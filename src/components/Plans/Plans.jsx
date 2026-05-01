import React from "react";
import { useTranslation } from "react-i18next";
import "./Plans.css";

const PLAN_KEYS = [
  "p15",
  "p30",
  "p40",
  "p50",
  "p80",
  "p100",
  "p150",
  "p200",
  "p300",
  "p500",
];

// Highlight best selling plan
const FEATURED = "p100";

// Optional badges (real ISP style)
const BADGES = {
  p100: "🔥 Popular",
  p200: "💰 Best Value",
  p500: "⚡ High Speed",
};

const FEATURE_ICONS = {
  router: "📡",
  install: "🔧",
  support: "🎧",
  tv: "📺",
  static: "🌐",
  ott: "🎬",
};

export default function Plans() {
  const { t } = useTranslation();

  return (
    <section className="plans section" id="plans">
      <div className="container">
        <div className="plans__header">
          <h2 className="plans__title">{t("plans.title")}</h2>
          <p className="plans__subtitle">{t("plans.subtitle")}</p>
        </div>

        <div className="plans__grid">
          {PLAN_KEYS.map((key) => {
            const plan = t(`plans.items.${key}`, { returnObjects: true });
            const isFeatured = key === FEATURED;

            return (
              <div
                key={key}
                className={`plan-card ${isFeatured ? "plan-card--featured" : ""}`}
              >
                {/* Badge */}
                {(isFeatured || BADGES[key]) && (
                  <div className="plan-card__badge">
                    {BADGES[key] || t("plans.popular")}
                  </div>
                )}

                <div className="plan-card__header">
                  <div className="plan-card__name">{plan.name}</div>

                  <div className="plan-card__speed-row">
                    <span className="plan-card__speed">{plan.speed}</span>
                    <span className="plan-card__unit">
                      {parseInt(plan.speed) >= 1000
                        ? t("plans.gbps")
                        : t("plans.mbps")}
                    </span>
                  </div>

                  <div className="plan-card__dl">
                    {t("plans.download")}
                  </div>
                </div>

                {/* Features */}
                <div className="plan-card__features">
                  {plan.features.map((feat) => (
                    <div key={feat} className="plan-card__feature">
                      <span className="plan-card__feature-icon">
                        {FEATURE_ICONS[feat]}
                      </span>
                      {t(`plans.features.${feat}`)}
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="plan-card__footer">
                  <div className="plan-card__price">
                    <span className="plan-card__currency">₹</span>
                    <span className="plan-card__amount">
                      {Number(plan.price).toFixed(0)}
                    </span>
                    <span className="plan-card__mo">
                      {t("plans.per_month")}
                    </span>
                  </div>

                  <button
                    className={`plan-card__btn ${
                      isFeatured ? "plan-card__btn--featured" : ""
                    }`}
                  >
                    {t("plans.get_started")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}