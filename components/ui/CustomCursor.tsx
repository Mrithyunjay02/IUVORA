"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HOVER = "a, button, [data-cursor-hover], .card-border, label, input, textarea, select";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only apply on fine pointers (skip on touch devices)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.style.cursor = "none";

    // Set initial state via GSAP
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 1 });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to(el, { autoAlpha: 1, duration: 0.15 });
        visible = true;
      }
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out", overwrite: "auto" });
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER)) {
        el.classList.add("cursor--hover");
        gsap.to(el, { scale: 2.5, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER)) {
        el.classList.remove("cursor--hover");
        gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
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
  }, { scope: ref });

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
        // Visibility is entirely controlled by GSAP
        visibility: "hidden",
        // Transition ONLY visual properties (bg, border)
        transition: "background-color 250ms ease, border 250ms ease",
        willChange: "transform",
      }}
    />
  );
}
