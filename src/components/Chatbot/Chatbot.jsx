// src/components/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Chatbot.css";

const QUICK_KEYS = ["slow", "no_net", "plans", "bill", "complaint"];

// Bot response logic (can be replaced with Claude API)
function getBotResponse(message, t) {
  const msg = message.toLowerCase();
  if (msg.includes("slow") || msg.includes("నెమ్మది") || msg.includes("धीमा")) {
    return "Please try these steps:\n1️⃣ Restart your router (unplug for 30 seconds)\n2️⃣ Check all cable connections\n3️⃣ Move closer to the router\n\nStill slow? Our technician will visit within 4 hours. Call us at 📞 1800-XXX-XXXX";
  }
  if (msg.includes("no connection") || msg.includes("not working") || msg.includes("no_net") || msg.includes("కనెక్షన్ లేదు") || msg.includes("कनेक्शन नहीं")) {
    return "Sorry to hear that! Please:\n1️⃣ Check if all cable lights are on\n2️⃣ Restart your modem & router\n3️⃣ Check if the issue is just on one device\n\nIf the problem persists, we'll send a technician immediately. 🚨";
  }
  if (msg.includes("plan") || msg.includes("price") || msg.includes("cost") || msg.includes("ప్లాన్") || msg.includes("प्लान")) {
    return "Here are our current plans:\n\n📦 Basic — 50 Mbps @ ₹499/mo\n📦 Standard — 200 Mbps @ ₹799/mo ⭐\n📦 Pro — 500 Mbps @ ₹1,299/mo\n📦 Giga — 1 Gbps @ ₹1,999/mo\n\nAll plans include free installation & router!";
  }
  if (msg.includes("bill") || msg.includes("pay") || msg.includes("payment") || msg.includes("బిల్లు") || msg.includes("बिल")) {
    return "You can pay your bill via:\n💳 PhonePe / GPay / Paytm\n🏦 Net Banking / UPI\n🏢 Walk into our office (Mon–Sat 9AM–8PM)\n\nNeed your account number? Tell me your registered phone number!";
  }
  if (msg.includes("complaint") || msg.includes("issue") || msg.includes("problem") || msg.includes("ఫిర్యాదు") || msg.includes("शिकायत")) {
    return "I'll log a complaint for you. Please visit our Support page or call 📞 1800-XXX-XXXX. Our team will contact you within 30 minutes. 🔧";
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("నమస్కారం") || msg.includes("नमस्ते")) {
    return "Hello! 👋 How can I help you today? You can ask me about:\n• Internet speed issues\n• Connection problems\n• Our plans & pricing\n• Billing & payments";
  }
  return "Thanks for reaching out! I'm here to help with:\n🌐 Internet issues\n📋 Plan information\n💳 Billing support\n🔧 Technical problems\n\nFor urgent issues, call 📞 1800-XXX-XXXX (Free, 24/7)";
}

export default function Chatbot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: "bot", text: t("chatbot.greeting") }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Update greeting when language changes
  useEffect(() => {
    setMessages([{ id: 1, type: "bot", text: t("chatbot.greeting") }]);
  }, [t]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), type: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = getBotResponse(text, t);
      setMessages((m) => [...m, { id: Date.now() + 1, type: "bot", text: reply }]);
    }, 900 + Math.random() * 400);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chatbot">
      {/* Chat window */}
      <div className={`chatbot__window ${open ? "chatbot__window--open" : ""}`}>
        {/* Header */}
        <div className="chatbot__header">
          <div className="chatbot__avatar">🌐</div>
          <div className="chatbot__header-text">
            <div className="chatbot__name">{t("chatbot.title")}</div>
            <div className="chatbot__status">
              <span className="chatbot__status-dot" />
              {t("chatbot.online")}
            </div>
          </div>
          <button className="chatbot__close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="chatbot__messages" ref={msgsRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot__msg chatbot__msg--${msg.type}`}>
              {msg.text.split("\n").map((line, i) => (
                <span key={i}>{line}{i < msg.text.split("\n").length - 1 && <br />}</span>
              ))}
            </div>
          ))}
          {typing && (
            <div className="chatbot__msg chatbot__msg--bot chatbot__typing">
              <span /><span /><span />
            </div>
          )}
        </div>

        {/* Quick replies */}
        <div className="chatbot__quick">
          {QUICK_KEYS.map((key) => (
            <button
              key={key}
              className="chatbot__qr"
              onClick={() => sendMessage(t(`chatbot.quick.${key}`))}
            >
              {t(`chatbot.quick.${key}`)}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot__input-row">
          <input
            className="chatbot__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t("chatbot.placeholder")}
          />
          <button
            className="chatbot__send"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            ➤
          </button>
        </div>
      </div>

      {/* FAB bubble */}
      <button
        className={`chatbot__fab ${open ? "chatbot__fab--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Open chat support"
      >
        {open ? "✕" : "💬"}
        {!open && <span className="chatbot__fab-badge">1</span>}
      </button>
    </div>
  );
}
