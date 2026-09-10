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
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom,1rem))] left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-none ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 dark:bg-[#0a0a0f]/85 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(47,123,255,0.15)]">
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[85vw] sm:max-w-none px-1">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`relative min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap touch-press active:scale-95 ${
                  isActive
                    ? "text-white bg-[#3b82f6] dark:bg-[#2563eb] shadow-[0_0_15px_rgba(59,130,246,0.4)] font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {sec.label}
              </button>
            );
          })}
        </nav>

        <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-0.5 hidden sm:block" />

        <button
          onClick={scrollToTop}
          className="w-9 h-9 min-h-[36px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer touch-press active:scale-90"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
