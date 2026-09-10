"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Globe, ShieldCheck } from "lucide-react";
import { Project } from "@/data/projects";
import BackButton from "./BackButton";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backBtnWrapperRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        backBtnWrapperRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.1 }
      )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          tagsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          previewRef.current,
          { opacity: 0, y: 30, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-36 sm:pt-44 lg:pt-48 pb-16 lg:pb-28 overflow-hidden bg-grid-pattern hero-radial-glow"
    >
      <div className="portfolio-container relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Navigation Breadcrumb using BackButton */}
          <div ref={backBtnWrapperRef} className="mb-10 sm:mb-12">
            <BackButton href="/work#gallery" label="Back to Works Archive" />
          </div>

          {/* Eyebrow & Category Info */}
          <div ref={badgeRef} className="flex flex-wrap items-center gap-3.5 mb-6 sm:mb-8">
            <span className="text-sm font-bold tracking-tight text-[var(--color-accent)]">
              {project.number}
            </span>
            <span className="text-[var(--fg-muted)] opacity-50 text-xs">/</span>
            <span className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-[var(--fg)]">
              {project.category}
            </span>
            {project.status && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3b82f6]/10 dark:bg-[#60a5fa]/10 border border-[#3b82f6]/20 dark:border-[#60a5fa]/25 text-xs font-medium text-[#3b82f6] dark:text-[#93c5fd]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] dark:bg-[#60a5fa]" />
                <span>{project.status}</span>
              </span>
            )}
          </div>

          {/* Oversized Display Title */}
          <h1
            ref={titleRef}
            className="hero-headline mb-8"
            style={{ color: "var(--fg)" }}
          >
            {project.title}
          </h1>

          {/* Restrained Editorial Description */}
          <p
            ref={descRef}
            className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-10"
            style={{ color: "var(--fg-muted)" }}
          >
            {project.description}
          </p>

          {/* Minimal Tags */}
          <div ref={tagsRef} className="flex flex-wrap gap-2 sm:gap-2.5 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.03] border border-black/10 dark:border-white/10"
                style={{ color: "var(--fg-muted)" }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Primary Actions */}
          <div ref={actionsRef} className="flex flex-wrap items-center gap-4 mb-16 lg:mb-20">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-[#3b82f6] dark:hover:bg-[#60a5fa] hover:text-white transition-all duration-300 shadow-md dark:shadow-[0_4px_25px_rgba(255,255,255,0.15)] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
              >
                <span>Visit Live Platform</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
                <ShieldCheck className="w-4 h-4 text-zinc-500" />
                <span>Production Platform</span>
              </div>
            )}

            <Link
              href="/work#gallery"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-xs tracking-wide bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
              style={{ color: "var(--fg)" }}
            >
              <span>All Projects</span>
            </Link>
          </div>
        </div>

        {/* Showcase Centerpiece - Clean Editorial Frame without fake browser dots */}
        <div
          ref={previewRef}
          className="rounded-2xl bg-white dark:bg-[#09090c] border border-black/10 dark:border-white/15 p-2 sm:p-3 shadow-md dark:shadow-2xl overflow-hidden transition-all duration-500"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#f3f4f8] dark:bg-[#111116] rounded-t-xl border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Globe className="w-3.5 h-3.5 text-[#3b82f6] dark:text-[#60a5fa] shrink-0" />
              <span className="truncate max-w-xs">{project.title}</span>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#3b82f6] dark:text-[#60a5fa] hover:underline flex items-center gap-1"
              >
                <span>{project.liveUrl.replace(/^https?:\/\//, "")}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Media Viewport */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#f5f6fa] dark:bg-[#050507] rounded-b-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} live interface preview`}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
