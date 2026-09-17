"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { GeometricAccent } from "@/components/ui/GeometricAccent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS = ["perform.", "convert.", "scale.", "deliver."];

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const currentIndexRef = useRef(0);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // 1. Initial Page Load Animation Sequence
      const introTl = gsap.timeline();

      // Eyebrow
      introTl.fromTo(
        ".hero-animate.eyebrow",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );

      // Headline
      introTl.fromTo(
        ".hero-static-headline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0.2
      );

      // Initial word entrance
      if (wordsRef.current[0]) {
        introTl.fromTo(
          wordsRef.current[0],
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, duration: 0.7, ease: "power2.out" },
          0.3
        );
      }

      // Subheadline
      introTl.fromTo(
        ".hero-animate-subhead",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.4
      );

      // CTAs
      introTl.fromTo(
        ".hero-animate-ctas",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.5
      );

      // Background geometric accent
      introTl.fromTo(
        ".geometric-accent-hero",
        { opacity: 0, scale: 0.85 },
        { opacity: 0.15, scale: 1, duration: 0.9, ease: "power2.out" },
        0.2
      );

      // Scroll cue pulse
      gsap.to(".scroll-cue", {
        opacity: 0.4,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.set(".scroll-cue", { opacity: 1 });

      // 2. Setup Word Measurements & GSAP Cycler
      const measureWidths = () => {
        return wordsRef.current.map((el) => {
          if (!el) return 0;
          return el.getBoundingClientRect().width;
        });
      };

      let widths = measureWidths();

      // Initialize container width to match the initial word
      if (widths[0] && wordContainerRef.current) {
        gsap.set(wordContainerRef.current, { width: widths[0] });
      }

      // Convert all words to absolute positions
      wordsRef.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          position: "absolute",
          left: 0,
          top: 0,
          yPercent: idx === 0 ? 0 : 100,
          opacity: idx === 0 ? 1 : 0,
          visibility: idx === 0 ? "visible" : "hidden",
        });
      });

      // Handle window resize & font readiness to recalculate dimensions cleanly
      const updateDimensions = () => {
        widths = measureWidths();
        const curIdx = currentIndexRef.current;
        const curWidth = widths[curIdx];
        if (curWidth && wordContainerRef.current) {
          gsap.set(wordContainerRef.current, { width: curWidth });
        }
      };

      window.addEventListener("resize", updateDimensions);
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(updateDimensions);
      }

      // 3. Word Cycling Interval
      let interval: NodeJS.Timeout | null = null;

      if (!prefersReduced) {
        interval = setInterval(() => {
          const prevIdx = currentIndexRef.current;
          const nextIdx = (prevIdx + 1) % WORDS.length;
          currentIndexRef.current = nextIdx;

          const prevEl = wordsRef.current[prevIdx];
          const nextEl = wordsRef.current[nextIdx];
          const containerEl = wordContainerRef.current;

          if (!prevEl || !nextEl || !containerEl) return;

          const targetWidth = widths[nextIdx] || nextEl.getBoundingClientRect().width;

          const cycleTl = gsap.timeline();

          // Smoothly interpolate container width to eliminate layout shift
          cycleTl.to(
            containerEl,
            {
              width: targetWidth,
              duration: 0.45,
              ease: "power2.inOut",
            },
            0
          );

          // Animate outgoing word up, faded, and blurred
          cycleTl.to(
            prevEl,
            {
              yPercent: -100,
              opacity: 0,
              filter: "blur(4px)",
              duration: 0.4,
              ease: "power2.in",
              onComplete: () => {
                gsap.set(prevEl, { visibility: "hidden" });
              },
            },
            0
          );

          // Animate incoming word up from bottom, unblurred
          cycleTl.fromTo(
            nextEl,
            {
              yPercent: 100,
              opacity: 0,
              filter: "blur(4px)",
              visibility: "visible",
            },
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power2.out",
            },
            0.1
          );
        }, 2800);
      }

      return () => {
        window.removeEventListener("resize", updateDimensions);
        if (interval) clearInterval(interval);
      };
    },
    { scope: container }
  );

  return (
    <SectionWrapper theme="dark" id="hero" noPad>
      <div
        ref={container}
        className="relative flex flex-col items-center justify-center text-center min-h-[90vh] lg:min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ paddingTop: "7rem", paddingBottom: "5rem" }}
      >
        {/* Background Repeating Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--fg) 0, var(--fg) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--fg) 0, var(--fg) 1px, transparent 1px, transparent 80px)",
          }}
        />

        {/* Ambient Radial Spotlight Glow centered behind the hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(320px, 60vw, 800px)",
            height: "clamp(320px, 60vw, 800px)",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.04) 50%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />

        {/* Subtle Background Geometric Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute geometric-accent-hero"
          style={{
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(280px, 45vw, 550px)",
            height: "clamp(280px, 45vw, 550px)",
            opacity: 0,
          }}
        >
          <GeometricAccent
            shape="circle"
            size={420}
            opacity={0.15}
            trigger="load"
            delay={0.3}
          />
        </div>

        {/* Centered Single Column Content */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="hero-animate eyebrow mb-6 tracking-widest uppercase">
            PVT Limited
          </p>

          {/* Centered Headline with Word Cycle */}
          <h1
            className="hero-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.15]"
            style={{ color: "var(--fg)" }}
          >
            <span className="hero-static-headline inline">
              We build things that{" "}
            </span>
            <span
              ref={wordContainerRef}
              className="inline-block relative text-[var(--color-accent)] font-extrabold"
            >
              {/* Invisible strut maintains perfect baseline alignment natively */}
              <span className="invisible pointer-events-none select-none">&nbsp;</span>
              
              {/* Overflow mask */}
              <span className="absolute inset-0 overflow-hidden">
                {WORDS.map((word, idx) => (
                  <span
                    key={word}
                    ref={(el) => {
                      if (el) wordsRef.current[idx] = el;
                    }}
                    className="absolute left-0 top-0 whitespace-nowrap"
                    style={{
                      opacity: idx === 0 ? 1 : 0,
                      visibility: idx === 0 ? "visible" : "hidden",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Subheadline Copy */}
          <p
            className="hero-animate-subhead text-lg sm:text-xl md:text-2xl mb-10 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--fg-muted)" }}
          >
            Iuvora delivers web development, app development, digital marketing,
            and IT services – everything you need to launch and grow online.
          </p>

          {/* Reusable Button CTAs */}
          <div className="hero-animate-ctas flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="lg" id="hero-cta-primary">
              Start a Project →
            </Button>
            <Button
              href="/about"
              size="lg"
              variant="outline"
              id="hero-cta-secondary"
            >
              Learn about us
            </Button>
          </div>
        </div>

        {/* Scroll Cue at Bottom Center */}
        <div
          className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div
            className="w-[1px] h-10"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-gray-mid))",
            }}
          />
          <span
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "var(--color-gray-mid)" }}
          >
            scroll
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
