"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Shape = "circle" | "hexagon";

interface GeometricAccentProps {
  shape?: Shape;
  size?: number;
  opacity?: number;
  className?: string;
  trigger?: "load" | "scroll" | "hover";
  animateOnHover?: boolean;
  delay?: number;
}

export function GeometricAccent({
  shape = "circle",
  size = 100,
  opacity = 0.15,
  className = "",
  trigger = "scroll",
  animateOnHover = false,
  delay = 0,
}: GeometricAccentProps) {
  const accentRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (trigger === "load") {
      gsap.fromTo(
        accentRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: opacity, scale: 1, duration: 0.6, ease: "power2.out", delay }
      );
    } else if (trigger === "scroll") {
      ScrollTrigger.create({
        trigger: accentRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            accentRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: opacity, scale: 1, duration: 0.6, ease: "power2.out", delay }
          );
        },
      });
    }
  }, { scope: accentRef });

  const handleMouseEnter = () => {
    if (!animateOnHover) return;
    gsap.to(accentRef.current, {
      opacity: opacity * 1.5,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!animateOnHover) return;
    gsap.to(accentRef.current, {
      opacity: opacity,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <svg
      ref={accentRef}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        opacity: trigger === "load" ? opacity : 0,
        pointerEvents: "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {shape === "circle" ? (
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
      ) : (
        <g>
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}
