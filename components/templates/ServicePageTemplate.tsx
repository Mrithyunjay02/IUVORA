"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import type { SERVICES } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Service = (typeof SERVICES)[number];

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Reveal
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      ".service-hero-anim",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08, delay: 0.2 } // Slight delay to ensure paint
    );

    // 2. Capabilities Reveal
    ScrollTrigger.create({
      trigger: ".service-capabilities-trigger",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".service-capability-item",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }
        );
      }
    });

    // 3. Tools & Tech Reveal
    ScrollTrigger.create({
      trigger: ".service-tools-trigger",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".service-tool-item",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)", stagger: 0.04 }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
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
            <p className="service-hero-anim eyebrow mb-5 opacity-0">
              {service.tagline}
            </p>
            <h1
              className="service-hero-anim hero-headline mb-6 opacity-0"
              style={{ color: "var(--color-white)" }}
            >
              {service.title}
            </h1>
            <p
              className="service-hero-anim text-lg md:text-xl leading-relaxed mb-10 opacity-0"
              style={{ color: "var(--color-gray-mid)", maxWidth: "50ch" }}
            >
              {service.description}
            </p>
            <div className="service-hero-anim flex flex-wrap gap-4 opacity-0">
              <Button href="/contact" size="lg" id={`${service.slug}-cta-primary`}>
                Start a Project →
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── What's included ─────────────────────────────────── */}
      <SectionWrapper theme="light" id="capabilities">
        <div className="service-capabilities-trigger container-grid">
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
                <li
                  key={cap}
                  className="service-capability-item flex gap-4 items-start py-4 border-b opacity-0"
                  style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Tools & Tech ─────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="tools">
        <div className="service-tools-trigger container-grid">
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
              <span
                key={tool}
                className="service-tool-item px-5 py-3 rounded-sm text-sm font-semibold font-[var(--font-display)] opacity-0"
                style={{
                  border: "1px solid color-mix(in srgb, var(--fg) 20%, transparent)",
                  color: "var(--fg)",
                  backgroundColor: "color-mix(in srgb, var(--fg) 5%, transparent)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <SectionWrapper theme="light" id="service-cta">
        <div className="container-grid">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <p className="eyebrow mb-4 text-center">Get started</p>
            <h2 className="section-headline mb-6 text-center w-full" style={{ color: "var(--fg)" }}>
              Ready to work
              <br />
              together?
            </h2>
            <p className="text-base leading-relaxed mb-10 text-center mx-auto" style={{ color: "var(--fg-muted)", maxWidth: "48ch" }}>
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
        </div>
      </SectionWrapper>
    </div>
  );
}
