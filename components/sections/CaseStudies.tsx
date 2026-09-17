"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";
import { ProjectShowcase, Project } from "@/components/ui/project-showcase";

const INDIA_PROJECTS: Project[] = [
  {
    id: "daynit-enterprises",
    title: "Daynit Enterprises",
    category: "Web Development",
    year: "2024",
    featured: true,
    accent: "gold",
    image: "/case-studies/daynit.webp",
    description:
      "An independent import and export business connecting global markets - exporting fresh produce, spices, grains, pulses, and eco-friendly tableware.",
    tags: ["Web Development", "Export & Trade", "Global Sourcing"],
    caseStudyLink: "/work/daynit-enterprises",
    liveSiteLink: "https://daynitenterprises.com",
  },
  {
    id: "style-dance-crew",
    title: "Style Dance Crew Studio",
    category: "Web Platform",
    year: "2024",
    featured: false,
    accent: "blue",
    image: "/case-studies/style-dance-crew-formation.webp",
    description:
      "A premier dance and gymnastics institution in Shivamogga established in 2008 with structured academy programs, certified trainers, and class engines.",
    tags: ["Performing Arts", "Academy Portal", "Class Engine"],
    caseStudyLink: "/work/style-dance-crew",
    liveSiteLink: "https://styledancecrew.com",
  },
];

const UAE_PROJECTS: Project[] = [
  {
    id: "shams-al-kanari",
    title: "Shams Al Kanari",
    category: "Web Development",
    year: "2024",
    featured: true,
    accent: "gold",
    image: "/case-studies/shams.webp",
    description:
      "A luxury architectural service and property maintenance brand serving Dubai's premium villas, penthouses, and commercial spaces.",
    tags: ["Web Development", "Luxury Architecture", "Dubai Real Estate"],
    caseStudyLink: "/work/shams-al-kanari",
    liveSiteLink: "https://shamsalkanari.com",
  },
];

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper theme="dark" id="work">
      <div className="container-grid" ref={containerRef}>
        {/* Main Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-4">
              Our work
            </p>
            <h2
              className="section-headline mb-4"
              style={{ color: "var(--fg)" }}
            >
              Selected projects.
            </h2>
            <div className="w-12">
              <AccentLine trigger="scroll" />
            </div>
          </div>
          <p
            className="text-sm pb-1"
            style={{ color: "var(--fg-muted)" }}
          >
            Recent deliverables &amp; client partnerships
          </p>
        </div>

        {/* Regional Project Groups */}
        <div className="space-y-16">
          {/* India Group */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-border">
              <p className="eyebrow mb-1 text-[var(--color-accent)]">
                Region · South Asia
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                India
              </h3>
            </div>

            <ProjectShowcase projects={INDIA_PROJECTS} />
          </div>

          {/* UAE / Dubai Group */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-border">
              <p className="eyebrow mb-1 text-[var(--color-accent)]">
                Region · Middle East
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                UAE / Dubai
              </h3>
            </div>

            <ProjectShowcase projects={UAE_PROJECTS} />
          </div>
        </div>

        {/* Section Gateway to Full Portfolio */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-sm border border-white/10 bg-white/[0.02]">
          <div>
            <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Explore our complete showcase &amp; capabilities
            </h3>
            <p className="text-sm text-zinc-400">
              Browse deep case studies, interactive UI prototypes, and engineering delivery breakdowns.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all shrink-0 no-underline shadow-lg"
          >
            <span>Explore All Work</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
