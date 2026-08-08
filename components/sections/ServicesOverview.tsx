"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SERVICES } from "@/lib/constants";

// ── Section 9.3 — Geometric hover-reveal visuals ──────────────────────────────
//
// Each SVG is abstract/geometric (never representational) and uses `currentColor`
// so it adapts to the current --fg value automatically. Shown as a low-opacity
// watermark in the bottom-right of each card on desktop pointer-device hover only.
// Framer Motion's onHoverStart/onHoverEnd naturally don't fire on touch devices.
//
// Opacity at reveal: 0.18 — clearly visible but unambiguously a supporting detail,
// not the primary way to understand the service (brief Section 9.3 requirement).

const GEOMETRIC_VISUALS: Record<string, React.ReactNode> = {
  "web-development": (
    // Browser window wireframe with indented code-line pattern
    <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="96" height="66" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="2" y1="16" x2="98" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="19" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="27" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
      {/* Code lines at 3 indentation depths */}
      <line x1="12" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="36" x2="72" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="20" y1="44" x2="56" y2="44" stroke="currentColor" strokeWidth="1.8" />
      <line x1="20" y1="52" x2="84" y2="52" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="12" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),

  "app-development": (
    // Phone wireframe with app-icon grid inside
    <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="52" height="92" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="22" y1="10" x2="38" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <rect x="12" y="20" width="36" height="56" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* 2×2 app icon grid */}
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
    // Concentric target rings + rising graph arrow
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="38" cy="44" r="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
      <circle cx="38" cy="44" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
      <circle cx="38" cy="44" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="38" cy="44" r="3" fill="currentColor" />
      {/* Growth arrow */}
      <polyline points="62,70 72,52 82,60 96,28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="90,28 96,28 96,34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="72" x2="96" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  ),

  "it-services": (
    // Server rack stack + triangular network topology below
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="18" y="4" width="64" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <rect x="18" y="24" width="64" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
      <rect x="18" y="44" width="64" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
      <circle cx="26" cy="11" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="26" cy="31" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="26" cy="51" r="2.5" fill="currentColor" opacity="0.4" />
      {/* Network nodes */}
      <circle cx="18" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="82" cy="74" r="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="58" x2="18" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="50" y1="58" x2="50" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="50" y1="58" x2="82" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
};

// ── Section 9.1 — staggerChildren variants ────────────────────────────────────
//
// Parent variant drives the stagger; children variants animate independently.
// delayChildren: 0.3 gives a ~300ms buffer after the section enters the viewport,
// ensuring the background invert wipe has started visibly moving before any card
// content appears (prevents the "everything fires at once" chaos described in 9.6).

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
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
  // Hover state — Framer Motion's onHoverStart/onHoverEnd only fire for
  // pointer devices; touch devices never see the geometric visual.
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
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
            // Lift on hover — subtle y-transform instead of translate-y class
            // so it can be controlled via JS state alongside the hover visual
            transform: hovered ? "translateY(-4px)" : "translateY(0px)",
            transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ── 9.3 Geometric hover visual ───────────────────────────────────
           *  Positioned bottom-right, sized to fill that quadrant of the card.
           *  Uses currentColor so it inherits --fg and adapts to theme inversion.
           *  Opacity kept at 0.18 — clearly visible but unambiguously decorative.
           */}
          <motion.div
            className="absolute bottom-0 right-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-hidden="true"
            style={{ width: 130, height: 100 }}
          >
            <div style={{ color: "var(--fg)", opacity: 0.18, width: "100%", height: "100%" }}>
              {GEOMETRIC_VISUALS[slug]}
            </div>
          </motion.div>

          {/* Icon */}
          <span
            className="block text-3xl mb-6"
            style={{ color: "var(--color-accent)" }}
            aria-hidden="true"
          >
            {icon}
          </span>

          {/* Eyebrow tagline */}
          <p className="eyebrow mb-3">{tagline}</p>

          {/* Title */}
          <h3
            className="text-2xl font-bold mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-200"
            style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
            {description}
          </p>

          {/* Arrow — shifts right on hover via motion */}
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            Explore service
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ── ServicesOverview section ──────────────────────────────────────────────────

export function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper theme="light" id="services">
      <div className="container-grid">
        {/* Section header */}
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What we do
          </motion.p>
          <motion.h2
            className="section-headline mb-5"
            style={{ color: "var(--fg)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Every service your
            <br />
            business needs.
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From your first website to a full-scale growth engine — we cover the
            complete stack so you never need to coordinate between three different
            agencies.
          </motion.p>
        </div>

        {/* ── 9.1 staggerChildren card grid ──────────────────────────────────
         *  Parent variant drives the stagger; each card animates from its own
         *  hidden→visible variant. delayChildren: 0.3 ensures the invert wipe
         *  has begun moving before any card appears in view.
         */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map((s) => (
            <motion.div key={s.slug} variants={cardVariants}>
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
