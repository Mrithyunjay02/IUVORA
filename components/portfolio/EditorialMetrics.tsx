"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EditorialMetrics() {
  const metricsRef = useRef<HTMLDivElement>(null);

  // Calculate metrics from project data
  const totalBuilds = PROJECTS.length;
  const liveDeployments = PROJECTS.filter((p) => !p.isPrototype && p.liveUrl).length;
  const industrySectorsCount = new Set(
    PROJECTS.map((p) => p.industry || p.category)
  ).size;

  // GSAP counter animations
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>("[data-counter-target]");

      counters.forEach((counter) => {
        const targetVal = parseInt(counter.getAttribute("data-counter-target") || "0", 10);
        const obj = { val: 0 };
        counter.textContent = "00";

        gsap.to(obj, {
          val: targetVal,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            const current = Math.round(obj.val);
            counter.textContent = current < 10 ? `0${current}` : `${current}`;
          },
        });
      });
    }, metricsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={metricsRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-[var(--bg)] border-t transition-colors duration-200"
      style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
    >
      <div className="portfolio-container">
        {/* Intro Narrative */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="eyebrow mb-3">
            Verified Impact
          </p>
          <h2
            className="section-headline mb-4"
            style={{ color: "var(--fg)" }}
          >
            Built for real operations. <br />
            <span style={{ color: "var(--fg-muted)" }}>Engineered to perform.</span>
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--fg-muted)" }}
          >
            A transparent look at delivered builds, active client platforms, and industry disciplines backed by genuine production code.
          </p>
        </div>

        {/* Metrics - Editorial Layout (No Borders/Boxes) */}
        <div className="space-y-12">
          {/* Divider Line */}
          <div className="w-full h-px" style={{ backgroundColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }} />

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 px-4 sm:px-0">
            {/* Metric 1: Total Builds */}
            <div className="text-center space-y-2">
              <span
                data-counter-target={totalBuilds}
                className="block text-5xl sm:text-6xl font-extrabold tracking-[-0.04em]"
                style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
              >
                0{totalBuilds}
              </span>
              <div className="eyebrow text-[11px]" style={{ color: "var(--color-accent)" }}>
                Selected Builds
              </div>
            </div>

            {/* Metric 2: Live Deployments */}
            <div className="text-center space-y-2">
              <span
                data-counter-target={liveDeployments}
                className="block text-5xl sm:text-6xl font-extrabold tracking-[-0.04em]"
                style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
              >
                0{liveDeployments}
              </span>
              <div className="eyebrow text-[11px]" style={{ color: "var(--color-accent)" }}>
                Live Platforms
              </div>
            </div>

            {/* Metric 3: Production Delivery */}
            <div className="text-center space-y-2">
              <span
                className="block text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-emerald-500"
                style={{ fontFamily: "var(--font-display)" }}
              >
                100%
              </span>
              <div className="eyebrow text-[11px] text-emerald-500">
                Production Deployed
              </div>
            </div>

            {/* Metric 4: Industry Sectors */}
            <div className="text-center space-y-2">
              <span
                data-counter-target={industrySectorsCount}
                className="block text-5xl sm:text-6xl font-extrabold tracking-[-0.04em]"
                style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
              >
                0{industrySectorsCount}
              </span>
              <div className="eyebrow text-[11px]" style={{ color: "var(--color-accent)" }}>
                Industry Sectors
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px" style={{ backgroundColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }} />
        </div>
      </div>
    </section>
  );
}
