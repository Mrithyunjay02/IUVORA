"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface CaseStudyGalleryProps {
  images: string[];
  title: string;
  isPrototype?: boolean;
}

export default function CaseStudyGallery({
  images,
  title,
  isPrototype = false,
}: CaseStudyGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const nextImage = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  }, [selectedIdx, images.length]);

  const prevImage = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  }, [selectedIdx, images.length]);

  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIdx, closeLightbox, nextImage, prevImage]);

  return (
    <div className="space-y-8">
      {/* Editorial Gallery Grid */}
      <div className="grid grid-cols-1 gap-10">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-3xl bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 hover:border-[#3b82f6]/40 dark:hover:border-[#60a5fa]/40 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-2xl transition-all duration-500 cursor-zoom-in"
          >
            {isPrototype ? (
              <div className="relative w-full py-16 sm:py-24 px-4 bg-[#f5f6fa] dark:bg-[#050507] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                <div className="absolute w-96 h-96 bg-[#3b82f6]/10 dark:bg-[#60a5fa]/15 rounded-full blur-[100px] pointer-events-none" />

                {/* Smartphone Mockup */}
                <div className="relative z-10 w-[240px] sm:w-[280px] rounded-[36px] p-2.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-white/20 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="relative w-full aspect-[285/611] rounded-[28px] overflow-hidden bg-black">
                    <Image
                      src={src}
                      alt={`${title} visual view ${idx + 1}`}
                      fill
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-[16/10] bg-[#f5f6fa] dark:bg-[#050507] overflow-hidden">
                <Image
                  src={src}
                  alt={`${title} visual view ${idx + 1}`}
                  fill
                  sizes="(max-width: 1360px) 100vw, 1360px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Hover Expand Cue */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 dark:bg-[#14151e]/80 backdrop-blur-md border border-black/10 dark:border-white/15 text-xs font-medium text-zinc-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <Maximize2 className="w-3.5 h-3.5 text-[#3b82f6] dark:text-[#93c5fd]" />
              <span>Fullscreen Preview</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 dark:bg-[#0c0d12]/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Top Bar Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
            <div className="text-xs font-semibold text-zinc-400">
              {title} {images.length > 1 && `· [${selectedIdx + 1} / ${images.length}]`}
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container */}
          <div className="relative w-full max-w-6xl max-h-[82vh] flex items-center justify-center p-2">
            <div className="relative w-full h-[75vh] max-h-[800px]">
              <Image
                src={images[selectedIdx]}
                alt={`${title} preview enlarged`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Navigation Controls (when multiple images exist) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Keyboard hint bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-medium text-zinc-500 tracking-wide hidden sm:block">
            Press ESC to exit {images.length > 1 ? "· ← / → to navigate" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
