"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type SiteTheme = "dark" | "light";

interface SiteThemeContextType {
  theme: SiteTheme;
  toggleTheme: () => void;
  mounted: boolean;
}

const SiteThemeContext = createContext<SiteThemeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "iuvora_site_theme";

/**
 * Applies the site-level theme class to <html>.
 * Also sets CSS variables via style.setProperty so they take priority
 * over the ScrollThemeProvider's inline setProperty calls when in light mode.
 *
 * In DARK mode: remove overrides and let ScrollThemeProvider drive
 * --bg and --fg normally (scroll-driven section wipes).
 *
 * In LIGHT mode: force --bg and --fg to light values and freeze the
 * scroll wipe system by keeping the inline style locked to light.
 */
function applySiteTheme(newTheme: SiteTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (newTheme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
    root.style.colorScheme = "light";
    // Override inline --bg/--fg so ScrollThemeProvider can't mutate them
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--fg", "#0a0a0a");
    root.style.setProperty("--fg-muted", "#52525b");
    root.style.backgroundColor = "#ffffff";
  } else {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
    // Remove overrides — ScrollThemeProvider drives --bg/--fg in dark mode
    root.style.removeProperty("--bg");
    root.style.removeProperty("--fg");
    root.style.removeProperty("--fg-muted");
    root.style.removeProperty("background-color");
  }
}

function subscribe() {
  return () => {};
}
function getClientSnapshot(): boolean {
  return true;
}
function getServerSnapshot(): boolean {
  return false;
}

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as SiteTheme | null;
      if (saved === "light" || saved === "dark") return saved;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }
    return "dark";
  });

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: SiteTheme = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
        applySiteTheme(next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    applySiteTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, mounted }),
    [theme, toggleTheme, mounted]
  );

  return (
    <SiteThemeContext.Provider value={value}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error("useSiteTheme must be used within a SiteThemeProvider");
  }
  return context;
}
