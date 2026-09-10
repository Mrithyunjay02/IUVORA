"use client";

import { useEffect, useState, useRef } from "react";
import { IuvoraLogo } from "@/components/icons/IuvoraLogo";

export function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Session check - only show once per session
    const hasShown = sessionStorage.getItem("iuvora_preloader_shown");
    if (hasShown) {
      setTimeout(() => setIsMounted(false), 0);
      return;
    }
    sessionStorage.setItem("iuvora_preloader_shown", "true");

    // 2. Prefers reduced motion check
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number;
    let forceComplete = false;

    // Hard cap timeout
    const maxTime = prefersReduced ? 400 : 1500;
    const timeoutId = setTimeout(() => {
      forceComplete = true;
    }, maxTime);

    // Track assets
    let fontsReady = false;
    let videoReady = false;
    
    // Fonts
    document.fonts.ready.then(() => {
      fontsReady = true;
    });

    // Animation Loop
    const tick = () => {
      // Calculate target progress based on actual readiness
      if (forceComplete) {
        targetProgress = 100;
      } else if (prefersReduced) {
        targetProgress = 100; // Will complete quickly based on hard cap
      } else {
        let newTarget = 33; // DOM is ready by virtue of this running

        if (fontsReady) newTarget += 33;

        if (!videoReady) {
          const videoEl = document.getElementById("hero-video-element") as HTMLVideoElement | null;
          // If video isn't on this page or is ready
          if (!videoEl || videoEl.readyState >= 3) {
            videoReady = true;
          }
        }
        if (videoReady) newTarget += 34;
        
        targetProgress = Math.max(targetProgress, newTarget);
      }

      // Lerp (lowered from 0.15 to 0.03 to make it readable on fast loads)
      currentProgress += (targetProgress - currentProgress) * 0.03;
      
      // Snap to 100 if close
      if (targetProgress === 100 && currentProgress > 99.5) {
        currentProgress = 100;
      }

      // Update DOM directly to avoid React re-renders
      if (progressRef.current) {
        progressRef.current.style.width = `${currentProgress}%`;
      }
      if (textRef.current && !prefersReduced) {
        textRef.current.textContent = Math.round(currentProgress).toString();
      }

      // Check completion
      if (currentProgress >= 100) {
        clearTimeout(timeoutId);
        setIsExiting(true);
        setTimeout(() => setIsMounted(false), 400); // Wait for CSS transition
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
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none"
      style={{
        backgroundColor: "var(--color-black)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.05)" : "scale(1)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out",
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
