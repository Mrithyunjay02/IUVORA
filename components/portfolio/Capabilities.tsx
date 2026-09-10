"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight, Globe } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  { id: "all", label: "All Builds", count: PROJECTS.length },
  {
    id: "trade",
    label: "Global Trade",
    count: PROJECTS.filter((p) => p.tags.includes("Global Trade") || p.id === "daynit-enterprises").length,
    filter: (p: Project) => p.tags.includes("Global Trade") || p.id === "daynit-enterprises",
  },
  {
    id: "luxury",
    label: "Luxury Architecture",
    count: PROJECTS.filter((p) => p.id === "shams-al-kanari").length,
    filter: (p: Project) => p.id === "shams-al-kanari",
  },
  {
    id: "realestate",
    label: "Real Estate",
    count: PROJECTS.filter((p) => p.id === "mh-developers").length,
    filter: (p: Project) => p.id === "mh-developers",
  },
  {
    id: "fitness",
    label: "Fitness & Health",
    count: PROJECTS.filter((p) => p.id === "fitforce").length,
    filter: (p: Project) => p.id === "fitforce",
  },
  {
    id: "arts",
    label: "Performing Arts",
    count: PROJECTS.filter((p) => p.id === "style-dance-crew").length,
    filter: (p: Project) => p.id === "style-dance-crew",
  },
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => {
        const cat = CATEGORIES.find((c) => c.id === activeCategory);
        return cat?.filter ? cat.filter(p) : true;
      });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".project-visual-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-[var(--bg)] border-t transition-colors duration-200 scroll-mt-24"
      style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">
              Case Studies &amp; Platforms
            </p>
            <h2
              className="section-headline mb-4"
              style={{ color: "var(--fg)" }}
            >
              Selected Works
            </h2>
            <p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: "var(--fg-muted)" }}
            >
              Production web applications, institutional platforms, and commercial systems engineered for verified clients.
            </p>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer touch-press ${
                    isActive
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                      : "bg-black/[0.04] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const isFeatured = activeCategory === "all" && idx === 0;

            if (isFeatured) {
              return (
                <article
                  key={project.id}
                  className="project-visual-card group lg:col-span-2 rounded-3xl bg-[#f8f9fc] dark:bg-[#14151e] border border-black/10 dark:border-white/10 overflow-hidden hover:border-[#3b82f6]/40 dark:hover:border-[#60a5fa]/40 transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-4 sm:p-6 lg:p-8">
                    {/* Media Preview Column (7 cols) */}
                    <div className="lg:col-span-7">
                      <Link
                        href={`/work/${project.id}`}
                        className="block relative rounded-2xl overflow-hidden bg-black/5 dark:bg-black/40 aspect-[16/10] border border-black/5 dark:border-white/10 group-hover:scale-[1.01] transition-transform duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                        aria-label={`View case study for ${project.title}`}
                      >
                        <Image
                          src={project.image}
                          alt={`${project.title} live interface preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 750px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-bold tracking-tight">
                            {project.number} · Flagship Build
                          </span>

                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-xs font-medium text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Live Production</span>
                          </span>
                        </div>

                        {/* Bottom Image Title Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                            {project.category}
                          </span>
                          <span className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                            <span>Inspect Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* Content Column (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3b82f6]/10 dark:bg-[#60a5fa]/10 text-[#3b82f6] dark:text-[#60a5fa] text-xs font-semibold uppercase tracking-wide mb-3">
                          <span>Featured Production Release</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 group-hover:text-[#3b82f6] dark:group-hover:text-[#60a5fa] transition-colors">
                          <Link href={`/work/${project.id}`} className="focus:outline-none focus:underline">
                            {project.title}
                          </Link>
                        </h3>

                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                        <Link
                          href={`/work/${project.id}`}
                          className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-[#3b82f6] dark:hover:bg-[#60a5fa] hover:text-white dark:hover:text-zinc-950 transition-all duration-200 active:scale-95 shadow-sm touch-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                          aria-label={`Read technical case study for ${project.title}`}
                        >
                          <span>Read Case Study</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 transition-all duration-200 active:scale-95 touch-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                            aria-label={`Open live website for ${project.title}`}
                          >
                            <Globe className="w-3.5 h-3.5 text-[#3b82f6] dark:text-[#60a5fa]" />
                            <span>Live Site</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={project.id}
                className="project-visual-card group rounded-3xl bg-[#f8f9fc] dark:bg-[#14151e] border border-black/10 dark:border-white/10 overflow-hidden hover:border-[#3b82f6]/40 dark:hover:border-[#60a5fa]/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                {/* Media Preview Area */}
                <div className="relative p-3 sm:p-4 pb-0">
                  <Link
                    href={`/work/${project.id}`}
                    className="block relative rounded-2xl overflow-hidden bg-black/5 dark:bg-black/40 aspect-[16/10] border border-black/5 dark:border-white/10 group-hover:scale-[1.01] transition-transform duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                    aria-label={`View case study for ${project.title}`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} live interface preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-bold tracking-tight">
                        {project.number}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-xs font-medium text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Live Production</span>
                      </span>
                    </div>

                    {/* Bottom Image Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        {project.category}
                      </span>
                      <span className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Card Body & Information */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-[#3b82f6] dark:group-hover:text-[#60a5fa] transition-colors">
                      <Link href={`/work/${project.id}`} className="focus:outline-none focus:underline">
                        {project.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-5 font-light">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Dual Action Targets (Mobile-first ≥44px height) */}
                  <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                    <Link
                      href={`/work/${project.id}`}
                      className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-[#3b82f6] dark:hover:bg-[#60a5fa] hover:text-white dark:hover:text-zinc-950 transition-all duration-200 active:scale-95 shadow-sm touch-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                      aria-label={`Read technical case study for ${project.title}`}
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 transition-all duration-200 active:scale-95 touch-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                        aria-label={`Open live website for ${project.title}`}
                      >
                        <Globe className="w-3.5 h-3.5 text-[#3b82f6] dark:text-[#60a5fa]" />
                        <span>Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
