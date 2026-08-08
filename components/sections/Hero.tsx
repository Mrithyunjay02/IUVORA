"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

// ── Section 9.4 — Stat counter ─────────────────────────────────────────────
const STATS = [
  { target: 50,  suffix: "+", label: "Projects delivered" },
  { target: 4,   suffix: "",  label: "Service verticals"  },
  { target: 100, suffix: "%", label: "In-house team"       },
];

/**
 * rAF-based count-up — no external dependency.
 * Uses ease-out cubic so the number decelerates toward the target,
 * giving a natural "settling" feel (fast start, slow finish).
 */
function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTs: number | null = null;
    let rafId: number;

    const frame = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      // ease-out cubic: fast acceleration, slow settle
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, active]);

  return count;
}

/** Single animated stat — triggers count-up once when it enters the viewport */
function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Fires once when the stats block is ~20% inside the viewport
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const count = useCountUp(target, 1500, isInView);

  return (
    <div ref={ref}>
      <p
        className="text-4xl font-extrabold font-[var(--font-display)] leading-none mb-1"
        style={{ color: "var(--color-white)" }}
        aria-live="polite"
        aria-label={`${count}${suffix} ${label}`}
      >
        <span aria-hidden="true">
          {count}
          {suffix}
        </span>
      </p>
      <p className="text-sm" style={{ color: "var(--color-gray-mid)" }}>
        {label}
      </p>
    </div>
  );
}

export function Hero() {
  // Use state to detect reduced motion AFTER hydration to prevent SSR mismatch
  // Defaulting to false on server/initial render matches the eager-loaded HTML
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    console.log("[Hero Video] prefers-reduced-motion evaluated as:", mediaQuery.matches);
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      console.log("[Hero Video] prefers-reduced-motion changed to:", e.matches);
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <SectionWrapper theme="dark" id="hero" noPad>
      {/* Min-height covers viewport; pt accounts for sticky header */}
      <div
        className="relative flex flex-col lg:flex-row lg:items-center justify-center min-h-screen container-grid gap-16 lg:gap-20"
        style={{ paddingTop: "8rem", paddingBottom: "6rem" }}
      >

        {/* Background grid pattern — geometric, BW aesthetic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px)",
          }}
        />

        {/* Accent glow blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: "20%",
            right: "10%",
            width: "clamp(300px, 40vw, 600px)",
            height: "clamp(300px, 40vw, 600px)",
            background: "radial-gradient(circle, rgba(47,123,255,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 flex-1 max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            className="eyebrow mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Digital Studio
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="hero-headline mb-8"
            style={{ color: "var(--color-white)" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            We build things
            <br />
            <span style={{ color: "var(--color-accent)" }}>that perform.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="text-lg md:text-xl mb-10 leading-relaxed"
            style={{ color: "var(--color-gray-mid)", maxWidth: "52ch" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Iuvora delivers web development, app development, digital marketing,
            and IT services — everything you need to launch and grow online.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Button href="/contact" size="lg" id="hero-cta-primary">
              Start a Project →
            </Button>
            <Button href="/about" size="lg" variant="outline" id="hero-cta-secondary">
              Learn about us
            </Button>
          </motion.div>

          {/* Stats strip — 9.4: numbers count up from 0 when visible */}
          <motion.div
            className="flex flex-wrap gap-10 mt-20"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </motion.div>
        </div>

        {/* Right Column: Video Box */}
        <motion.div
          className="w-full lg:w-[45%] relative z-10 shrink-0 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          style={{ 
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            aspectRatio: "4/5",
            maxHeight: "75vh"
          }}
        >
          <video
            ref={(el) => {
              if (el) {
                // Explicitly enforce muted state to bypass strict browser autoplay policies
                el.defaultMuted = true;
                el.muted = true;
              }
            }}
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-poster.webp"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-explainer.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div
            className="w-[1px] h-10"
            style={{ background: "linear-gradient(to bottom, transparent, var(--color-gray-mid))" }}
          />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--color-gray-mid)" }}>
            scroll
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
