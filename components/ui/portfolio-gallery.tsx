"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    href: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  pauseOnHover?: boolean;
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title,
  archiveButton,
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const defaultImages = [
    { src: "/case-studies/daynit.webp", alt: "Daynit Enterprises", href: "/work/daynit-enterprises" },
    { src: "/case-studies/shams.webp", alt: "Shams Al Kanari", href: "/work/shams-al-kanari" },
    { src: "/case-studies/mhdevelopers.webp", alt: "MH Developers", href: "/work/mh-developers" },
    { src: "/case-studies/fitforce.webp", alt: "FitForce", href: "/work/fitforce" },
    { src: "/case-studies/style-dance-crew.webp", alt: "Style Dance Crew Studio", href: "/work/style-dance-crew" },
  ]
  
  const images = customImages || defaultImages

  return (
    <section
      aria-label={title || "Portfolio Gallery"}
      className={`relative py-12 lg:py-20 px-4 ${className}`}
      id="portfolio-teaser"
    >
      <div className="max-w-[100vw] overflow-hidden">
        {title && (
          <div className="relative z-10 text-center pt-8 pb-8 px-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 text-balance">{title}</h2>
            {archiveButton && (
              <Link
                href={archiveButton.href}
                className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors group mb-20"
              >
                <span>{archiveButton.text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}

        {/* Desktop 3D Stack */}
        <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[120px] mt-10">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {images.map((image, index) => {
              const totalImages = images.length
              const middle = Math.floor(totalImages / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 20

              const zIndex = totalImages - index

              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ zIndex: zIndex }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Link href={image.href} className="block relative aspect-video w-64 md:w-80 lg:w-[480px] rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover object-left-top border border-white/10 dark:border-white/10 rounded-2xl"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile Marquee */}
        <div className="block md:hidden relative pb-8 mt-10">
          <div
            className={cn(
              "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
              "flex-row"
            )}
          >
            {Array(marqueeRepeat)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)]",
                    "animate-marquee-horizontal flex-row",
                    { "group-hover:[animation-play-state:paused]": pauseOnHover }
                  )}
                >
                  {images.map((image, index) => (
                    <Link
                      key={`${i}-${index}`}
                      href={image.href}
                      className="group cursor-pointer flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <div
                        className="relative aspect-video w-72 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105"
                        style={{
                          boxShadow: `
                            rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                            rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                            rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                            rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                          `,
                        }}
                      >
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full object-cover object-left-top border border-white/10 dark:border-white/10 rounded-xl"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Mobile tap indicator */}
                        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-medium text-white border border-white/20">
                          View Project
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
