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
      className="relative py-24 lg:py-32 bg-white dark:bg-[#0c0d12] border-t border-black/5 dark:border-white/5 transition-colors duration-200"
    >
      <div className="portfolio-container">
        {/* Intro Narrative */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.08]">
            Built for real operations. <br />
            <span className="text-zinc-500 dark:text-zinc-400">Engineered to perform.</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-light">
            A transparent look at delivered builds, active client platforms, and industry disciplines backed by genuine production code.
          </p>
        </div>

        {/* Metrics - Editorial Layout (No Borders/Boxes) */}
        <div className="space-y-12">
          {/* Divider Line */}
          <div className="border-t border-black/10 dark:border-white/10" />

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4 sm:px-0">
            {/* Metric 1: Total Builds */}
            <div className="text-center space-y-2">
              <span
                data-counter-target={totalBuilds}
                className="block text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
              >
                0{totalBuilds}
              </span>
              <div className="text-xs tracking-wider text-[#3b82f6] dark:text-[#60a5fa] uppercase font-semibold">
                Selected Builds
              </div>
            </div>

            {/* Metric 2: Live Deployments */}
            <div className="text-center space-y-2">
              <span
                data-counter-target={liveDeployments}
                className="block text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
              >
                0{liveDeployments}
              </span>
              <div className="text-xs tracking-wider text-[#3b82f6] dark:text-[#60a5fa] uppercase font-semibold">
                Live Platforms
              </div>
            </div>

            {/* Metric 3: Production Delivery */}
            <div className="text-center space-y-2">
              <span
                className="block text-5xl sm:text-6xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400"
              >
                100%
              </span>
              <div className="text-xs tracking-wider text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                Production Deployed
              </div>
            </div>

            {/* Metric 4: Industry Sectors */}
            <div className="text-center space-y-2">
              <span
                data-counter-target={industrySectorsCount}
                className="block text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
              >
                0{industrySectorsCount}
              </span>
              <div className="text-xs tracking-wider text-[#3b82f6] dark:text-[#60a5fa] uppercase font-semibold">
                Industry Sectors
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-black/10 dark:border-white/10" />
        </div>
      </div>
    </section>
  );
}
