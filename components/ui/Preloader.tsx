"use client";

import { useEffect, useState, useRef } from "react";
import { IuvoraLogo } from "@/components/icons/IuvoraLogo";

export function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Reduced motion check - exit immediately if requested
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTimeout(() => setIsMounted(false), 0);
      return;
    }

    // 2. Session check - only show once per session
    const hasShown = sessionStorage.getItem("iuvora_preloader_shown");
    if (hasShown) {
      setTimeout(() => setIsMounted(false), 0);
      return;
    }
    sessionStorage.setItem("iuvora_preloader_shown", "true");

    let currentProgress = 0;
    let targetProgress = 50;
    let rafId: number;
    let forceComplete = false;

    // Hard cap timeout: max 450ms (never stall the user for 1.5s)
    const timeoutId = setTimeout(() => {
      forceComplete = true;
    }, 450);

    // Track fonts
    document.fonts.ready.then(() => {
      targetProgress = 100;
    });

    // Animation Loop
    const tick = () => {
      if (forceComplete) {
        targetProgress = 100;
      }

      // Responsive lerp (0.18 instead of artificial 0.03 stall)
      currentProgress += (targetProgress - currentProgress) * 0.18;

      // Snap to 100 if close
      if (targetProgress === 100 && currentProgress > 98) {
        currentProgress = 100;
      }

      // Update DOM directly to avoid React re-renders
      if (progressRef.current) {
        progressRef.current.style.width = `${currentProgress}%`;
      }
      if (textRef.current) {
        textRef.current.textContent = Math.round(currentProgress).toString();
      }

      // Check completion
      if (currentProgress >= 100) {
        clearTimeout(timeoutId);
        setIsExiting(true);
        setTimeout(() => setIsMounted(false), 250); // Fast CSS transition
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
      style={{
        backgroundColor: "var(--color-black)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.05)" : "scale(1)",
        transition: "opacity 250ms ease-out, transform 250ms ease-out",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <IuvoraLogo width={160} priority={true} />
        <p
          className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-center max-w-[80vw]"
          style={{ color: "var(--color-accent)" }}
        >
          Crafting Fast, Scalable Digital Experiences.
        </p>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full max-w-[240px]">
        <div
          className="w-full h-[2px] overflow-hidden rounded-full"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-white) 15%, transparent)" }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full w-0"
            style={{ backgroundColor: "var(--color-accent)", willChange: "width" }}
          />
        </div>
        <div 
          className="text-[10px] tracking-widest font-mono"
          style={{ color: "var(--color-gray-mid)" }}
          aria-live="polite"
        >
          <span ref={textRef}>0</span>%
        </div>
      </div>
    </div>
  );
}
