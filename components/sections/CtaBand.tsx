"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper theme="dark" id="cta-band">
      <div className="container-grid relative">
        {/* Background accent blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            style={{
              width: "60%",
              height: "200%",
              background:
                "radial-gradient(ellipse, rgba(47,123,255,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div ref={ref} className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Ready to build?
          </motion.p>

          <motion.h2
            className="section-headline mb-6"
            style={{ color: "var(--fg)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            Let&apos;s turn your idea
            <br />
            into something real.
          </motion.h2>

          <motion.p
            className="text-lg leading-relaxed mb-10 mx-auto"
            style={{ color: "var(--fg-muted)", maxWidth: "45ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tell us about your project. We&apos;ll respond within one business
            day with a clear next step — no sales runaround.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button href="/contact" size="lg" id="cta-band-primary">
              Start a Project →
            </Button>
            <Button href="mailto:hello@iuvora.com" size="lg" variant="outline" id="cta-band-email">
              Email us directly
            </Button>
          </motion.div>

          {/* Trust badge strip */}
          <motion.div
            className="flex flex-wrap gap-8 justify-center mt-16 pt-8 border-t"
            style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              "Response within 24h",
              "No lock-in contracts",
              "Fixed-price projects available",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span style={{ color: "var(--color-accent)" }}>✓</span>
                <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  {badge}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
