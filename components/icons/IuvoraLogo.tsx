import React from "react";

interface IuvoraLogoProps {
  className?: string;
  /** If true, renders only the mark (triangle/infinity), not the wordmark */
  markOnly?: boolean;
  /** Width in px — height scales proportionally */
  width?: number;
}

/**
 * IuvoraLogo — SVG logo mark + wordmark
 *
 * Mark: Geometric blue triangle with an inner infinity-like void
 * Wordmark: "IUVORA" in Inter Tight, black or white depending on context
 *
 * NOTE: Replace this with the real logo SVG when the brand asset is ready.
 * The wordmark color inherits currentColor so it inverts with the theme.
 * The mark uses the locked accent blue (#2F7BFF) — always blue regardless of theme.
 */
export function IuvoraLogo({ className = "", markOnly = false, width = 140 }: IuvoraLogoProps) {
  const markSize = width * 0.22;
  const totalWidth = markOnly ? markSize : width;

  if (markOnly) {
    return (
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Iuvora mark"
        role="img"
      >
        {/* Triangle body */}
        <path
          d="M20 2L38 36H2L20 2Z"
          fill="#2F7BFF"
        />
        {/* Inner infinity-like void — creates the mark's distinctive cutout */}
        <path
          d="M20 14C17.5 14 15.5 16 15.5 18.5C15.5 20 16.5 21 17.8 21.5C16.5 22 15 23 15 25C15 27.2 16.8 29 19 29H21C23.2 29 25 27.2 25 25C25 23 23.5 22 22.2 21.5C23.5 21 24.5 20 24.5 18.5C24.5 16 22.5 14 20 14Z"
          fill="white"
          opacity="0.9"
        />
      </svg>
    );
  }

  return (
    <svg
      width={totalWidth}
      height={totalWidth * 0.22}
      viewBox="0 0 200 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Iuvora"
      role="img"
    >
      {/* Mark */}
      <path d="M20 2L38 42H2L20 2Z" fill="#2F7BFF" />
      <path
        d="M20 16C17.8 16 16 18 16 20.5C16 22 16.8 23 18 23.5C16.8 24 15.5 25.2 15.5 27C15.5 29 17 30.5 19 30.5H21C23 30.5 24.5 29 24.5 27C24.5 25.2 23.2 24 22 23.5C23.2 23 24 22 24 20.5C24 18 22.2 16 20 16Z"
        fill="white"
        opacity="0.9"
      />
      {/* Wordmark — inherits currentColor so it flips with theme */}
      <text
        x="50"
        y="31"
        fill="currentColor"
        fontFamily="'Inter Tight', sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="-0.03em"
      >
        IUVORA
      </text>
    </svg>
  );
}
