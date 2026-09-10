"use client";

import { useEffect, useRef, Suspense } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
  
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Safeguard: Refresh ScrollTrigger if the body height changes (e.g., late image load).
    // Debounced to prevent thrashing during fast layout recalculations.
    let resizeTimer: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });
    
    resizeObserver.observe(document.body);
  
    return () => {
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, syncTouch: true }} autoRaf={false} ref={lenisRef}>
      <Suspense fallback={null}>
        <RouteScrollReset />
      </Suspense>
      {children}
    </ReactLenis>
  );
}

function RouteScrollReset() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      lenis.scrollTo(0, { immediate: true });
      return () => {
        lenis.off("scroll", ScrollTrigger.update);
      };
    }
  }, [pathname, searchParams, lenis]);

  return null;
}
