"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";
import { PROCESS_STEPS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // Animate connector line - reveal from top with gradient effect
        tl.fromTo(
          ".process-connector-line",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          0
        );

        // Animate step nodes - scale pulse + fade in
        const stepRows = containerRef.current?.querySelectorAll(".process-step-row");
        if (stepRows) {
          tl.fromTo(
            stepRows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.15 },
            0.2
          );

          // Node pulse animation on each step
          stepRows.forEach((row) => {
            const nodeDiv = row.querySelector(".process-node");
            if (nodeDiv) {
              tl.fromTo(
                nodeDiv,
                { scale: 0.8 },
                { scale: 1, duration: 0.4, ease: "back.out" },
                0.2
              );
            }
          });
        }
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="dark" id="process">
      <div className="container-grid" ref={containerRef}>
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className=" eyebrow mb-4">
            How we work
          </p>
          <h2
            className=" section-headline mb-5"
            style={{ color: "var(--fg)" }}
          >
            A process built for
            <br />
            real outcomes.
          </h2>
          <p
            className=" text-base leading-relaxed mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            No black boxes. Every phase is visible, trackable, and designed so
            you can make informed decisions throughout.
          </p>
          <div className="w-12">
            <AccentLine trigger="scroll" />
          </div>
        </div>

        {/* Steps */}
        <div className="s-container relative">
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="process-connector-line hidden lg:block absolute top-0 bottom-0"
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
                className="process-step-row flex gap-8 lg:gap-12"
              >
                {/* Step number - acts as a node on the connector line */}
                <div className="flex-none flex flex-col items-center">
                  <div
                    className="process-node relative z-10 w-10 h-10 flex items-center justify-center rounded-sm border text-xs font-bold font-[var(--font-display)] shrink-0"
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
