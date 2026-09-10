import React from "react";

interface CardWatermarkProps {
  theme?: "code" | "design" | "executive";
}

export function CardWatermark({ theme = "code" }: CardWatermarkProps) {
  if (theme === "design") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        {/* Figma/Vector Bézier Curve with Tangent Control Handles */}
        <svg
          className="absolute -top-4 -right-10 w-64 h-72 text-[#60a5fa] opacity-[0.045]"
          viewBox="0 0 200 240"
          fill="none"
          stroke="currentColor"
        >
          {/* Tangent guide lines */}
          <line x1="25" y1="45" x2="85" y2="25" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="175" y1="195" x2="115" y2="215" strokeWidth="0.8" strokeDasharray="3 3" />
          {/* Main S-Curve */}
          <path d="M 25 45 C 85 25, 115 215, 175 195" strokeWidth="1.6" />
          {/* Anchor point squares */}
          <rect x="22" y="42" width="6" height="6" fill="currentColor" />
          <rect x="172" y="192" width="6" height="6" fill="currentColor" />
          {/* Tangent handle endpoints */}
          <circle cx="85" cy="25" r="3" fill="none" strokeWidth="1" stroke="currentColor" />
          <circle cx="115" cy="215" r="3" fill="none" strokeWidth="1" stroke="currentColor" />
        </svg>

        {/* Micro-alignment layout grid */}
        <svg
          className="absolute inset-0 w-full h-full text-[#3b82f6] opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="designGridPattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 30 0 L 34 0 M 32 -2 L 32 2" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#designGridPattern)" />
        </svg>

        {/* Minimalist Design System token signature */}
        <div className="absolute bottom-16 right-4 text-[9.5px] font-mono tracking-widest text-[#93c5fd] opacity-[0.05] uppercase">
          1:1.618 · GRID_8
        </div>
      </div>
    );
  }

  if (theme === "executive") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        {/* Luxury Guilloché / Currency Geometric Concentric Rings */}
        <svg
          className="absolute -top-12 -right-12 w-64 h-64 text-[#d9b266] opacity-[0.05]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <circle cx="100" cy="100" r="90" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="75" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="45" />
          <circle cx="100" cy="100" r="30" strokeDasharray="1 3" />
          <polygon points="100,10 125,75 195,100 125,125 100,190 75,125 5,100 75,75" strokeWidth="0.6" opacity="0.6" />
        </svg>
        <div className="absolute bottom-16 right-4 text-[9.5px] font-mono tracking-widest text-[#d9b266] opacity-[0.05] uppercase">
          EST. 2024 · IUVORA
        </div>
      </div>
    );
  }

  // Default: Code Theme (Software Engineer)
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
    >
      {/* Faint Architectural Curly Brace in top-right */}
      <svg
        className="absolute -top-6 -right-6 w-48 h-64 text-[#3b82f6] opacity-[0.045]"
        viewBox="0 0 100 160"
        fill="currentColor"
      >
        <path d="M70 20c-18 0-30 8-30 25v15c0 10-6 16-16 19 10 3 16 9 16 19v17c0 17 12 25 30 25v-10c-12 0-18-5-18-17v-17c0-10-6-16-18-17 12-1 18-7 18-17v-17c0-12 6-17 18-17V20z" />
      </svg>

      {/* Faint Monospace Syntax Code Block in bottom-right */}
      <div
        className="absolute bottom-14 -right-1 text-[10.5px] font-mono leading-relaxed text-[#60a5fa] opacity-[0.04] text-right tracking-wider select-none pointer-events-none"
        style={{ fontFamily: "ui-monospace, 'Geist Mono', 'JetBrains Mono', monospace" }}
      >
        <div>const init = async () =&gt; &#123;</div>
        <div>&nbsp;&nbsp;await compile(sys);</div>
        <div>&nbsp;&nbsp;return deploy(&#123; ok &#125;);</div>
        <div>&#125;;</div>
      </div>

      {/* Faint Syntax Chevron Glyphs in upper center */}
      <svg
        className="absolute top-28 right-8 w-16 h-16 text-[#3b82f6] opacity-[0.035]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </div>
  );
}
