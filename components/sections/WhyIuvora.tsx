"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { WHY_IUVORA } from "@/lib/constants";

export function WhyIuvora() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper theme="dark" id="why-iuvora">
      <div className="container-grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — sticky headline */}
          <div ref={ref} className="lg:sticky lg:top-32">
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Why Iuvora
            </motion.p>
            <motion.h2
              className="section-headline mb-6"
              style={{ color: "var(--fg)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The difference
              <br />
              is in the details.
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We obsess over the things most agencies skip — performance,
              accessibility, long-term maintainability, and honest reporting.
            </motion.p>

            {/* Decorative accent line */}
            <motion.div
              className="mt-10 h-[2px] w-16"
              style={{ backgroundColor: "var(--color-accent)" }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </div>

          {/* Right — differentiator cards */}
          <div className="flex flex-col gap-0">
            {WHY_IUVORA.map((item, i) => (
              <motion.div
                key={item.title}
                className="flex gap-6 py-8 border-b"
                style={{
                  borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
                }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.65, 0, 0.35, 1],
                  delay: i * 0.08,
                }}
                viewport={{ once: true, margin: "-60px" }}
              >
                {/* Accent number */}
                <span
                  className="text-sm font-bold font-[var(--font-display)] shrink-0 mt-1"
                  style={{ color: "var(--color-accent)", minWidth: "2rem" }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className="text-xl font-bold mb-2 leading-tight"
                    style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {item.description}
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
