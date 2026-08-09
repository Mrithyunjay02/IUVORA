"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { WHY_IUVORA } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyIuvora() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".why-header-anim",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
        
        gsap.fromTo(
          ".why-accent-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.out", delay: 0.4 }
        );
      },
    });

    // List items reveal
    ScrollTrigger.create({
      trigger: ".why-list-container",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".why-list-item",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }
        );
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="dark" id="why-iuvora">
      <div className="container-grid" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — sticky headline */}
          <div className="lg:sticky lg:top-32">
            <p className="why-header-anim eyebrow mb-4">
              Why Iuvora
            </p>
            <h2
              className="why-header-anim section-headline mb-6"
              style={{ color: "var(--fg)" }}
            >
              The difference
              <br />
              is in the details.
            </h2>
            <p
              className="why-header-anim text-base leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              We obsess over the things most agencies skip — performance,
              accessibility, long-term maintainability, and honest reporting.
            </p>

            {/* Decorative accent line */}
            <div
              className="why-accent-line mt-10 h-[2px] w-16"
              style={{ backgroundColor: "var(--color-accent)", transformOrigin: "left" }}
            />
          </div>

          {/* Right — differentiator cards */}
          <div className="why-list-container flex flex-col gap-0">
            {WHY_IUVORA.map((item, i) => (
              <div
                key={item.title}
                className="why-list-item flex gap-6 py-8 border-b opacity-0"
                style={{
                  borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
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
