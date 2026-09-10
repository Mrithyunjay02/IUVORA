"use client";

import { useSiteTheme } from "./SiteThemeProvider";

/**
 * SiteThemeToggle — Sun/Moon pill for the main site Header.
 * Adapts its own colours using CSS var(--fg) / var(--bg) so it always
 * reads correctly regardless of which section the ScrollThemeProvider
 * is currently showing.
 */
export function SiteThemeToggle() {
  const { theme, toggleTheme, mounted } = useSiteTheme();

  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 active:scale-95"
      style={{
        backgroundColor: "color-mix(in srgb, var(--fg) 8%, transparent)",
        border: "1px solid color-mix(in srgb, var(--fg) 14%, transparent)",
        color: "var(--fg)",
      }}
    >
      {isDark ? (
        /* Sun: switch to light */
        <svg
          className="w-[15px] h-[15px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon: switch to dark */
        <svg
          className="w-[15px] h-[15px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}
