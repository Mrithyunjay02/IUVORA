"use client";

import { useState } from "react";
import Image from "next/image";
import { CardProfile } from "@/data/cards/types";

interface CardHeroProps {
  profile: CardProfile;
}

/**
 * CardHero
 *
 * TYPOGRAPHY:
 * - Name: Libre Baskerville (serif) - carries the primary visual weight with classical authority.
 * - Title, location, bio, links: Montserrat (clean geometric sans).
 *
 * COLOR:
 * - Strictly neutral monochrome (zinc / off-white #FBF7EE).
 * - Zero gold/yellow.
 */
export function CardHero({ profile }: CardHeroProps) {
  const [imageError, setImageError] = useState(false);
  const hasPhoto = profile.photoUrl && !imageError;

  // Split title into role + co-founder
  const titleParts = profile.title.split("&").map((s) => s.trim());
  const mainTitle = titleParts[0] || profile.title;
  const coFounderPart = titleParts.length > 1 ? titleParts[1] : null;

  const isGold = profile.borderAccent === "gold";

  return (
    <div className="space-y-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      {/* ── Header: Avatar + Typography ── */}
      <div className="flex items-center gap-4">
        {/* Avatar: varied radius (rounded-xl / 12px) */}
        <div className="shrink-0">
          {hasPhoto ? (
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-[#16161B]">
              <Image
                src={profile.photoUrl!}
                alt={profile.name}
                width={64}
                height={64}
                priority
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            /* Neutral cardstock placeholder block with classical serif monogram */
            <div className={`w-16 h-16 rounded-xl bg-[#16161B] ${isGold ? "border border-[#d9b266]/40 shadow-[0_0_18px_rgba(217,178,102,0.12)]" : "border border-white/10"} flex items-center justify-center select-none shadow-inner`}>
              <span
                className={`text-[18px] font-bold tracking-wider ${isGold ? "text-[#F5E6C8]" : "text-zinc-200"}`}
                style={{ fontFamily: "var(--font-baskerville), Georgia, serif" }}
              >
                {profile.initials || profile.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Name and Role Cluster */}
        <div className="min-w-0">
          {/* Name in Baskerville (serif) - carrying primary visual weight */}
          <h1
            className="text-[23px] sm:text-[25px] font-bold tracking-tight text-[#FBF7EE] leading-[1.15]"
            style={{ fontFamily: "var(--font-baskerville), Georgia, serif" }}
          >
            {profile.name}
          </h1>

          {/* Title in Montserrat (sans-serif) */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[12.5px] text-zinc-400 font-medium">
            <span>{mainTitle}</span>
            {coFounderPart ? (
              <>
                <span className="text-zinc-600">·</span>
                <a
                  href="https://www.iuvora.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="card-chip-iuvora"
                  className="text-zinc-300 hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
                >
                  {coFounderPart}
                </a>
              </>
            ) : profile.company ? (
              <>
                <span className="text-zinc-600">·</span>
                <a
                  href={profile.workUrl || "https://www.iuvora.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="card-chip-iuvora"
                  className="text-zinc-300 hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
                >
                  {profile.company}
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Location + Human Bio (Montserrat) ── */}
      <div className="space-y-2 text-[13px]">
        {profile.location && (
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-normal">
            <svg className="w-3.5 h-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{profile.location}</span>
          </div>
        )}

        {profile.oneLineBio && (
          <p className="text-zinc-300 leading-relaxed font-normal">
            {profile.oneLineBio}
          </p>
        )}

        {/* Featured Work Link (Montserrat, neutral hover) - omitted if no workUrl provided */}
        {profile.workUrl && (
          <div className="pt-1">
            <a
              href={profile.workUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="card-link-work"
              className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-400 hover:text-[#FBF7EE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            >
              <span>View my work</span>
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
