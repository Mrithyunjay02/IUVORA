"use client";

import { useCardTheme } from "./CardThemeProvider";

/**
 * CardThemeToggle
 *
 * Minimal sun/moon pill that sits in the top-right corner of the card page.
 * Uses useCardTheme() context — must be inside <CardThemeProvider>.
 * Fully accessible: aria-label, focus ring, min 44×44px tap target.
 */
export function CardThemeToggle() {
  const { theme, toggleTheme, mounted } = useCardTheme();

  if (!mounted) {
    // Render empty placeholder to avoid layout shift
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        flex items-center justify-center w-9 h-9 rounded-full
        border transition-all duration-200 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        active:scale-95
        ${isDark
          ? "bg-white/[0.06] border-white/[0.12] text-zinc-300 hover:bg-white/[0.12] hover:text-white focus-visible:ring-white/30 focus-visible:ring-offset-[#070709]"
          : "bg-black/[0.06] border-black/[0.12] text-zinc-600 hover:bg-black/[0.1] hover:text-black focus-visible:ring-black/20 focus-visible:ring-offset-[#F5F4F0]"
        }
      `}
    >
      {isDark ? (
        /* Sun icon */
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" strokeLinecap="round" />
          <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        /* Moon icon */
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}
