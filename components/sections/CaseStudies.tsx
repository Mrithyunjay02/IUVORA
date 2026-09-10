"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASE_STUDIES = [
  {
    id: "daynit-enterprises",
    category: "Web Development",
    title: "Daynit Enterprises",
    featured: true,
    accent: "gold",
    image: "/case-studies/daynit.webp",
    imageFit: "cover" as const,
    description:
      "An independent import and export business connecting global markets - exporting fresh produce, spices, grains, pulses, and eco-friendly tableware. The site showcases their product range, sourcing-to-delivery process, and latest trade news for buyers worldwide.",
    tags: ["Web Development", "Export & Trade", "Global Sourcing"],
    link: "https://daynitenterprises.com",
  },
  {
    id: "shams-al-kanari",
    category: "Web Development",
    title: "Shams Al Kanari",
    featured: true,
    accent: "gold",
    image: "/case-studies/shams.webp",
    imageFit: "cover" as const,
    description:
      "A luxury architectural service and property maintenance brand serving Dubai's premium villas, penthouses, and commercial spaces. The site presents their bespoke services, portfolio of featured projects, and booking channels for discerning clients across the city.",
    tags: ["Web Development", "Luxury Architecture", "Dubai Real Estate"],
    link: "https://shamsalkanari.com",
  },
  {
    id: "mh-developers",
    category: "Web Development",
    title: "MH Developers",
    featured: false,
    accent: "blue",
    image: "/case-studies/mhdevelopers.webp",
    imageFit: "cover" as const,
    description:
      "A construction and real estate development company showcasing completed and ongoing residential projects, leadership team, and a project inquiry system for prospective buyers across Karnataka.",
    tags: ["Web Development", "Real Estate", "Construction"],
    link: "https://mhdevelopers.netlify.app",
  },
  {
    id: "fitforce",
    category: "Web Development",
    title: "FitForce",
    featured: false,
    accent: "blue",
    image: "/case-studies/fitforce.webp",
    imageFit: "cover" as const,
    description:
      "A personal fitness coaching brand offering online training plans, nutrition guidance, and trainer certifications - built with a full enrollment and plan-selection experience for clients.",
    tags: ["Web Development", "Fitness", "Coaching"],
    link: "https://getfitwith-abhi.netlify.app",
  },
  {
    id: "style-dance-crew",
    category: "Web Platform",
    title: "Style Dance Crew Studio",
    featured: false,
    accent: "blue",
    image: "/case-studies/style-dance-crew-formation.webp",
    imageFit: "cover" as const,
    description:
      "A premier dance and gymnastics institution in Shivamogga established in 2008. The web platform presents structured academy programs, certified trainers, event galleries, and student enrollment channels.",
    tags: ["Performing Arts", "Academy Portal", "Class Engine"],
    link: "https://styledancecrew.com",
  },
];

function CaseStudyCard({
  item,
  index,
}: {
  item: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isGold = item.accent === "gold";
  const accentColor = isGold ? "#C9A227" : "var(--color-accent)";
  const accentBorder = isGold ? "rgba(201,162,39,0.35)" : "rgba(37,99,235,0.35)";

  return (
    <article
      className="group flex flex-col justify-between p-6 md:p-8 rounded-sm card-border"
      aria-label={item.title}
      id={`case-study-${item.id}`}
      style={{
        backgroundColor: "color-mix(in srgb, var(--fg) 2%, transparent)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 16px 36px -8px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12)" : "none",
        borderColor: isHovered ? accentBorder : undefined,
        transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Visual Header */}
        <Link
          href={`/work/${item.id}`}
          className="block relative w-full mb-6 overflow-hidden rounded-sm border focus-visible:outline-none"
          style={{
            aspectRatio: "16/10",
            borderColor: isGold
              ? "rgba(201,162,39,0.28)"
              : "color-mix(in srgb, var(--fg) 10%, transparent)",
          }}
          aria-label={`View ${item.title} Case Study`}
        >
          {item.image && (
            <>
              <Image
                src={item.image}
                alt={`${item.title} Screenshot Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                priority={index < 2}
              />

              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 45%, rgba(10,10,10,0.85) 100%)",
                  opacity: isHovered ? 1 : 0.7,
                }}
              />
            </>
          )}

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="eyebrow px-3 py-1 rounded-sm text-[11px] flex items-center gap-1.5"
              style={{
                backgroundColor: isGold
                  ? "rgba(18,15,8,0.88)"
                  : "rgba(8,16,32,0.88)",
                border: `1px solid ${accentBorder}`,
                color: accentColor,
              }}
            >
              <span>{item.category}</span>
            </span>
          </div>

          {/* Featured Badge */}
          {item.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm flex items-center gap-1.5"
                style={{
                  backgroundColor: "rgba(18,15,8,0.88)",
                  border: "1px solid rgba(201,162,39,0.55)",
                  color: "#C9A227",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#C9A227" }}
                />
                Featured
              </span>
            </div>
          )}
        </Link>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold mb-3 leading-tight transition-colors duration-200"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-display)",
          }}
        >
          <Link
            href={`/work/${item.id}`}
            className="hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
            style={{ color: "inherit" }}
          >
            {item.title}
          </Link>
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--fg-muted)" }}
        >
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-sm"
              style={{
                color: "var(--fg-muted)",
                backgroundColor: "color-mix(in srgb, var(--fg) 4%, transparent)",
                border: "1px solid color-mix(in srgb, var(--fg) 12%, transparent)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Dual Action: Deep Case Study + Live Site */}
      <div
        className="pt-4 border-t flex items-center justify-between gap-4"
        style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
      >
        <Link
          href={`/work/${item.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 no-underline"
          style={{ color: "var(--fg)" }}
          id={`case-study-${item.id}-read`}
          onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
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

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors duration-200 no-underline"
            id={`case-study-${item.id}-link`}
            aria-label={`Visit ${item.title} external website`}
          >
            <span>Live Site</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper theme="dark" id="work">
      <div className="container-grid" ref={containerRef}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
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

        <div className="case-studies-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((item, i) => (
            <CaseStudyCard key={item.id} item={item} index={i} />
          ))}
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
