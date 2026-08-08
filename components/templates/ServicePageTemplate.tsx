"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import type { SERVICES } from "@/lib/constants";

type Service = (typeof SERVICES)[number];

interface ServicePageTemplateProps {
  service: Service;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <>
      <ScrollThemeProvider />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="service-hero" noPad>
        <div
          className="relative flex flex-col justify-center min-h-[70vh] container-grid"
          style={{ paddingTop: "8rem", paddingBottom: "5rem" }}
        >
          {/* Grid bg */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px)",
            }}
          />
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              top: "10%",
              right: "15%",
              width: "clamp(200px, 30vw, 450px)",
              height: "clamp(200px, 30vw, 450px)",
              background: "radial-gradient(circle, rgba(47,123,255,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(50px)",
            }}
          />

          <div className="relative z-10 max-w-4xl">
            <motion.p
              className="eyebrow mb-5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {service.tagline}
            </motion.p>
            <motion.h1
              className="hero-headline mb-6"
              style={{ color: "var(--color-white)" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {service.title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl leading-relaxed mb-10"
              style={{ color: "var(--color-gray-mid)", maxWidth: "50ch" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {service.description}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Button href="/contact" size="lg" id={`${service.slug}-cta-primary`}>
                Start a Project →
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── What's included ─────────────────────────────────── */}
      <SectionWrapper theme="light" id="capabilities">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-4">What&apos;s included</p>
              <h2 className="section-headline mb-6" style={{ color: "var(--fg)" }}>
                Full-scope
                <br />
                delivery.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Every engagement is scoped to your specific needs, but here&apos;s
                everything we cover in this discipline.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 list-none m-0 p-0 mt-2">
              {service.capabilities.map((cap, i) => (
                <motion.li
                  key={cap}
                  className="flex gap-4 items-start py-4 border-b"
                  style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <span
                    className="shrink-0 mt-1 text-base"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-base" style={{ color: "var(--fg)" }}>
                    {cap}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Tools & Tech ─────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="tools">
        <div className="container-grid">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">Tools & technology</p>
            <h2 className="section-headline" style={{ color: "var(--fg)" }}>
              Best-in-class
              <br />
              stack.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {service.tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="px-5 py-3 rounded-sm text-sm font-semibold font-[var(--font-display)]"
                style={{
                  border: "1px solid color-mix(in srgb, var(--fg) 20%, transparent)",
                  color: "var(--fg)",
                  backgroundColor: "color-mix(in srgb, var(--fg) 5%, transparent)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                viewport={{ once: true }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <SectionWrapper theme="light" id="service-cta">
        <div className="container-grid text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Get started</p>
          <h2 className="section-headline mb-6" style={{ color: "var(--fg)" }}>
            Ready to work
            <br />
            together?
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--fg-muted)" }}>
            Tell us about your project and we&apos;ll come back with a clear
            proposal — scoped, costed, and ready to start.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" size="lg" id={`${service.slug}-cta-bottom`}>
              Start a Project →
            </Button>
            <Button href="/about" size="lg" variant="outline" id={`${service.slug}-about-link`}>
              About Iuvora
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
