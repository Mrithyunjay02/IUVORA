"use client";

import React from "react";
import { CheckCircle2, Cpu } from "lucide-react";

interface Phase {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const PHASES: Phase[] = [
  {
    step: "01",
    title: "Technical Architecture",
    subtitle: "Discovery & Structural Planning",
    description:
      "Deep analysis of operational requirements, domain constraints, and user touchpoints. Establishing strict performance budgets, routing architecture, and data contracts before code is written.",
    deliverables: ["Scope Definition", "Information Architecture", "Core Performance Targets"],
  },
  {
    step: "02",
    title: "Type-Safe Engineering",
    subtitle: "Implementation & Accessibility",
    description:
      "Modern full-stack development adhering to strict TypeScript types, responsive modular design systems, and WCAG accessibility standards. Zero artificial delays or cosmetic bloat.",
    deliverables: ["Type-Safe Codebase", "Mobile-First Responsiveness", "Accessible Interaction"],
  },
  {
    step: "03",
    title: "Production Deployment",
    subtitle: "Verification & Global Release",
    description:
      "Release to edge infrastructure with continuous build validation, Lighthouse auditing, automated security headers, and direct client handover for ongoing business operations.",
    deliverables: ["100% Live Deployments", "Core Web Vitals Pass", "Zero Breaking Changes"],
  },
];

export default function MinimalDeliveryProcess() {
  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#f8f9fc] dark:bg-[#0c0d12] border-t border-black/5 dark:border-white/5 transition-colors duration-200 scroll-mt-20"
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-[#3b82f6] dark:text-[#60a5fa] mb-4 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Delivery Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Disciplined Execution
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Predictable, milestone-driven engineering ensuring strict technical rigor, performance benchmarks, and verified production delivery.
          </p>
        </div>

        {/* Editorial Sequence Stack / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PHASES.map((phase) => (
            <div
              key={phase.step}
              className="relative rounded-2xl bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#3b82f6]/40 dark:hover:border-[#60a5fa]/40 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-300 dark:text-zinc-700">
                    {phase.step}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3b82f6] dark:text-[#60a5fa] px-3 py-1 rounded-md bg-[#3b82f6]/10 dark:bg-[#60a5fa]/10">
                    {phase.subtitle}
                  </span>
                </div>

                {/* Phase Title */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-6">
                  {phase.description}
                </p>
              </div>

              {/* Deliverable Checkmarks */}
              <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                {phase.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
