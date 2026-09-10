"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CardProfile } from "@/data/cards/types";
import { CardHero } from "./CardHero";
import { CardActions } from "./CardActions";
import { CardSocials } from "./CardSocials";
import { CardFooter } from "./CardFooter";
import { CardWatermark } from "./CardWatermark";

interface CardContainerProps {
  profile: CardProfile;
}

/**
 * CardContainer
 *
 * TYPOGRAPHY:
 * - Base font: Montserrat (sans-serif) for all UI, metadata, and body.
 * - Name/Headline in CardHero: Libre Baskerville (serif).
 *
 * COLOR:
 * - Base: Dark matte paper neutral (#070709 background, #0D0D11 card).
 * - Accent Blue: #2F7BFF (Iuvora brand token) used in strictly 2 places:
 *   1. Save Contact button in CardActions.tsx
 *   2. Single hairline rule in CardFooter.tsx
 * - Zero gold/yellow anywhere.
 *
 * ANTI-GENERIC CRAFT:
 * - Real SVG paper-grain noise texture overlay (feTurbulence).
 * - Single signature asymmetric detail: chamfered top-right corner (rounded-2xl rounded-tr-none).
 * - Varied radii: card (16px/0px), button (8px), avatar (12px).
 * - No soft glows, no glassmorphism, no telemetry HUD gimmicks.
 */
/**
 * Resolves borderAccent token or hex to a subtle hairline border color:
 * - "blue" (Co-Founder tier): Iuvora brand blue hairline (rgba(47, 123, 255, 0.30))
 * - "gold" (Founder tier): Subtle Iuvora-adjacent gold hairline (rgba(197, 160, 89, 0.35))
 * - hex value: Custom hex applied with hairline opacity
 */
function getBorderAccentStyle(accent?: string): { borderColor: string; boxShadow: string } {
  if (accent === "gold") {
    return {
      borderColor: "rgba(217, 178, 102, 0.48)",
      boxShadow: "0 0 0 1px rgba(217, 178, 102, 0.18), 0 20px 50px rgba(0, 0, 0, 0.85)",
    };
  }
  return {
    borderColor: "rgba(37, 99, 235, 0.38)",
    boxShadow: "0 0 0 1px rgba(37, 99, 235, 0.14), 0 20px 50px rgba(0, 0, 0, 0.85)",
  };
}

export function CardContainer({ profile }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set(".card-anim-item", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".card-anim-item",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.05,
          clearProps: "transform",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#070709] overflow-x-hidden selection:bg-[#2563eb] selection:text-white"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      {/* ── Subtle SVG Paper Grain / Noise Texture (No flat black, no gradients, no glows) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.045] mix-blend-screen select-none"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="paperGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paperGrain)" />
        </svg>
      </div>

      {/* ── Physical Visiting Card: exactly ONE asymmetric signature detail (chamfered top-right corner) ── */}
      <div
        className="relative z-10 w-full max-w-[390px] rounded-2xl rounded-tr-none bg-[#0D0D11] border shadow-[0_20px_50px_rgba(0,0,0,0.85)] px-6 py-7 sm:px-7 sm:py-8 space-y-6 my-auto transition-colors duration-200 overflow-hidden"
        style={getBorderAccentStyle(profile.borderAccent)}
      >
        {/* Role-Specific Background Watermark */}
        <CardWatermark
          theme={
            profile.theme ||
            (profile.borderAccent === "gold"
              ? "executive"
              : profile.title.toLowerCase().includes("design")
              ? "design"
              : "code")
          }
        />

        {/* 1. Hero (Baskerville name + Montserrat title/bio) */}
        <div className="card-anim-item opacity-0">
          <CardHero profile={profile} />
        </div>

        {/* 2. Actions (contains Iuvora Blue Accent #1: Save Contact button) */}
        <div className="card-anim-item opacity-0">
          <CardActions profile={profile} />
        </div>

        {/* 3. Socials */}
        {profile.socials && Object.values(profile.socials).some(Boolean) && (
          <div className="card-anim-item opacity-0 pt-1">
            <CardSocials socials={profile.socials} />
          </div>
        )}

        {/* 4. Footer */}
        <div className="card-anim-item opacity-0">
          <CardFooter borderAccent={profile.borderAccent} />
        </div>
      </div>
    </main>
  );
}
