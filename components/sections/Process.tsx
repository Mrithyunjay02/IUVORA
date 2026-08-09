"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PROCESS_STEPS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".process-header-anim",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
      },
    });

    // Steps stagger reveal
    ScrollTrigger.create({
      trigger: ".process-steps-container",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".process-step",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }
        );
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="dark" id="process">
      <div className="container-grid" ref={containerRef}>
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="process-header-anim eyebrow mb-4">
            How we work
          </p>
          <h2
            className="process-header-anim section-headline mb-5"
            style={{ color: "var(--fg)" }}
          >
            A process built for
            <br />
            real outcomes.
          </h2>
          <p
            className="process-header-anim text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            No black boxes. Every phase is visible, trackable, and designed so
            you can make informed decisions throughout.
          </p>
        </div>

        {/* Steps */}
        <div className="process-steps-container relative">
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-0 bottom-0"
            style={{
              left: "calc(2.5rem)",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent), var(--color-accent), transparent)",
              opacity: 0.25,
            }}
          />

          <div className="flex flex-col gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.number}
                className="process-step flex gap-8 lg:gap-12 opacity-0"
              >
                {/* Step number — acts as a node on the connector line */}
                <div className="flex-none flex flex-col items-center">
                  <div
                    className="relative z-10 w-10 h-10 flex items-center justify-center rounded-sm border text-xs font-bold font-[var(--font-display)] shrink-0"
                    style={{
                      borderColor: "var(--color-accent)",
                      color: "var(--color-accent)",
                      backgroundColor: "var(--bg)",
                    }}
                  >
                    {step.number}
                  </div>
                  {/* Vertical spacer line between nodes */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div
                      className="w-[1px] flex-1 mt-0"
                      style={{
                        minHeight: "3rem",
                        backgroundColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-12 last:pb-0">
                  <h3
                    className="text-xl font-bold mb-2 leading-tight"
                    style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--fg-muted)", maxWidth: "55ch" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
