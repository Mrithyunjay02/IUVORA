"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { GeometricAccent } from "@/components/ui/GeometricAccent";
import { CodeTerminalMascot } from "@/components/ui/CodeTerminalMascot";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Section 9.4 - Stat counter ─────────────────────────────────────────────
const STATS = [
  { target: 5,   suffix: "",  label: "Projects delivered" },
  { target: 4,   suffix: "",  label: "Service verticals"  },
  { target: 100, suffix: "%", label: "In-house team"       },
];

function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    // ScrollTrigger to animate count
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: "power3.out",
          onUpdate: () => {
            setCount(Math.round(proxy.val));
          },
        });
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="card-border rounded-lg px-4 py-3"
      style={{
        borderRadius: "8px",
      }}
    >
      <p
        className="text-4xl font-extrabold font-[var(--font-display)] leading-none mb-1"
        style={{ color: "var(--color-white)" }}
        aria-live="polite"
        aria-label={`${count}${suffix} ${label}`}
      >
        <span aria-hidden="true">
          {count}
          {suffix}
        </span>
      </p>
      <p className="text-sm" style={{ color: "var(--color-gray-mid)" }}>
        {label}
      </p>
    </div>
  );
}

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline();

    // Hero headline: word-by-word reveal with scale
    tl.fromTo(
      ".hero-headline-word",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 },
      0
    );

    // Geometric accent circle
    tl.fromTo(
      ".geometric-accent-hero",
      { opacity: 0, scale: 0.8 },
      { opacity: 0.25, scale: 1, duration: 0.8, ease: "power2.out" },
      0.2
    );

    // Eyebrow
    tl.fromTo(
      ".hero-animate",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.1
    );

    // Subheadline & stats
    tl.fromTo(
      ".hero-animate:not(.eyebrow)",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 },
      0.4
    );


    // Scroll cue pulse
    gsap.to(".scroll-cue", {
      opacity: 0.4,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.set(".scroll-cue", { opacity: 1 });

  }, { scope: container });

  return (
    <SectionWrapper theme="dark" id="hero" noPad>
      <div
        ref={container}
        className="relative flex flex-col lg:flex-row lg:items-center justify-between min-h-screen container-grid gap-8 lg:gap-16"
        style={{ paddingTop: "8rem", paddingBottom: "6rem" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: "20%",
            right: "10%",
            width: "clamp(300px, 40vw, 600px)",
            height: "clamp(300px, 40vw, 600px)",
            background: "radial-gradient(circle, rgba(47,123,255,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute geometric-accent-hero"
          style={{
            top: "15%",
            right: "8%",
            width: "clamp(250px, 30vw, 450px)",
            height: "clamp(250px, 30vw, 450px)",
            opacity: 0,
          }}
        >
          <GeometricAccent
            shape="circle"
            size={300}
            opacity={0.25}
            trigger="load"
            delay={0.4}
          />
        </div>

        <div className="relative z-10 flex-1 max-w-xl lg:max-w-2xl">
          <p className="hero-animate eyebrow mb-6">
            Digital Studio
          </p>

          <h1
            className="hero-headline mb-8"
            style={{ color: "var(--color-white)" }}
          >
            <span className="hero-headline-word" style={{ display: "inline-block", opacity: 0 }}>We</span>{" "}
            <span className="hero-headline-word" style={{ display: "inline-block", opacity: 0 }}>build</span>{" "}
            <span className="hero-headline-word" style={{ display: "inline-block", opacity: 0 }}>things</span>
            <br />
            <span className="hero-headline-word" style={{ display: "inline-block", opacity: 0, color: "var(--color-accent)" }}>that perform.</span>
          </h1>

          <p
            className="hero-animate text-lg md:text-xl mb-10 leading-relaxed"
            style={{ color: "var(--color-gray-mid)", maxWidth: "52ch" }}
          >
            Iuvora delivers web development, app development, digital marketing,
            and IT services - everything you need to launch and grow online.
          </p>

          <div className="hero-animate flex flex-wrap gap-4">
            <Button href="/contact" size="lg" id="hero-cta-primary">
              Start a Project →
            </Button>
            <Button href="/about" size="lg" variant="outline" id="hero-cta-secondary">
              Learn about us
            </Button>
          </div>

          <div className="hero-animate flex flex-wrap gap-10 mt-20">
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </div>


        <div
          className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div
            className="w-[1px] h-10"
            style={{ background: "linear-gradient(to bottom, transparent, var(--color-gray-mid))" }}
          />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--color-gray-mid)" }}>
            scroll
          </span>
        </div>

        {/* Code/Terminal mascot - full right side, aligned with "that" */}
        <div className="hidden lg:flex flex-1 items-start justify-end shrink-0 -mt-64" style={{ minHeight: "400px" }}>
          <div className="w-full max-w-md lg:max-w-lg">
            <CodeTerminalMascot delay={0.4} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
