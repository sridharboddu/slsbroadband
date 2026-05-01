// src/hooks/useTheme.js
// Injects theme CSS variables into :root whenever theme changes
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/themeSlice";

export function useTheme() {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--surface2", theme.surface2);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent2", theme.accent2);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--border-color", theme.border);
    root.style.setProperty("--glow", theme.glow);
    root.style.setProperty("--nav-bg", theme.navBg);
  }, [theme]);

  return theme;
}
