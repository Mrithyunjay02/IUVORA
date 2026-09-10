"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AccentLine } from "@/components/ui/AccentLine";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASE_STUDIES = [
  {
    id: 1,
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
    isPrototype: false,
  },
  {
    id: 2,
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
    isPrototype: false,
  },
  {
    id: 3,
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
    isPrototype: false,
  },
  {
    id: 4,
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
    isPrototype: false,
  },
  {
    id: 5,
    category: "App Development",
    title: "Matru-Sneh",
    featured: false,
    accent: "blue",
    image: "/case-studies/matrusneha.webp",
    imageFit: "contain" as const,
    description:
      "A bilingual (Kannada/English) maternal health companion app for tracking pregnancy - featuring a kick counter, checkup countdown with appointment tracking, weekly baby growth updates, a daily nutrition checklist, and a health alerts system for recognizing pregnancy danger signs.",
    tags: ["App Development", "Maternal Health", "Mobile UI"],
    link: null,
    isPrototype: true,
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
  const isAppDev = item.category === "App Development";
  const accentColor = isGold ? "#C9A227" : isAppDev ? "#38bdf8" : "var(--color-accent)";
  const accentBorder = isGold
    ? "rgba(201,162,39,0.35)"
    : isAppDev
    ? "rgba(56,189,248,0.35)"
    : "rgba(47,123,255,0.3)";

  const getGlowStyle = () => {
    if (isGold) {
      return "0 0 0 1px rgba(201,162,39,0.2), 0 0 32px rgba(201,162,39,0.15), 0 0 8px rgba(201,162,39,0.3)";
    } else if (isAppDev) {
      return "0 0 0 1px rgba(56,189,248,0.2), 0 0 32px rgba(56,189,248,0.12), 0 0 8px rgba(56,189,248,0.25)";
    } else {
      return "0 0 0 1px rgba(47,123,255,0.2), 0 0 32px rgba(47,123,255,0.1), 0 0 8px rgba(47,123,255,0.2)";
    }
  };

  return (
    <article
      className="group flex flex-col justify-between p-6 md:p-8 rounded-sm card-border"
      aria-label={item.title}
      id={`case-study-${item.id}`}
      style={{
        backgroundColor: "color-mix(in srgb, var(--fg) 2%, transparent)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? getGlowStyle() : "none",
        borderColor: isHovered ? accentBorder : undefined,
        transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Visual Header */}
        <div
          className="relative w-full mb-6 overflow-hidden rounded-sm border"
          style={{
            aspectRatio: "16/10",
            borderColor: isGold
              ? "rgba(201,162,39,0.28)"
              : "color-mix(in srgb, var(--fg) 10%, transparent)",
            background:
              item.imageFit === "contain"
                ? "radial-gradient(ellipse at center, #111a2e 0%, #080c14 100%)"
                : undefined,
          }}
        >
          {item.image ? (
            <>
              {/* Real Screenshot */}
              <Image
                src={item.image}
                alt={`${item.title} Screenshot Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={
                  item.imageFit === "contain"
                    ? "object-contain p-3.5 transition-transform duration-500 group-hover:scale-[1.04]"
                    : "object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                }
                priority={index < 2}
              />

              {/* Dark vignette / gradient overlay for badges & text contrast - darkens on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    item.imageFit === "contain"
                      ? "linear-gradient(180deg, rgba(8,12,20,0.5) 0%, transparent 40%, rgba(8,12,20,0.7) 100%)"
                      : "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 45%, rgba(10,10,10,0.85) 100%)",
                  opacity: isHovered ? 1 : 0.7,
                }}
              />

              {/* Hover darkening overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: "rgba(0, 0, 0, 0.25)",
                  opacity: isHovered ? 1 : 0,
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0b1528 0%, #102a43 50%, #1e3a8a 100%)",
              }}
            />
          )}

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="eyebrow px-3 py-1 rounded-sm text-[11px] flex items-center gap-1.5"
              style={{
                backgroundColor: isGold
                  ? "rgba(18,15,8,0.88)"
                  : isAppDev
                  ? "rgba(8,18,30,0.88)"
                  : "rgba(8,16,32,0.88)",
                border: `1px solid ${accentBorder}`,
                color: accentColor,
              }}
            >
              {isAppDev && (
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              )}
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
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold mb-3 leading-tight transition-colors duration-200"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-display)",
          }}
        >
          {item.title}
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

      {/* Footer / CTA */}
      <div
        className="pt-4 border-t flex items-center justify-between"
        style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
      >
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 no-underline"
            style={{ color: "var(--fg)" }}
            id={`case-study-${item.id}-link`}
            onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
          >
            <span>Visit Website</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: accentColor }}
            >
              ↗
            </span>
          </a>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-sm border uppercase tracking-wider select-none"
              style={{
                backgroundColor: "rgba(56, 189, 248, 0.08)",
                borderColor: "rgba(56, 189, 248, 0.25)",
                color: "#38bdf8",
              }}
              id={`case-study-${item.id}-prototype`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] opacity-80" />
              Prototype
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              Mobile Case Study
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper theme="light" id="work">
      <div className="container-grid" ref={containerRef}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className=" eyebrow mb-4">
              Our work
            </p>
            <h2
              className=" section-headline mb-4"
              style={{ color: "var(--fg)" }}
            >
              Selected projects.
            </h2>
            <div className="w-12">
              <AccentLine trigger="scroll" />
            </div>
          </div>
          <p
            className=" text-sm pb-1"
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
      </div>
    </SectionWrapper>
  );
}
