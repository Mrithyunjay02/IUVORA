"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DURATION = 1100; // ms
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

const THEMES = {
  dark: {
    bgHex: "#0a0a0a",
    bgVar: "var(--color-black)",
    fgVar: "var(--color-white)",
  },
  light: {
    bgHex: "#fafafa",
    bgVar: "var(--color-white)",
    fgVar: "var(--color-black)",
  },
} as const;

type Theme = keyof typeof THEMES;

export function ScrollThemeProvider() {
  const pathname = usePathname();
  
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Overlay element ──────────────────────────────────────────────────────
    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("data-scroll-overlay", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "1",
      pointerEvents: "none",
      willChange: "auto",
      transform: "translateY(-100%)",
      contain: "strict",
    });
    document.body.appendChild(overlay);

    let activeAnimation: Animation | null = null;
    let committedBgVar: string = THEMES.dark.bgVar;

    const commitInstant = (theme: Theme) => {
      const t = THEMES[theme];
      document.documentElement.style.setProperty("--bg", t.bgVar);
      document.documentElement.style.setProperty("--fg", t.fgVar);
      committedBgVar = t.bgVar;
    };

    const applyTheme = (theme: Theme, goingDown: boolean) => {
      const t = THEMES[theme];

      if (prefersReduced) {
        commitInstant(theme);
        return;
      }

      if (t.bgVar === committedBgVar && !activeAnimation) return;

      if (activeAnimation) {
        activeAnimation.cancel();
        activeAnimation = null;
      }

      overlay.style.transform = "translateY(-100%)";

      const fgVar = t.fgVar;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--fg", fgVar);
      });

      const startTransform = goingDown ? "translateY(100%)" : "translateY(-100%)";
      const endTransform = "translateY(0%)";

      overlay.style.backgroundColor = t.bgHex;
      overlay.style.transform = startTransform;

      overlay.style.willChange = "transform";
      const anim = overlay.animate(
        [{ transform: startTransform }, { transform: endTransform }],
        {
          duration: DURATION,
          easing: EASING,
          fill: "forwards",
        }
      );
      activeAnimation = anim;

      anim.finished
        .then(() => {
          document.documentElement.style.setProperty("--bg", t.bgVar);
          committedBgVar = t.bgVar;
          overlay.style.transform = "translateY(-100%)";
          overlay.style.willChange = "auto";
          activeAnimation = null;
        })
        .catch(() => {
          overlay.style.willChange = "auto";
        });
    };

    // ── Set initial theme without animation ──────────────────────────────────
    const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");
    if (sections.length > 0) {
      const firstTheme = (sections[0].getAttribute("data-theme") ?? "dark") as Theme;
      commitInstant(firstTheme);
    }

    // ── Create ScrollTriggers ────────────────────────────────────────────────
    sections.forEach((section) => {
      const theme = section.getAttribute("data-theme") as Theme;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => applyTheme(theme, true),
        onEnterBack: () => applyTheme(theme, false),
      });
    });

    return () => {
      if (activeAnimation) activeAnimation.cancel();
      try {
        document.body.removeChild(overlay);
      } catch {}
    };
  }, { dependencies: [pathname] });

  return null;
}
