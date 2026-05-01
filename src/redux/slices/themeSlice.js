// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const THEMES = {
  dark: {
    name: "dark",
    bg: "#0a0f1e",
    surface: "#111827",
    surface2: "#1a2235",
    accent: "#00d4ff",
    accent2: "#7c3aed",
    text: "#f0f4ff",
    muted: "#8892aa",
    border: "rgba(0,212,255,0.15)",
    glow: "0 0 32px rgba(0,212,255,0.14)",
    navBg: "rgba(10,15,30,0.92)",
  },
  light: {
    name: "light",
    bg: "#f5f7ff",
    surface: "#ffffff",
    surface2: "#eef1fb",
    accent: "#0066cc",
    accent2: "#7c3aed",
    text: "#0a0f1e",
    muted: "#5a6380",
    border: "rgba(0,102,204,0.18)",
    glow: "0 4px 24px rgba(0,102,204,0.12)",
    navBg: "rgba(255,255,255,0.94)",
  },
  ocean: {
    name: "ocean",
    bg: "#001a2e",
    surface: "#002a44",
    surface2: "#003355",
    accent: "#00e5b0",
    accent2: "#ff6b35",
    text: "#e0f7f0",
    muted: "#6bbfa0",
    border: "rgba(0,229,176,0.18)",
    glow: "0 0 32px rgba(0,229,176,0.14)",
    navBg: "rgba(0,26,46,0.92)",
  },
};

const initialState = {
  current: "dark",
  themes: THEMES,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      if (THEMES[action.payload]) {
        state.current = action.payload;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.themes[state.theme.current];
export const selectThemeName = (state) => state.theme.current;
export default themeSlice.reducer;
