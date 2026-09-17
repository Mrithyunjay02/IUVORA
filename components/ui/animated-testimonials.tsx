"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src?: string;
  initials: string;
  accentColor?: "blue" | "gold";
  projectTag?: string;
  location?: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext, testimonials.length]);

  // Deterministic tilt angle to avoid SSR/hydration mismatch
  const getRotation = (index: number) => {
    const rotations = [-5, 5, -8, 7, -4, 6];
    return rotations[index % rotations.length];
  };

  const current = testimonials[active];
  if (!current) return null;

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto py-8 font-sans antialiased",
        className
      )}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Visual / Monogram 3D Card Stack (Col 1-5 on desktop) */}
        <div className="md:col-span-5 relative w-full flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px]">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => {
                const activeCard = isActive(index);
                const isGold = testimonial.accentColor === "gold";

                return (
                  <motion.div
                    key={testimonial.name}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: getRotation(index),
                      y: 20,
                    }}
                    animate={{
                      opacity: activeCard ? 1 : 0.45,
                      scale: activeCard ? 1 : 0.94,
                      rotate: activeCard ? 0 : getRotation(index),
                      zIndex: activeCard ? 30 : testimonials.length - index,
                      y: activeCard ? 0 : 12,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.88,
                      rotate: getRotation(index) * 1.5,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className={cn(
                      "absolute inset-0 rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300",
                      activeCard
                        ? "border-white/15 shadow-black/80 ring-1 ring-white/10"
                        : "border-white/5 shadow-black/40 pointer-events-none opacity-50"
                    )}
                    style={{
                      backgroundColor: "rgba(18, 18, 20, 0.92)",
                    }}
                  >
                    {/* Background Radial Glow */}
                    <div
                      className={cn(
                        "absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-40",
                        isGold ? "bg-amber-500/25" : "bg-blue-500/25"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

                    {/* Monogram / Profile Card Content */}
                    <div className="relative h-full w-full p-6 sm:p-7 flex flex-col justify-between z-10">
                      {/* Top Bar: Verification Badge & Sector Tag */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-wider text-neutral-300">
                          <CheckCircle2
                            className={cn(
                              "w-3 h-3",
                              isGold ? "text-amber-400" : "text-blue-400"
                            )}
                          />
                          <span>VERIFIED CLIENT</span>
                        </div>
                        {testimonial.location && (
                          <span className="text-[11px] font-mono text-neutral-400 tracking-wide">
                            {testimonial.location}
                          </span>
                        )}
                      </div>

                      {/* Center: Large Initials Monogram Badge */}
                      <div className="flex flex-col items-center justify-center my-auto py-4">
                        <div
                          className={cn(
                            "relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-bold text-2xl sm:text-3xl tracking-widest transition-transform duration-300 group-hover:scale-105",
                            isGold
                              ? "bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20"
                              : "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                          )}
                        >
                          {testimonial.initials}

                          {/* Subtle inner border glow */}
                          <div className="absolute inset-0 rounded-2xl border border-white/25 pointer-events-none" />
                        </div>

                        {testimonial.projectTag && (
                          <p className="mt-4 text-xs font-mono tracking-wider uppercase text-neutral-400">
                            {testimonial.projectTag}
                          </p>
                        )}
                      </div>

                      {/* Bottom Bar: Name watermark & quote icon */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {testimonial.designation}
                          </p>
                        </div>
                        <Quote
                          className={cn(
                            "w-5 h-5 opacity-40",
                            isGold ? "text-amber-400" : "text-blue-400"
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Testimonial Quote & Info (Col 6-12 on desktop) */}
        <div className="md:col-span-7 flex flex-col justify-between py-2 pl-0 md:pl-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {/* Client Name & Designation */}
              <div className="space-y-1 mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {current.name}
                </h3>
                <p className="text-sm sm:text-base font-medium text-neutral-400">
                  {current.designation}
                </p>
              </div>

              {/* Staggered Word-by-Word Quote Reveal */}
              <blockquote className="min-h-[120px] sm:min-h-[100px]">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-300 font-light">
                  &ldquo;
                  {current.quote.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={`${active}-${wordIndex}`}
                      initial={{
                        filter: "blur(8px)",
                        opacity: 0,
                        y: 4,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                        delay: 0.018 * wordIndex,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                  &rdquo;
                </p>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Pagination Indicator */}
          <div className="flex items-center gap-5 pt-8 md:pt-10 border-t border-white/10 mt-6">
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <ArrowLeft className="h-4 w-4 text-neutral-300 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-white" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <ArrowRight className="h-4 w-4 text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
              </button>
            </div>

            {/* Pagination Counter */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-white font-semibold">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-neutral-600">/</span>
              <span>{String(testimonials.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
