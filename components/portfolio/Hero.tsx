"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Layers, Globe } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45 }
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.1
        )
        .fromTo(
          metaRef.current?.children ? Array.from(metaRef.current.children) : metaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
          0.3
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 },
          0.4
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-grid-pattern hero-radial-glow"
    >
      {/* Main Content */}
      <div className="portfolio-container relative z-10 my-auto flex flex-col items-start w-full">
        <div className="w-full max-w-4xl">
          {/* Eyebrow matching main site standard */}
          <p className="eyebrow mb-6">
            Selected Works &amp; Portfolio
          </p>

          {/* Hero Title - Identical typography, tracking, line-height to main site .hero-headline */}
          <h1
            ref={titleRef}
            className="hero-headline mb-8"
            style={{ color: "var(--fg)" }}
          >
            <span className="block font-semibold" style={{ color: "var(--fg-muted)" }}>
              Crafted for scale.
            </span>
            <span className="block font-extrabold" style={{ color: "var(--fg)" }}>
              Built for impact.
            </span>
          </h1>

          {/* Description matching main site text hierarchy */}
          <p
            ref={descRef}
            className="text-lg md:text-xl mb-10 leading-relaxed font-normal"
            style={{ color: "var(--fg-muted)", maxWidth: "52ch" }}
          >
            An editorial showcase of 5 production web platforms, technical case studies, and commercial digital systems engineered with craft and performance.
          </p>

          {/* Quick Scope Specs */}
          <div
            ref={metaRef}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t w-full max-w-2xl text-xs"
            style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              <div>
                <div className="font-semibold" style={{ color: "var(--fg)" }}>5 Production Builds</div>
                <div className="text-[11px]" style={{ color: "var(--fg-muted)" }}>Commercial &amp; Institutional</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              <div>
                <div className="font-semibold" style={{ color: "var(--fg)" }}>100% Live Deployments</div>
                <div className="text-[11px]" style={{ color: "var(--fg-muted)" }}>Deployed Globally</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <div className="font-semibold" style={{ color: "var(--fg)" }}>Verified Clients</div>
                <div className="text-[11px]" style={{ color: "var(--fg-muted)" }}>Active Production Systems</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue with Semantic Anchor Navigation */}
      <div
        ref={scrollCueRef}
        className="portfolio-container relative z-10 flex flex-wrap gap-4 justify-between items-center pt-8 border-t border-black/5 dark:border-white/5"
      >
        <div className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          [ 01 / 05 Selected Works ]
        </div>

        <a
          href="#gallery"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          aria-label="Scroll to selected works showcase"
        >
          <span>Explore Works</span>
          <div className="w-7 h-7 rounded-full border border-black/15 dark:border-white/15 group-hover:border-[#3b82f6] dark:group-hover:border-[#60a5fa] group-hover:bg-[#3b82f6]/10 dark:group-hover:bg-[#60a5fa]/10 flex items-center justify-center transition-all duration-300">
            <ArrowDown className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-[#3b82f6] dark:group-hover:text-[#60a5fa] group-hover:translate-y-0.5 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
}

