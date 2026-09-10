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
    line1: "// Iuvora Production Engine",
    line2: "const sys = await compile({",
    line3: '  runtime: "Edge · Next.js",',
    line4: "  uptime: '99.98%',",
    line5: '  status: "verified"',
    line6: "});",
  };

  const lines = { ...defaultLines, ...codeLines };
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (containerRef.current) gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", delay }
    );

    // Subtle gentle float animation
    gsap.to(containerRef.current, {
      y: -8,
      duration: 4.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay + 0.3,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      <svg
        viewBox="0 0 280 300"
        width="460"
        height="490"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl select-none pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="terminalBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="codeTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
        </defs>

        {/* Console background panel */}
        <rect
          x="12"
          y="12"
          width="256"
          height="276"
          rx="12"
          fill="#0a0d14"
          fillOpacity="0.9"
          stroke="url(#terminalBorderGrad)"
          strokeWidth="1.2"
        />

        {/* Title bar separator */}
        <line x1="12" y1="44" x2="268" y2="44" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

        {/* Window control indicators */}
        <circle cx="28" cy="28" r="3.5" fill="#ef4444" fillOpacity="0.75" />
        <circle cx="40" cy="28" r="3.5" fill="#eab308" fillOpacity="0.75" />
        <circle cx="52" cy="28" r="3.5" fill="#22c55e" fillOpacity="0.75" />

        {/* Title bar label */}
        <text
          x="140"
          y="32"
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="ui-monospace, monospace"
          fill="#94a3b8"
          letterSpacing="0.08em"
        >
          iuvora-engine · v2.4
        </text>

        {/* Line numbers column guide */}
        <line x1="38" y1="44" x2="38" y2="252" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />

        {/* Line numbers */}
        <g fontSize="9" fontFamily="ui-monospace, monospace" fill="#475569" textAnchor="end">
          <text x="32" y="70">01</text>
          <text x="32" y="94">02</text>
          <text x="32" y="118">03</text>
          <text x="32" y="142">04</text>
          <text x="32" y="166">05</text>
          <text x="32" y="190">06</text>
        </g>

        {/* Code statements */}
        <g ref={codeRef} fontSize="11" fontFamily="ui-monospace, 'Geist Mono', monospace" textRendering="optimizeLegibility">
          {/* Line 1: Comment */}
          <text x="48" y="70" fill="#64748b" fontStyle="italic">
            {lines.line1}
          </text>

          {/* Line 2 */}
          <text x="48" y="94" fill="#93c5fd">
            {lines.line2}
          </text>

          {/* Line 3 */}
          <text x="58" y="118" fill="#38bdf8">
            {lines.line3}
          </text>

          {/* Line 4 */}
          <text x="58" y="142" fill="#38bdf8">
            {lines.line4}
          </text>

          {/* Line 5 */}
          <text x="58" y="166" fill="#34d399">
            {lines.line5}
          </text>

          {/* Line 6 */}
          <text x="48" y="190" fill="#93c5fd">
            {lines.line6}
          </text>
        </g>

        {/* Bottom status bar */}
        <line x1="12" y1="252" x2="268" y2="252" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        <circle cx="28" cy="267" r="3" fill="#22c55e" />
        <text
          x="38"
          y="270"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="#94a3b8"
          letterSpacing="0.04em"
        >
          verified · 0 errors · 14ms latency
        </text>
      </svg>
    </div>
  );
}
