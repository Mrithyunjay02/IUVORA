"use client";

import React from "react";
import { Cpu, Code, Rocket } from "lucide-react";
import { ProcessSection } from "@/components/ui/how-we-do-it-process-overview";

export default function MinimalDeliveryProcess() {
  const processItems = [
    {
      icon: Cpu,
      title: "Technical Architecture",
      description: "Deep analysis of operational requirements and user touchpoints. Establishing strict performance budgets and routing architecture before code is written.",
    },
    {
      icon: Code,
      title: "Type-Safe Engineering",
      description: "Modern full-stack development adhering to strict TypeScript types, responsive modular design systems, and WCAG accessibility standards.",
    },
    {
      icon: Rocket,
      title: "Production Deployment",
      description: "Release to edge infrastructure with continuous build validation, Lighthouse auditing, automated security headers, and direct client handover.",
    },
  ];

  return (
    <div id="process" className="relative border-t transition-colors duration-200 scroll-mt-20" style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}>
      {/* We use a div wrapper to preserve the anchor and top border from the old design, but delegate the inner layout to ProcessSection */}
      <ProcessSection
        subtitle="Delivery Discipline"
        title="Disciplined Execution"
        description="Predictable, milestone-driven engineering ensuring strict technical rigor, performance benchmarks, and verified production delivery."
        buttonText="View Our Services"
        items={processItems}
      />
    </div>
  );
}
