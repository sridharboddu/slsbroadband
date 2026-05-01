// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { setTheme, selectThemeName } from "../../redux/slices/themeSlice";
import { setLanguage, selectLang, selectLanguages } from "../../redux/slices/langSlice";
import "./Navbar.css";

const THEMES = [
  { key: "dark",  dot: "#00d4ff", label: "Dark" },
  { key: "light", dot: "#0066cc", label: "Light" },
  { key: "ocean", dot: "#00e5b0", label: "Ocean" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const currentTheme = useSelector(selectThemeName);
  const currentLang = useSelector(selectLang);
  const languages = useSelector(selectLanguages);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/plans", label: t("nav.plans") },
    { path: "/support", label: t("nav.support") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          SLS<span>BroadBand</span>
          <span className="navbar__logo-dot" />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`navbar__link ${location.pathname === l.path ? "navbar__link--active" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="navbar__controls">
          {/* Theme switcher */}
          <div className="theme-switcher">
            {THEMES.map((th) => (
              <button
                key={th.key}
                className={`theme-dot ${currentTheme === th.key ? "theme-dot--active" : ""}`}
                style={{ background: th.dot }}
                title={th.label}
                onClick={() => dispatch(setTheme(th.key))}
                aria-label={`Switch to ${th.label} theme`}
              />
            ))}
          </div>

          {/* Language switcher */}
          <div className="lang-switcher">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-btn ${currentLang === lang.code ? "lang-btn--active" : ""}`}
                onClick={() => dispatch(setLanguage(lang.code))}
                aria-label={`Switch to ${lang.name}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Login CTA */}
          <Link to="/support" className="navbar__cta">
            {t("nav.login")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        {navLinks.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className="mobile-menu__link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className="mobile-menu__controls">
          <div className="theme-switcher">
            {THEMES.map((th) => (
              <button
                key={th.key}
                className={`theme-dot ${currentTheme === th.key ? "theme-dot--active" : ""}`}
                style={{ background: th.dot }}
                onClick={() => dispatch(setTheme(th.key))}
              />
            ))}
          </div>
          <div className="lang-switcher">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-btn ${currentLang === lang.code ? "lang-btn--active" : ""}`}
                onClick={() => dispatch(setLanguage(lang.code))}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
