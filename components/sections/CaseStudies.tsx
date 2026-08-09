"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASE_STUDIES = [
  {
    id: 1,
    category: "Web Development",
    title: "[PLACEHOLDER — Client Project Name]",
    description:
      "[PLACEHOLDER — Replace with a 1–2 sentence summary of what was built, the problem it solved, and the technology used. Do not publish fabricated metrics.]",
    tags: ["Next.js", "E-commerce", "Performance"],
  },
  {
    id: 2,
    category: "App Development",
    title: "[PLACEHOLDER — Client Project Name]",
    description:
      "[PLACEHOLDER — Replace with a 1–2 sentence summary of the mobile app, its audience, and outcome. Do not publish fabricated metrics.]",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: 3,
    category: "Digital Marketing",
    title: "[PLACEHOLDER — Client Project Name]",
    description:
      "[PLACEHOLDER — Replace with a brief description of the marketing campaign, channels used, and real measurable results when available.]",
    tags: ["SEO", "Paid Ads", "Content"],
  },
];

function CaseStudyCard({
  item,
  index,
}: {
  item: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  return (
    <article
      className="case-study-card group opacity-0"
      aria-label={item.title}
      id={`case-study-${item.id}`}
    >
      <div
        className="relative w-full mb-6 overflow-hidden rounded-sm"
        style={{ aspectRatio: "16/10" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              index % 2 === 0
                ? "linear-gradient(135deg, var(--color-black) 0%, #1a1a2e 100%)"
                : "linear-gradient(135deg, #0f0f1a 0%, #1a2e1a 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--color-gray-mid) 0, var(--color-gray-mid) 1px, transparent 1px, transparent 20px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            className="text-6xl font-black font-[var(--font-display)] opacity-10"
            style={{ color: "var(--color-white)" }}
          >
            0{item.id}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span
            className="eyebrow px-3 py-1 rounded-sm"
            style={{
              backgroundColor: "rgba(47,123,255,0.15)",
              border: "1px solid rgba(47,123,255,0.3)",
            }}
          >
            {item.category}
          </span>
        </div>
      </div>

      <h3
        className="text-xl font-bold mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-200"
        style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
      >
        {item.title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "var(--fg-muted)" }}
      >
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-sm"
            style={{
              color: "var(--fg-muted)",
              border: "1px solid color-mix(in srgb, var(--fg) 15%, transparent)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".case-studies-header-anim",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
      },
    });

    // Cards stagger reveal
    ScrollTrigger.create({
      trigger: ".case-studies-grid",
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".case-study-card",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        );
      },
    });
  }, { scope: containerRef });

  return (
    <SectionWrapper theme="light" id="work">
      <div className="container-grid" ref={containerRef}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="case-studies-header-anim eyebrow mb-4">
              Our work
            </p>
            <h2
              className="case-studies-header-anim section-headline"
              style={{ color: "var(--fg)" }}
            >
              Selected projects.
            </h2>
          </div>
          <p
            className="case-studies-header-anim text-sm pb-1"
            style={{ color: "var(--color-accent)" }}
          >
            ⚠ Placeholders — real case studies coming soon
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
