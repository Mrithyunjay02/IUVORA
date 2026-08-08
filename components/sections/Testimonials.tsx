"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const PLACEHOLDER_TESTIMONIALS = [
  {
    id: 1,
    quote:
      "[PLACEHOLDER — Replace with a real client testimonial. Do not publish this placeholder text.]",
    name: "[PLACEHOLDER — Client Name]",
    title: "[PLACEHOLDER — Title, Company]",
    initial: "P",
  },
  {
    id: 2,
    quote:
      "[PLACEHOLDER — Replace with a real client testimonial. Do not publish this placeholder text.]",
    name: "[PLACEHOLDER — Client Name]",
    title: "[PLACEHOLDER — Title, Company]",
    initial: "P",
  },
  {
    id: 3,
    quote:
      "[PLACEHOLDER — Replace with a real client testimonial. Do not publish this placeholder text.]",
    name: "[PLACEHOLDER — Client Name]",
    title: "[PLACEHOLDER — Title, Company]",
    initial: "P",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper theme="light" id="testimonials">
      <div className="container-grid">
        {/* Header */}
        <div ref={ref} className="max-w-xl mb-16">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What clients say
          </motion.p>
          <motion.h2
            className="section-headline"
            style={{ color: "var(--fg)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trusted by founders
            <br />
            and operators.
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              className="card-border rounded-sm p-8 flex flex-col gap-6"
              style={{
                backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: i * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
              id={`testimonial-${t.id}`}
              aria-label={`Testimonial from ${t.name}`}
            >
              {/* Quote mark */}
              <span
                className="text-5xl font-black leading-none font-[var(--font-display)]"
                style={{ color: "var(--color-accent)" }}
                aria-hidden="true"
              >
                "
              </span>

              <blockquote>
                <p
                  className="text-base leading-relaxed italic"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {t.quote}
                </p>
              </blockquote>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t" style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}>
                {/* Avatar placeholder */}
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "white",
                  }}
                  aria-hidden="true"
                >
                  {t.initial}
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--fg)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs text-center" style={{ color: "var(--color-accent)" }}>
          ⚠ Testimonial placeholders — replace with real client quotes before publishing
        </p>
      </div>
    </SectionWrapper>
  );
}
