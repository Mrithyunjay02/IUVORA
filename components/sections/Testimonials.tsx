"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";
import {
  AnimatedTestimonials,
  type Testimonial,
} from "@/components/ui/animated-testimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We needed a website that could actually represent our export business properly, and Iuvora delivered exactly that. Quick turnaround, easy to work with, and they got the details right.",
    name: "Kandiga Akshay Kumar",
    designation: "Founder, Daynit Enterprises",
    initials: "KA",
    accentColor: "blue",
    projectTag: "Daynit Enterprises · Export",
    location: "India",
  },
  {
    quote:
      "Iuvora understood the premium feel we wanted for our brand right away. Communication was smooth throughout, and the final site turned out better than we expected.",
    name: "Rashid Ahmed",
    designation: "Founder, Shams Al Kanari",
    initials: "RA",
    accentColor: "gold",
    projectTag: "Shams Al Kanari · Perfumes",
    location: "UAE / Dubai",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          if (!containerRef.current) return;
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionWrapper theme="dark" id="testimonials">
      <div className="container-grid" ref={containerRef}>
        {/* Header */}
        <div className="max-w-xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">What clients say</p>
          <h2 className="section-headline mb-4" style={{ color: "var(--fg)" }}>
            Trusted by founders
            <br />
            and operators.
          </h2>
          <div className="w-12">
            <AccentLine trigger="scroll" />
          </div>
        </div>

        {/* Animated Testimonial Carousel */}
        <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay={false} />
      </div>
    </SectionWrapper>
  );
}

