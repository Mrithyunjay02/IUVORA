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

export type CardTheme = "dark" | "light";

interface CardThemeContextType {
  theme: CardTheme;
  toggleTheme: () => void;
  mounted: boolean;
}

const CardThemeContext = createContext<CardThemeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "iuvora_card_theme";

function applyCardTheme(newTheme: CardTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (newTheme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    root.style.colorScheme = "light";
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

export function CardThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<CardTheme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as CardTheme | null;
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
      const next: CardTheme = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
        applyCardTheme(next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    applyCardTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, mounted }),
    [theme, toggleTheme, mounted]
  );

  return (
    <CardThemeContext.Provider value={value}>
      {children}
    </CardThemeContext.Provider>
  );
}

export function useCardTheme() {
  const context = useContext(CardThemeContext);
  if (!context) {
    throw new Error("useCardTheme must be used within a CardThemeProvider");
  }
  return context;
}
