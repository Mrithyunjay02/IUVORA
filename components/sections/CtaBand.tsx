"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CtaBand() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.fromTo(
          ".cta-anim-item",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
        
        tl.fromTo(
          ".cta-badges-anim",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="dark" id="cta-band">
      <div className="container-grid relative" ref={containerRef}>
        {/* Background accent blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            style={{
              width: "60%",
              height: "200%",
              background:
                "radial-gradient(ellipse, rgba(47,123,255,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <p className="cta-anim-item eyebrow mb-6 text-center w-full">
            Ready to build?
          </p>

          <h2
            className="cta-anim-item section-headline mb-6 text-center w-full"
            style={{ color: "var(--fg)" }}
          >
            Let&apos;s turn your idea
            <br />
            into something real.
          </h2>

          <p
            className="cta-anim-item text-lg leading-relaxed mb-10 text-center mx-auto"
            style={{ color: "var(--fg-muted)", maxWidth: "45ch" }}
          >
            Tell us about your project. We&apos;ll respond within one business
            day with a clear next step — no sales runaround.
          </p>

          <div className="cta-anim-item flex flex-wrap gap-4 justify-center">
            <Button href="/contact" size="lg" id="cta-band-primary">
              Start a Project{" "}
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
            <Button href="mailto:info@iuvora.com" size="lg" variant="outline" id="cta-band-email">
              Email us directly
            </Button>
          </div>

          {/* Trust badge strip */}
          <div
            className="cta-badges-anim flex flex-wrap gap-8 justify-center mt-16 pt-8 border-t"
            style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
          >
            {[
              "Response within 24h",
              "No lock-in contracts",
              "Fixed-price projects available",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span style={{ color: "var(--color-accent)" }}>✓</span>
                <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
