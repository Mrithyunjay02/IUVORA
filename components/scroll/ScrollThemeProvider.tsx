"use client";

import { useEffect } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const DURATION = 1100; // ms — restored to original tuned value
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const ROOT_MARGIN = "-45% 0px -45% 0px";

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

// ─── ScrollThemeProvider ──────────────────────────────────────────────────────
/**
 * Transform-based directional wipe mechanic (replaces clip-path):
 *
 *   clip-path animations are NOT reliably GPU-composited in all browsers.
 *   transform: translateY() IS — every major browser composites transforms
 *   on the GPU without exception.
 *
 *   Mechanic:
 *   1. A fixed full-viewport div (the "overlay") sits at z-index: 1.
 *      It starts off-screen via translateY(-100%) or translateY(100%).
 *
 *   2. When IntersectionObserver fires, the overlay's background is set
 *      to the incoming theme color, and it slides into view via
 *      transform: translateY(0%) using the Web Animations API.
 *      Direction matches scroll direction.
 *
 *   3. Once the overlay fully covers the viewport (translateY(0%)),
 *      --bg on <html> is updated to match the overlay color, and the
 *      overlay is instantly moved back off-screen. Since body and overlay
 *      show the same color at the handoff moment, there is no visible seam.
 *
 *   4. --fg is deferred by one rAF so the animation's first frame is
 *      committed before the expensive style recalc from --fg fires.
 *      CSS on body has a 180ms transition-delay so text color change
 *      starts ~200ms after the wipe begins.
 *
 *   5. prefers-reduced-motion: instant swap, no animation.
 *
 *   6. Fast-scroll cancellation: in-flight animation cancelled, overlay
 *      reset, new wipe begins immediately.
 */
export function ScrollThemeProvider() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── Overlay element ──────────────────────────────────────────────────────
    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("data-scroll-overlay", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "1",
      pointerEvents: "none",
      //
      // GPU layer promotion — managed dynamically to save iOS VRAM:
      //   will-change is "auto" when resting, and only set to "transform"
      //   during the animation.
      //   translateY(-100%) — initial off-screen position
      //   contain: strict — isolates paint/layout from the rest of the document
      //
      willChange: "auto",
      transform: "translateY(-100%)",
      contain: "strict",
    });
    document.body.appendChild(overlay);

    // ── Internal state ───────────────────────────────────────────────────────
    let activeAnimation: Animation | null = null;
    let committedBgVar: string = THEMES.dark.bgVar;
    let lastScrollY = window.scrollY;

    // ── Instant apply (initial load + prefers-reduced) ───────────────────────
    const commitInstant = (theme: Theme) => {
      const t = THEMES[theme];
      document.documentElement.style.setProperty("--bg", t.bgVar);
      document.documentElement.style.setProperty("--fg", t.fgVar);
      committedBgVar = t.bgVar;
    };

    // ── Animated wipe ────────────────────────────────────────────────────────
    const applyTheme = (theme: Theme) => {
      const t = THEMES[theme];

      if (prefersReduced) {
        commitInstant(theme);
        return;
      }

      // If the theme is already committed and no animation is running, do nothing
      if (t.bgVar === committedBgVar && !activeAnimation) return;

      // ── Determine scroll direction ────────────────────────────────────────
      const scrollY = window.scrollY;
      const goingDown = scrollY >= lastScrollY;
      lastScrollY = scrollY;

      // ── Cancel any in-flight animation ───────────────────────────────────
      if (activeAnimation) {
        activeAnimation.cancel();
        activeAnimation = null;
      }

      // Reset overlay to off-screen
      overlay.style.transform = "translateY(-100%)";

      // ── Defer --fg update by one rAF ──────────────────────────────────────
      //
      // Changing --fg on :root triggers full-document style recalculation.
      // Deferring by one frame ensures the animation's first frame is
      // committed before the expensive recalc fires.
      //
      const fgVar = t.fgVar;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--fg", fgVar);
      });

      // ── Wipe direction via transform ──────────────────────────────────────
      //
      //  Scrolling DOWN → new content rises from below:
      //    start:  translateY(100%)   → overlay starts below viewport
      //    end:    translateY(0%)     → overlay slides up to cover viewport
      //
      //  Scrolling UP → new content drops from above:
      //    start:  translateY(-100%)  → overlay starts above viewport
      //    end:    translateY(0%)     → overlay slides down to cover viewport
      //
      const startTransform = goingDown ? "translateY(100%)" : "translateY(-100%)";
      const endTransform = "translateY(0%)";

      // Set overlay color and starting position
      overlay.style.backgroundColor = t.bgHex;
      overlay.style.transform = startTransform;

      // ── Animate (transform only — guaranteed GPU compositor) ────────────
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
          // 1. Update body --bg to match overlay color (instant, no CSS transition)
          document.documentElement.style.setProperty("--bg", t.bgVar);
          committedBgVar = t.bgVar;
          // 2. Move overlay off-screen — body now shows the committed color,
          //    so there is no visible seam at the handoff
          overlay.style.transform = "translateY(-100%)";
          overlay.style.willChange = "auto";
          activeAnimation = null;
        })
        .catch(() => {
          overlay.style.willChange = "auto";
          // Animation was cancelled by a subsequent theme change — handled by next call
        });
    };

    // ── Set initial theme without animation ──────────────────────────────────
    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    if (sections.length > 0) {
      const firstTheme = (sections[0].getAttribute("data-theme") ?? "dark") as Theme;
      commitInstant(firstTheme);
    }

    // ── IntersectionObserver ─────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        // Pick the section whose center is closest to viewport center
        const centerY = window.innerHeight / 2;
        let best = visible[0];
        let bestDist = Infinity;

        for (const entry of visible) {
          const rect = entry.boundingClientRect;
          const sectionMidY = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(sectionMidY - centerY);
          if (dist < bestDist) {
            bestDist = dist;
            best = entry;
          }
        }

        const theme = (best.target as HTMLElement).dataset.theme as Theme;
        applyTheme(theme);
      },
      {
        rootMargin: ROOT_MARGIN,
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      sections.forEach((s) => observer.unobserve(s));
      observer.disconnect();
      if (activeAnimation) activeAnimation.cancel();
      try {
        document.body.removeChild(overlay);
      } catch {
        // Already removed (strict-mode double-invoke cleanup)
      }
    };
  }, []);

  return null;
}
