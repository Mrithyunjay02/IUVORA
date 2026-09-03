"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface DeviceMascotProps {
  className?: string;
  delay?: number;
}

export function DeviceMascot({ className = "", delay = 0 }: DeviceMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<SVGGElement>(null);
  const keysRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", delay }
    );

    // Screen glow animation
    gsap.to(screenRef.current, {
      opacity: [0.6, 1, 0.6],
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      delay: delay + 0.5,
    });

    // Keyboard typing animation
    gsap.to(keysRef.current, {
      opacity: [0.3, 0.8, 0.3],
      duration: 2.5,
      ease: "power1.inOut",
      repeat: -1,
      delay: delay + 0.8,
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
        viewBox="0 0 200 240"
        width="280"
        height="336"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
        aria-hidden="true"
      >
        {/* Laptop base/stand */}
        <g stroke="url(#accentGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Screen bezel */}
          <rect x="20" y="20" width="160" height="100" rx="8" opacity="0.4" />

          {/* Inner screen area */}
          <rect x="30" y="35" width="140" height="70" rx="4" opacity="0.6" />

          {/* Screen lines - representing content */}
          <g ref={screenRef} style={{ opacity: 0.6 }}>
            <line x1="40" y1="50" x2="160" y2="50" opacity="0.3" strokeWidth="1.5" />
            <line x1="40" y1="60" x2="140" y2="60" opacity="0.25" strokeWidth="1.5" />
            <line x1="40" y1="70" x2="150" y2="70" opacity="0.25" strokeWidth="1.5" />
            <line x1="40" y1="80" x2="130" y2="80" opacity="0.3" strokeWidth="1.5" />
          </g>

          {/* Keyboard base */}
          <rect x="15" y="125" width="170" height="50" rx="4" opacity="0.5" />

          {/* Keyboard keys hint */}
          <g ref={keysRef} style={{ opacity: 0.3 }}>
            <circle cx="35" cy="140" r="2.5" />
            <circle cx="55" cy="140" r="2.5" />
            <circle cx="75" cy="140" r="2.5" />
            <circle cx="95" cy="140" r="2.5" />
            <circle cx="115" cy="140" r="2.5" />
            <circle cx="135" cy="140" r="2.5" />
            <circle cx="155" cy="140" r="2.5" />
            <circle cx="175" cy="140" r="2.5" />

            <circle cx="40" cy="155" r="2.5" />
            <circle cx="65" cy="155" r="2.5" />
            <circle cx="90" cy="155" r="2.5" />
            <circle cx="115" cy="155" r="2.5" />
            <circle cx="140" cy="155" r="2.5" />
            <circle cx="165" cy="155" r="2.5" />
          </g>

          {/* Hinge lines */}
          <line x1="20" y1="125" x2="180" y2="125" opacity="0.4" strokeWidth="1.5" />

          {/* Laptop stand/feet */}
          <line x1="40" y1="175" x2="35" y2="210" opacity="0.4" strokeWidth="2" />
          <line x1="160" y1="175" x2="165" y2="210" opacity="0.4" strokeWidth="2" />
          <line x1="35" y1="210" x2="165" y2="210" opacity="0.4" strokeWidth="2" />
        </g>

        {/* Accent glow - animated accent color */}
        <defs>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.6 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Decorative accent circles around device */}
        <g opacity="0.15">
          <circle cx="100" cy="120" r="130" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="100" cy="120" r="100" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
