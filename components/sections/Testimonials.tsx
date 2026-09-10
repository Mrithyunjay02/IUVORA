"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";
import { GeometricAccent } from "@/components/ui/GeometricAccent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "We needed a website that could actually represent our export business properly, and Iuvora delivered exactly that. Quick turnaround, easy to work with, and they got the details right.",
    name: "Kandiga Akshay Kumar",
    title: "Founder, Daynit Enterprises",
    initial: "KA",
  },
  {
    id: 2,
    quote:
      "Iuvora understood the premium feel we wanted for our brand right away. Communication was smooth throughout, and the final site turned out better than we expected.",
    name: "Rashid Ahmed",
    title: "Founder, Shams Al Kanari",
    initial: "RA",
  },
  {
    id: 3,
    quote:
      "Clean, professional execution from architectural layout to buyer inquiry pipeline. The site genuinely fits our property development brand.",
    name: "Leadership Team",
    title: "MH Developers",
    initial: "MH",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      once: true,
      onEnter: () => {
        const cards = containerRef.current?.querySelectorAll(".testimonials-grid > div");
        if (!cards) return;

        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.12 }
        );

        // Animate geometric accents
        const accents = containerRef.current?.querySelectorAll(".testimonial-accent");
        if (accents) {
          gsap.to(accents, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            delay: 0.1,
          });
        }
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="dark" id="testimonials">
      <div className="container-grid" ref={containerRef}>
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className=" eyebrow mb-4">
            What clients say
          </p>
          <h2
            className=" section-headline mb-4"
            style={{ color: "var(--fg)" }}
          >
            Trusted by founders
            <br />
            and operators.
          </h2>
          <div className="w-12">
            <AccentLine trigger="scroll" />
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="card-border rounded-sm p-8 flex flex-col gap-6 relative overflow-hidden"
              style={{
                backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)",
              }}
              id={`testimonial-${t.id}`}
              aria-label={`Testimonial from ${t.name || t.title}`}
            >
              {/* Geometric accent corner */}
              <div
                className="absolute top-4 right-4 pointer-events-none opacity-0 testimonial-accent"
                style={{ width: 80, height: 80 }}
              >
                <GeometricAccent
                  shape="circle"
                  size={80}
                  opacity={0.12}
                  trigger="scroll"
                />
              </div>
              {/* Quote mark */}
              <span
                className="text-5xl font-black leading-none font-[var(--font-display)]"
                style={{ color: "var(--color-accent)" }}
                aria-hidden="true"
              >
                &ldquo;
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
                {/* Avatar Initials */}
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
                  {t.name ? (
                    <>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--fg)" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                        {t.title}
                      </p>
                    </>
                  ) : (
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--fg)" }}
                    >
                      {t.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
