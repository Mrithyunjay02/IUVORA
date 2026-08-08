"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

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
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group"
      aria-label={item.title}
      id={`case-study-${item.id}`}
    >
      {/* Placeholder image block — geometric BW aesthetic */}
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
        {/* Geometric placeholder pattern */}
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
        {/* Overlay category badge */}
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

      {/* Content */}
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

      {/* Tags */}
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
    </motion.article>
  );
}

export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper theme="light" id="work">
      <div className="container-grid">
        <div ref={ref} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our work
            </motion.p>
            <motion.h2
              className="section-headline"
              style={{ color: "var(--fg)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Selected projects.
            </motion.h2>
          </div>
          <motion.p
            className="text-sm pb-1"
            style={{ color: "var(--color-accent)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ⚠ Placeholders — real case studies coming soon
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((item, i) => (
            <CaseStudyCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
