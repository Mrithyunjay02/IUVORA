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
import { CardThemeToggle } from "./CardThemeToggle";

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
 * COLOR (dark mode — default):
 * - Base: Dark matte paper neutral (#070709 background, #0D0D11 card).
 * - Accent Blue: #2563eb (Iuvora brand token) used in strictly 2 places:
 *   1. Save Contact button in CardActions.tsx
 *   2. Single hairline rule in CardFooter.tsx
 *
 * COLOR (light mode):
 * - Base: Off-white #F5F4F0 background, #FAFAF8 card.
 * - Same blue accent; borders/text adapt via dark:/light: Tailwind variants.
 *
 * ANTI-GENERIC CRAFT:
 * - Real SVG paper-grain noise texture overlay (feTurbulence).
 * - Single signature asymmetric detail: chamfered top-right corner (rounded-2xl rounded-tr-none).
 * - Varied radii: card (16px/0px), button (8px), avatar (12px).
 * - No soft glows, no glassmorphism, no telemetry HUD gimmicks.
 */

function getBorderAccentStyle(
  accent: string | undefined,
  isDark: boolean
): { borderColor: string; boxShadow: string } {
  if (accent === "gold") {
    return {
      borderColor: isDark
        ? "rgba(217, 178, 102, 0.48)"
        : "rgba(180, 140, 60, 0.45)",
      boxShadow: isDark
        ? "0 0 0 1px rgba(217, 178, 102, 0.18), 0 20px 50px rgba(0, 0, 0, 0.85)"
        : "0 0 0 1px rgba(180, 140, 60, 0.14), 0 16px 40px rgba(0, 0, 0, 0.10)",
    };
  }
  return {
    borderColor: isDark
      ? "rgba(37, 99, 235, 0.38)"
      : "rgba(37, 99, 235, 0.28)",
    boxShadow: isDark
      ? "0 0 0 1px rgba(37, 99, 235, 0.14), 0 20px 50px rgba(0, 0, 0, 0.85)"
      : "0 0 0 1px rgba(37, 99, 235, 0.10), 0 16px 40px rgba(0, 0, 0, 0.08)",
  };
}

export function CardContainer({ profile }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
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

  // Read the current theme class from <html> for inline style computation.
  // CardThemeToggle manages the toggle; CardContainer is purely presentational.
  const isDark =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true;

  return (
    <main
      ref={containerRef}
      className="
        relative min-h-svh w-full flex items-center justify-center
        overflow-x-hidden
        selection:bg-[#2563eb] selection:text-white
        transition-colors duration-200
        bg-[#070709] dark:bg-[#070709] light:bg-[#F5F4F0]
      "
      style={{
        fontFamily: "var(--font-montserrat), sans-serif",
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      {/* ── Theme Toggle (top-right corner, min 44×44px tap target via padding) ── */}
      <div className="absolute top-4 right-4 z-30">
        <CardThemeToggle />
      </div>

      {/* ── Subtle SVG Paper Grain / Noise Texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 dark:opacity-[0.045] light:opacity-[0.02] mix-blend-screen select-none"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="paperGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#paperGrain)" />
        </svg>
      </div>

      {/* ── Physical Visiting Card: chamfered top-right corner ── */}
      <div
        className="
          relative z-10 w-full max-w-[390px]
          rounded-2xl rounded-tr-none
          border
          px-6 py-7 sm:px-7 sm:py-8
          space-y-6 my-6
          transition-colors duration-200
          overflow-hidden
          dark:bg-[#0D0D11] light:bg-[#FAFAF8]
        "
        style={getBorderAccentStyle(profile.borderAccent, isDark)}
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

        {/* 1. Hero */}
        <div className="card-anim-item opacity-0">
          <CardHero profile={profile} />
        </div>

        {/* 2. Actions */}
        <div className="card-anim-item opacity-0">
          <CardActions profile={profile} />
        </div>

        {/* 3. Socials */}
        {profile.socials &&
          Object.values(profile.socials).some(Boolean) && (
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
