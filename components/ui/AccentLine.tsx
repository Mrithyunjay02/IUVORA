"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AccentLineProps {
  className?: string;
  trigger?: "load" | "scroll";
  delay?: number;
}

export function AccentLine({
  className = "",
  trigger = "scroll",
  delay = 0,
}: AccentLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (trigger === "load") {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.out", delay }
      );
    } else {
      ScrollTrigger.create({
        trigger: lineRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.out", delay }
          );
        },
      });
    }
  }, { scope: lineRef });

  return (
    <div
      ref={lineRef}
      className={className}
      style={{
        height: "2px",
        background: "var(--color-accent)",
        transformOrigin: "left",
      }}
      aria-hidden="true"
    />
  );
}
