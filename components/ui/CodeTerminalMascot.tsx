"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CodeTerminalMascotProps {
  className?: string;
  delay?: number;
  codeLines?: {
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    line5?: string;
    line6?: string;
  };
}

export function CodeTerminalMascot({ className = "", delay = 0, codeLines }: CodeTerminalMascotProps) {
  const defaultLines = {
    line1: "<div>",
    line2: "className=",
    line3: '"build"',
    line4: "</div>",
    line5: "<span>...</span>",
    line6: "</>",
  };

  const lines = { ...defaultLines, ...codeLines };
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGLineElement>(null);
  const codeRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", delay }
    );

    // Blinking cursor
    gsap.fromTo(
      cursorRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 0.5,
      }
    );

    // Code lines typing effect
    gsap.fromTo(
      codeRef.current,
      { opacity: 0.4 },
      {
        opacity: 1,
        duration: 1.25,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 0.3,
      }
    );

    // Subtle float animation
    gsap.to(containerRef.current, {
      y: -10,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay + 0.3,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      <svg
        viewBox="0 0 240 280"
        width="450"
        height="520"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>

        {/* Terminal window border */}
        <g stroke="url(#codeGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Main window frame */}
          <rect x="20" y="20" width="200" height="240" rx="12" opacity="0.8" />

          {/* Title bar */}
          <line x1="20" y1="50" x2="220" y2="50" opacity="0.6" strokeWidth="1.5" />

          {/* Window controls (circles) */}
          <circle cx="35" cy="35" r="3" opacity="0.4" />
          <circle cx="50" cy="35" r="3" opacity="0.4" />
          <circle cx="65" cy="35" r="3" opacity="0.4" />

          {/* Code lines - left angle bracket */}
          <g ref={codeRef} style={{ opacity: 1 }} textRendering="optimizeLegibility">
            {/* Line 1 */}
            <text x="35" y="75" fontSize="12" fontFamily="monospace" fill="url(#codeGradient)" opacity="1" stroke="none">
              {lines.line1}
            </text>

            {/* Line 2 */}
            <text x="45" y="95" fontSize="11" fontFamily="monospace" fill="var(--color-accent)" opacity="0.9" stroke="none">
              {lines.line2}
            </text>

            {/* Line 3 */}
            <text x="55" y="115" fontSize="11" fontFamily="monospace" fill="var(--color-accent)" opacity="0.85" stroke="none">
              {lines.line3}
            </text>

            {/* Line 4 */}
            <text x="35" y="135" fontSize="12" fontFamily="monospace" fill="url(#codeGradient)" opacity="1" stroke="none">
              {lines.line4}
            </text>

            {/* Line 5 */}
            <text x="35" y="160" fontSize="12" fontFamily="monospace" fill="url(#codeGradient)" opacity="0.9" stroke="none">
              {lines.line5}
            </text>

            {/* Line 6 */}
            <text x="35" y="185" fontSize="12" fontFamily="monospace" fill="url(#codeGradient)" opacity="0.85" stroke="none">
              {lines.line6}
            </text>
          </g>

          {/* Blinking cursor */}
          <line
            ref={cursorRef}
            x1="175"
            y1="205"
            x2="175"
            y2="225"
            stroke="url(#codeGradient)"
            strokeWidth="2.5"
            opacity="1"
            strokeLinecap="round"
          />

          {/* Bottom accent bar */}
          <line x1="20" y1="250" x2="220" y2="250" opacity="0.4" strokeWidth="1.5" />
        </g>

      </svg>
    </div>
  );
}
