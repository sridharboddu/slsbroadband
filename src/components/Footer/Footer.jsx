// src/components/Footer/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">SLS<span>BroadBand</span></div>
          <p className="footer__tagline">{t("footer.tagline")}</p>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Facebook">📘</a>
            <a href="#" className="footer__social-link" aria-label="WhatsApp">💬</a>
            <a href="#" className="footer__social-link" aria-label="Instagram">📸</a>
          </div>
        </div>

        <div className="footer__links-col">
          <div className="footer__col-title">{t("footer.links")}</div>
          <ul className="footer__links">
            <li><Link to="/">{t("nav.home")}</Link></li>
            <li><Link to="/plans">{t("nav.plans")}</Link></li>
            <li><Link to="/support">{t("nav.support")}</Link></li>
            <li><Link to="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="footer__contact-col">
          <div className="footer__col-title">{t("contact.title")}</div>
          <div className="footer__contact-item">📞 9948241631</div>
          <div className="footer__contact-item">💬 WhatsApp: +91 9533316891</div>
          <div className="footer__contact-item">🕐 {t("contact.hours")}</div>
          <div className="footer__contact-item">📍 Pedaputlapudi, Kalidindi</div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>{t("footer.legal")}</p>
      </div>
    </footer>
  );
}
