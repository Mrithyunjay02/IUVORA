"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BrainMascotProps {
  className?: string;
  delay?: number;
}

export function BrainMascot({ className = "", delay = 0 }: BrainMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const linesRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", delay }
    );

    // Nodes pulsing animation
    gsap.to(nodesRef.current, {
      opacity: [0.5, 1, 0.5],
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      delay: delay + 0.4,
    });

    // Connection lines glow
    gsap.to(linesRef.current, {
      opacity: [0.4, 0.9, 0.4],
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      delay: delay + 0.3,
    });

    // Rotating brain effect (slight rotation)
    gsap.to(containerRef.current, {
      rotationZ: [-2, 2, -2],
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      delay: delay + 0.5,
      transformOrigin: "50% 50%",
    });

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
        width="280"
        height="326"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>

        {/* Main brain outer circle */}
        <g stroke="url(#brainGradient)" strokeWidth="2" fill="none">
          {/* Brain hemisphere outline */}
          <circle cx="120" cy="120" r="80" opacity="0.6" />
          <circle cx="120" cy="120" r="60" opacity="0.4" />
        </g>

        {/* Connection lines between nodes */}
        <g ref={linesRef} stroke="url(#brainGradient)" strokeWidth="1.5" opacity="0.4">
          {/* Top connections */}
          <line x1="80" y1="60" x2="120" y2="90" />
          <line x1="160" y1="60" x2="120" y2="90" />
          <line x1="80" y1="60" x2="160" y2="60" />

          {/* Middle connections */}
          <line x1="60" y1="120" x2="100" y2="120" />
          <line x1="140" y1="120" x2="180" y2="120" />
          <line x1="100" y1="120" x2="140" y2="120" />

          {/* Bottom connections */}
          <line x1="80" y1="180" x2="120" y2="150" />
          <line x1="160" y1="180" x2="120" y2="150" />
          <line x1="80" y1="180" x2="160" y2="180" />

          {/* Cross connections for neural network feel */}
          <line x1="80" y1="60" x2="60" y2="120" />
          <line x1="160" y1="60" x2="180" y2="120" />
          <line x1="60" y1="120" x2="80" y2="180" />
          <line x1="180" y1="120" x2="160" y2="180" />
        </g>

        {/* Neural nodes - circles at connection points */}
        <g ref={nodesRef} fill="url(#brainGradient)" opacity="0.5">
          {/* Top nodes */}
          <circle cx="80" cy="60" r="4" />
          <circle cx="120" cy="90" r="5" />
          <circle cx="160" cy="60" r="4" />

          {/* Middle nodes */}
          <circle cx="60" cy="120" r="4" />
          <circle cx="120" cy="120" r="6" /> {/* Central node - largest */}
          <circle cx="180" cy="120" r="4" />

          {/* Bottom nodes */}
          <circle cx="80" cy="180" r="4" />
          <circle cx="120" cy="150" r="5" />
          <circle cx="160" cy="180" r="4" />
        </g>

        {/* Brain hemisphere detail lines - left side */}
        <g stroke="url(#brainGradient)" strokeWidth="1" opacity="0.25" fill="none">
          <path d="M 70 80 Q 65 100 70 120 Q 65 140 70 160" />
          <path d="M 85 70 Q 80 95 85 120 Q 80 145 85 170" />
          <path d="M 100 60 Q 100 90 100 120 Q 100 150 100 180" />
        </g>

        {/* Brain hemisphere detail lines - right side */}
        <g stroke="url(#brainGradient)" strokeWidth="1" opacity="0.25" fill="none">
          <path d="M 170 80 Q 175 100 170 120 Q 175 140 170 160" />
          <path d="M 155 70 Q 160 95 155 120 Q 160 145 155 170" />
          <path d="M 140 60 Q 140 90 140 120 Q 140 150 140 180" />
        </g>

        {/* Decorative elements - orbiting circles */}
        <g opacity="0.08">
          <circle cx="120" cy="120" r="110" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="120" cy="120" r="140" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
