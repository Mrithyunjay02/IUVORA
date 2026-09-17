"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export interface Project {
  id?: string;
  title: string;
  description: string;
  year?: string;
  category?: string;
  image: string;
  tags: string[];
  caseStudyLink: string;
  liveSiteLink?: string;
  featured?: boolean;
  accent?: "gold" | "blue";
}

interface ProjectShowcaseProps {
  projects: Project[];
  className?: string;
}

export function ProjectShowcase({ projects, className = "" }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full overflow-visible ${className}`}
    >
      {/* ── Desktop Cursor-Following Floating Preview (md+) ── */}
      <div
        className="pointer-events-none absolute z-50 hidden md:block overflow-hidden rounded-xl shadow-2xl transition-opacity duration-300 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${smoothPosition.x + 28}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <div className="relative w-[320px] h-[200px] bg-secondary/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "scale(1)" : "scale(1.08)",
                filter: hoveredIndex === index ? "none" : "blur(8px)",
              }}
            >
              <Image
                src={project.image}
                alt={`${project.title} live interface preview`}
                fill
                sizes="320px"
                className="object-cover object-top"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Floating preview title watermark */}
          {hoveredIndex !== null && projects[hoveredIndex] && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-[11px] text-white/95 font-medium">
              <span className="truncate font-semibold">{projects[hoveredIndex].title}</span>
              {projects[hoveredIndex].category && (
                <span className="text-[10px] text-white/65 uppercase tracking-wider font-mono shrink-0 ml-2">
                  {projects[hoveredIndex].category}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Project List ── */}
      <div className="space-y-0">
        {projects.map((project, index) => {
          const isGold = project.accent === "gold" || project.featured;
          const accentColor = isGold ? "#C9A227" : "var(--color-accent)";

          return (
            <div
              key={project.title}
              className="group relative border-t border-border py-6 sm:py-8 transition-all duration-300 ease-out"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background highlight on hover (Desktop) */}
              <div
                className={`
                  pointer-events-none absolute inset-0 -mx-4 px-4 bg-secondary/50 rounded-lg
                  transition-all duration-300 ease-out hidden md:block
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-98"}
                `}
              />

              {/* ── Mobile Inline Preview Thumbnail (< md) ── */}
              <div className="block md:hidden mb-4 overflow-hidden rounded-lg border border-border bg-secondary/30">
                <Link
                  href={project.caseStudyLink}
                  className="block relative w-full aspect-[16/10] overflow-hidden focus-visible:outline-none"
                  aria-label={`View ${project.title} case study`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </Link>
              </div>

              {/* ── Content Row ── */}
              <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  {/* Top Meta: Title + Badges + Arrow */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <h4 className="text-foreground font-semibold text-xl sm:text-2xl tracking-tight">
                      <Link
                        href={project.caseStudyLink}
                        className="relative inline-block hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <span>{project.title}</span>
                        {/* Animated underline (Desktop) */}
                        <span
                          className={`
                            hidden md:block absolute left-0 -bottom-0.5 h-px bg-foreground
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </Link>
                    </h4>

                    {/* Featured Badge */}
                    {project.featured && (
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-sm flex items-center gap-1.5"
                        style={{
                          backgroundColor: "rgba(18,15,8,0.92)",
                          border: "1px solid rgba(201,162,39,0.5)",
                          color: "#C9A227",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: "#C9A227" }}
                        />
                        Featured
                      </span>
                    )}

                    {/* Category */}
                    {project.category && (
                      <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
                        {project.category}
                      </span>
                    )}

                    {/* Arrow that slides in on hover */}
                    <ArrowUpRight
                      className={`
                        w-4 h-4 text-muted-foreground hidden md:inline-block
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0 text-foreground"
                            : "opacity-0 -translate-x-2 translate-y-2"
                        }
                      `}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Description */}
                  <p
                    className={`
                      text-muted-foreground text-sm sm:text-base mt-2.5 leading-relaxed max-w-3xl
                      transition-colors duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/85" : "text-muted-foreground"}
                    `}
                  >
                    {project.description}
                  </p>

                  {/* Tag Pills */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-sm border border-border bg-secondary/60 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dual Action CTAs: Read Case Study + Live Site */}
                  <div className="flex items-center gap-5 mt-5 pt-3 border-t border-border/40">
                    <Link
                      href={project.caseStudyLink}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 no-underline"
                      style={{ color: "var(--fg)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
                      id={`project-${project.id || index}-read`}
                    >
                      <span>Read Case Study</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: accentColor }}
                      >
                        →
                      </span>
                    </Link>

                    {project.liveSiteLink && (
                      <a
                        href={project.liveSiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 no-underline"
                        aria-label={`Visit ${project.title} live external website`}
                        id={`project-${project.id || index}-live`}
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Year display */}
                {project.year && (
                  <span
                    className={`
                      text-xs font-mono text-muted-foreground tabular-nums shrink-0 pt-1 hidden md:block
                      transition-colors duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/70" : ""}
                    `}
                  >
                    {project.year}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}
