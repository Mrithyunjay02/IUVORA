"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";
import { WHY_IUVORA } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyIuvora() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        // Animate accent line reveal
        gsap.fromTo(
          ".why-accent-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.out" }
        );

        // Animate list items cascade
        const items = containerRef.current?.querySelectorAll(".why-list-container > div");
        if (items) {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.15,
          });
        }
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="dark" id="why-iuvora">
      <div className="container-grid" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - sticky headline */}
          <div className="lg:sticky lg:top-32">
            <p className=" eyebrow mb-4">
              Why Iuvora
            </p>
            <h2
              className=" section-headline mb-6"
              style={{ color: "var(--fg)" }}
            >
              The difference
              <br />
              is in the details.
            </h2>
            <p
              className=" text-base leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              We obsess over the things most agencies skip - performance,
              accessibility, long-term maintainability, and honest reporting.
            </p>

            {/* Decorative accent line */}
            <div className="mt-10 w-16">
              <AccentLine className="why-accent-line" trigger="scroll" />
            </div>
          </div>

          {/* Right - differentiator cards */}
          <div className="why-list-container flex flex-col gap-0">
            {WHY_IUVORA.map((item, i) => (
              <div
                key={item.title}
                className=" flex gap-6 py-8 border-b"
                style={{
                  borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
                  opacity: 0,
                  transform: "translateY(20px)",
                }}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
