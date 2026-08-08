"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper theme="dark" id="process">
      <div className="container-grid">
        {/* Header */}
        <div ref={ref} className="max-w-2xl mb-20">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            How we work
          </motion.p>
          <motion.h2
            className="section-headline mb-5"
            style={{ color: "var(--fg)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A process built for
            <br />
            real outcomes.
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No black boxes. Every phase is visible, trackable, and designed so
            you can make informed decisions throughout.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
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
              <motion.div
                key={step.number}
                className="flex gap-8 lg:gap-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1],
                  delay: i * 0.08,
                }}
                viewport={{ once: true, margin: "-60px" }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
