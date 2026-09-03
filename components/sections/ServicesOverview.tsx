"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SERVICES } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Section 9.3 — Geometric hover-reveal visuals ──────────────────────────────
const GEOMETRIC_VISUALS: Record<string, React.ReactNode> = {
  "web-development": (
    <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="96" height="66" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="2" y1="16" x2="98" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="19" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="27" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
      <line x1="12" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="36" x2="72" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="20" y1="44" x2="56" y2="44" stroke="currentColor" strokeWidth="1.8" />
      <line x1="20" y1="52" x2="84" y2="52" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="12" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  "app-development": (
    <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="52" height="92" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="22" y1="10" x2="38" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <rect x="12" y="20" width="36" height="56" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="16" y="26" width="12" height="12" rx="2" fill="currentColor" opacity="0.25" />
      <rect x="32" y="26" width="12" height="12" rx="2" fill="currentColor" opacity="0.25" />
      <rect x="16" y="42" width="12" height="12" rx="2" fill="currentColor" opacity="0.25" />
      <rect x="32" y="42" width="12" height="12" rx="2" fill="currentColor" opacity="0.25" />
      <line x1="16" y1="62" x2="44" y2="62" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="20" y1="68" x2="40" y2="68" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="86" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
  "digital-marketing": (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="38" cy="44" r="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
      <circle cx="38" cy="44" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
      <circle cx="38" cy="44" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="38" cy="44" r="3" fill="currentColor" />
      <polyline points="62,70 72,52 82,60 96,28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="90,28 96,28 96,34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="72" x2="96" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  "it-services": (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="18" y="4" width="64" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <rect x="18" y="24" width="64" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
      <rect x="18" y="44" width="64" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
      <circle cx="26" cy="11" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="26" cy="31" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="26" cy="51" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="18" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="82" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="58" x2="18" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="50" y1="58" x2="50" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="50" y1="58" x2="82" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
};

// ── ServiceCard ───────────────────────────────────────────────────────────────
function ServiceCard({
  title,
  tagline,
  description,
  icon,
  slug,
}: {
  title: string;
  tagline: string;
  description: string;
  icon: string;
  slug: string;
}) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="h-full service-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/services/${slug}`}
        className="group block h-full no-underline"
        aria-label={`${title} — learn more`}
        id={`service-card-${slug}`}
      >
        <div
          className="card-border rounded-sm h-full p-8 relative overflow-hidden"
          style={{
            backgroundColor: "color-mix(in srgb, var(--fg) 4%, transparent)",
            transform: hovered ? "translateY(-4px)" : "translateY(0px)",
            transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            className="absolute bottom-0 right-0 pointer-events-none"
            aria-hidden="true"
            style={{ 
              width: 130, 
              height: 100,
              opacity: hovered ? 1 : 0,
              transition: "opacity 400ms ease-out"
            }}
          >
            <div style={{ color: "var(--fg)", opacity: 0.18, width: "100%", height: "100%" }}>
              {GEOMETRIC_VISUALS[slug]}
            </div>
          </div>

          <span
            className="block text-3xl mb-6"
            style={{ color: "var(--color-accent)" }}
            aria-hidden="true"
          >
            {icon}
          </span>

          <p className="eyebrow mb-3">{tagline}</p>

          <h3
            className="text-2xl font-bold mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-200"
            style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
            {description}
          </p>

          <span
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            Explore service
            <span
              aria-hidden="true"
              style={{
                transform: hovered ? "translateX(4px)" : "translateX(0px)",
                transition: "transform 200ms ease-out"
              }}
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

// ── ServicesOverview section ──────────────────────────────────────────────────
export function ServicesOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper theme="light" id="services">
      <div className="container-grid" ref={containerRef}>
        <div className="max-w-2xl mb-16">
          <p className=" eyebrow mb-4">
            What we do
          </p>
          <h2
            className=" section-headline mb-5"
            style={{ color: "var(--fg)" }}
          >
            Every service your
            <br />
            business needs.
          </h2>
          <p
            className=" text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            From your first website to a full-scale growth engine — we cover the
            complete stack so you never need to coordinate between three different
            agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} {...s} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
