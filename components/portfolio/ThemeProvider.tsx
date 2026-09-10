"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeClass(newTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (newTheme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
    root.style.setProperty("--bg", "#0a0a0a");
    root.style.setProperty("--fg", "#fafafa");
    root.style.setProperty("--fg-muted", "#6b6b6b");
    root.style.backgroundColor = "#0a0a0a";
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    root.style.colorScheme = "light";
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--fg", "#0a0a0a");
    root.style.setProperty("--fg-muted", "#52525b");
    root.style.backgroundColor = "#ffffff";
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = (localStorage.getItem("iuvora_theme") ||
        localStorage.getItem("iuvora_site_theme")) as Theme | null;
      if (saved === "light" || saved === "dark") {
        return saved;
      }
      return "dark"; // Default is ALWAYS dark
    }
    return "dark";
  });

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("iuvora_theme", newTheme);
      localStorage.setItem("iuvora_site_theme", newTheme);
      applyThemeClass(newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme: Theme = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("iuvora_theme", nextTheme);
        localStorage.setItem("iuvora_site_theme", nextTheme);
        applyThemeClass(nextTheme);
      }
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      mounted,
    }),
    [theme, toggleTheme, setTheme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
