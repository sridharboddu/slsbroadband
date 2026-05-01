// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar/Navbar";
import Chatbot from "./components/Chatbot/Chatbot";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/index.jsx";
import { PlansPage, SupportPage, ContactPage } from "./pages/index.jsx";
import "./styles/global.css";

function AppContent() {
  useTheme(); // Inject CSS variables from Redux theme state
  const { t } = useTranslation();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
