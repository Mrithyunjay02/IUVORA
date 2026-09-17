"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "", scrolled = true }: { className?: string; scrolled?: boolean }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center opacity-40 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  // When scrolled, we are on top of apple-liquid-glass, so we need light/glassy colors.
  // When not scrolled, we are transparent on the page background, so we need normal theme colors.
  const darkClasses = scrolled 
    ? "bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-amber-300 hover:text-amber-200"
    : "bg-white/10 hover:bg-white/20 border border-white/20 text-amber-400";
    
  const lightClasses = scrolled
    ? "bg-white/12 hover:bg-white/20 border border-white/20 hover:border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-zinc-100 hover:text-white"
    : "bg-black/5 hover:bg-black/10 border border-black/10 text-zinc-600 hover:text-zinc-900";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 touch-press ${
        isDark ? darkClasses : lightClasses
      } ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun className={`w-4 h-4 sm:w-3.5 sm:h-3.5 transition-transform duration-300 hover:rotate-45 ${scrolled ? "text-amber-300" : "text-amber-400"}`} />
      ) : (
        <Moon className={`w-4 h-4 sm:w-3.5 sm:h-3.5 transition-transform duration-300 hover:-rotate-12 ${scrolled ? "text-zinc-100" : "text-zinc-600"}`} />
      )}
    </button>
  );
}
