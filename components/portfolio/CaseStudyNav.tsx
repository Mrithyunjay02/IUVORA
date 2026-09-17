"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Features" },
  { id: "process", label: "Build" },
  { id: "outcome", label: "Outcome" },
];

export default function CaseStudyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (450px)
      const scrollY = window.scrollY;
      if (scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter((s) => s.el !== null);

      const scrollPosition = scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      aria-label="Case study section navigation"
      className="sticky top-16 md:top-20 z-40 w-full border-b bg-[var(--bg)]/80 backdrop-blur-xl transition-all duration-300"
      style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
    >
      <div className="portfolio-container flex items-center justify-between py-3 sm:py-4">
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap touch-press ${
                  isActive
                    ? "text-white bg-[#3b82f6] shadow-sm font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {sec.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={scrollToTop}
          className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer ml-4 shrink-0"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
