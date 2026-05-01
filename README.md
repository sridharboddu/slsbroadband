# 🌐 SwiftNet — ISP Website

A production-ready **React + Redux** static website for your Cable & Internet provider business.
Built with dynamic theming, multi-language support (English, Telugu, Hindi), and an AI-powered chatbot.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

Your app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
swiftnet/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/          # Navigation + Theme + Language switcher
│   │   ├── Hero/            # Landing hero section
│   │   ├── Plans/           # Pricing plans grid
│   │   ├── Support/         # Complaint form (connected to Redux)
│   │   ├── Chatbot/         # Floating chatbot widget
│   │   └── Footer/          # Footer with links
│   ├── pages/
│   │   └── index.jsx        # HomePage, PlansPage, SupportPage, ContactPage
│   ├── redux/
│   │   ├── store.js         # Redux store
│   │   └── slices/
│   │       ├── themeSlice.js    # Theme management (dark/light/ocean)
│   │       ├── langSlice.js     # Language management (en/te/hi)
│   │       └── supportSlice.js  # Complaint ticket management
│   ├── i18n/
│   │   ├── index.js         # i18next setup
│   │   └── translations.js  # All translations (EN, Telugu, Hindi)
│   ├── hooks/
│   │   └── useTheme.js      # Injects CSS variables from Redux theme
│   ├── styles/
│   │   └── global.css       # Global styles + animations
│   ├── App.jsx              # Root component with routing
│   └── index.js             # Entry point with Redux Provider
└── package.json
```

---

## ✨ Features

### 🎨 Dynamic Theming (Redux)
- **Dark** — Cyan neon on deep navy
- **Light** — Professional blue on white
- **Ocean** — Teal/coral on deep sea
- Theme controlled via `redux/slices/themeSlice.js`
- CSS variables injected by `useTheme()` hook

### 🌐 Multi-Language (i18next + Redux)
- **English**, **Telugu** (తెలుగు), **Hindi** (हिंदी)
- Language state synced in Redux (`langSlice.js`)
- All translations in `src/i18n/translations.js`
- To add a new language, add its translations and include in `LANGUAGES` array

### 📋 Plans Section
- 4 plans: Basic (50Mbps), Standard (200Mbps), Pro (500Mbps), Giga (1Gbps)
- Featured card highlighting
- All text translatable

### 🔧 Support / Complaint Form
- Form validation
- Complaint stored in Redux store with auto-generated ticket ID
- Success message with ticket number
- All labels translatable

### 💬 Chatbot
- Floating chat widget (bottom-right)
- Smart keyword-based responses for:
  - Internet slow issues
  - No connection
  - Plans & pricing
  - Billing / payments
  - General complaints
- Quick reply buttons
- Typing indicator
- Works in all 3 languages
- **To upgrade to AI:** Replace `getBotResponse()` in `Chatbot.jsx` with Claude API call

### 📱 Responsive
- Mobile hamburger menu
- Responsive grid layouts
- Touch-friendly

---

## 🤖 Upgrading Chatbot to Claude AI

Replace the `getBotResponse` function in `src/components/Chatbot/Chatbot.jsx`:

```js
async function getBotResponse(message) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: "You are a helpful customer support agent for SwiftNet, a cable and internet provider in Telangana, India. Answer questions about internet issues, plans (Basic 50Mbps ₹499, Standard 200Mbps ₹799, Pro 500Mbps ₹1299, Giga 1Gbps ₹1999), billing, and technical support. Be concise and friendly.",
      messages: [{ role: "user", content: message }],
    }),
  });
  const data = await response.json();
  return data.content[0].text;
}
```

Add your API key to `.env`:
```
REACT_APP_CLAUDE_API_KEY=your_key_here
```

---

## 📞 Contact Info to Update

Edit these in the code:
- Phone: `1800-XXX-XXXX` → your actual number
- WhatsApp: `+91 98765 43210` → your number
- Address: `Hyderabad, Telangana` → your office address
- Plans & Prices → update in `src/i18n/translations.js`

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Redux Toolkit | Theme & language state |
| React Redux | Connect Redux to React |
| React Router v6 | Client-side routing |
| i18next + react-i18next | Translations |
| Framer Motion | (Available, add animations) |
| Google Fonts (Syne + DM Sans) | Typography |
| CSS Variables | Dynamic theming |

---

## 📦 Deployment

### Netlify / Vercel
```bash
npm run build
# Upload the /build folder
```

### GitHub Pages
```bash
npm install -D gh-pages
# Add to package.json: "homepage": "https://yourusername.github.io/swiftnet"
npm run build && npx gh-pages -d build
```
