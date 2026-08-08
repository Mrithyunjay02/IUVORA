import React from "react";

interface SectionWrapperProps {
  theme: "dark" | "light";
  id?: string;
  className?: string;
  children: React.ReactNode;
  noPad?: boolean;
}

/**
 * SectionWrapper
 *
 * Wraps a full-width section with data-theme attribute.
 * Background is TRANSPARENT — color lives on body.
 * IntersectionObserver in ScrollThemeProvider reads data-theme
 * to flip --bg/--fg on <html>.
 */
export function SectionWrapper({
  theme,
  id,
  className = "",
  children,
  noPad = false,
}: SectionWrapperProps) {
  return (
    <section
      data-theme={theme}
      id={id}
      className={`relative w-full${noPad ? "" : " section-pad"}${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}
