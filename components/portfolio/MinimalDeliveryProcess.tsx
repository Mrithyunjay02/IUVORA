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
      className="relative py-20 sm:py-28 lg:py-36 bg-[var(--bg)] border-t transition-colors duration-200 scroll-mt-20"
      style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="eyebrow mb-4 inline-flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Delivery Discipline</span>
          </div>
          <h2
            className="section-headline mb-4"
            style={{ color: "var(--fg)" }}
          >
            Disciplined Execution
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: "var(--fg-muted)" }}
          >
            Predictable, milestone-driven engineering ensuring strict technical rigor, performance benchmarks, and verified production delivery.
          </p>
        </div>

        {/* Editorial Sequence Stack / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PHASES.map((phase) => (
            <div
              key={phase.step}
              className="card-border relative rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--color-accent)]/50 transition-all duration-300"
            >
              <div>
                {/* Step Marker */}
                <div
                  className="flex items-center justify-between mb-6 pb-4 border-b"
                  style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
                >
                  <span
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                    style={{ color: "var(--fg-muted)", opacity: 0.5, fontFamily: "var(--font-display)" }}
                  >
                    {phase.step}
                  </span>
                  <span className="eyebrow text-[11px] px-2.5 py-1 rounded-md bg-[#3b82f6]/10 dark:bg-[#60a5fa]/10 text-[var(--color-accent)]">
                    {phase.subtitle}
                  </span>
                </div>

                {/* Phase Title */}
                <h3
                  className="text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {phase.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {phase.description}
                </p>
              </div>

              {/* Deliverable Checkmarks */}
              <div
                className="pt-4 border-t space-y-2"
                style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
              >
                {phase.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium"
                    style={{ color: "var(--fg)" }}
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
