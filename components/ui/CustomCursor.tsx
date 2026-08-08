"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — zero-lag position tracking
 *
 * Position is written directly in the mousemove handler using
 * transform: translate3d(). No lerp, no spring, no rAF loop for position.
 *
 * mousemove events fire at most once per frame when the listener is
 * {passive: true}, so writing transform directly in the handler is
 * frame-perfect with zero perceptible delay.
 *
 * The hover scale/ring transition is kept as a CSS transition on the
 * element — only POSITION tracking is instant.
 */

const HOVER = "a, button, [data-cursor-hover], .card-border, label, input, textarea, select";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!canHover) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.style.cursor = "none";

    let hovered = false;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        el.style.opacity = "1";
        visible = true;
      }
      // Raw position — zero lag, zero interpolation
      // Scale is baked in so we don't need a separate rAF loop
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${hovered ? 2.5 : 1})`;
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER)) {
        hovered = true;
        el.classList.add("cursor--hover");
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER)) {
        hovered = false;
        el.classList.remove("cursor--hover");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      id="custom-cursor"
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "var(--color-accent)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        // Transition ONLY visual properties (scale, bg, border) — NOT position
        // transform is set directly in mousemove so CSS must not transition it
        transition:
          "opacity 150ms ease, background-color 250ms ease, border 250ms ease",
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)",
        willChange: "transform",
      }}
    />
  );
}
