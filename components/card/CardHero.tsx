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
            <div className="w-16 h-16 rounded-xl overflow-hidden border dark:border-white/10 light:border-black/10 dark:bg-[#16161B] light:bg-[#E8E6E1]">
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
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center select-none shadow-inner
                dark:bg-[#16161B] light:bg-[#E8E6E1]
                ${isGold
                  ? "border dark:border-[#d9b266]/40 light:border-[#b48c3c]/40 dark:shadow-[0_0_18px_rgba(217,178,102,0.12)] light:shadow-[0_0_18px_rgba(180,140,60,0.08)]"
                  : "border dark:border-white/10 light:border-black/10"
                }`}
            >
              <span
                className={`text-[18px] font-bold tracking-wider ${isGold ? "dark:text-[#F5E6C8] light:text-[#8A6A20]" : "dark:text-zinc-200 light:text-zinc-700"}`}
                style={{ fontFamily: "var(--font-baskerville), Georgia, serif" }}
              >
                {profile.initials || profile.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Name and Role Cluster */}
        <div className="min-w-0">
          {/* Name in Baskerville (serif) */}
          <h1
            className="text-[23px] sm:text-[25px] font-bold tracking-tight leading-[1.15] dark:text-[#FBF7EE] light:text-[#111111]"
            style={{ fontFamily: "var(--font-baskerville), Georgia, serif" }}
          >
            {profile.name}
          </h1>

          {/* Title in Montserrat */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[12.5px] dark:text-zinc-400 light:text-zinc-500 font-medium">
            <span>{mainTitle}</span>
            {coFounderPart ? (
              <>
                <span className="dark:text-zinc-600 light:text-zinc-400">·</span>
                <a
                  href="https://www.iuvora.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="card-chip-iuvora"
                  className="dark:text-zinc-300 light:text-zinc-600 hover:underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-white/30 light:focus-visible:ring-black/20 rounded dark:hover:text-white light:hover:text-black"
                >
                  {coFounderPart}
                </a>
              </>
            ) : profile.company ? (
              <>
                <span className="dark:text-zinc-600 light:text-zinc-400">·</span>
                <a
                  href={profile.workUrl || "https://www.iuvora.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="card-chip-iuvora"
                  className="dark:text-zinc-300 light:text-zinc-600 hover:underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-white/30 light:focus-visible:ring-black/20 rounded dark:hover:text-white light:hover:text-black"
                >
                  {profile.company}
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Location + Human Bio ── */}
      <div className="space-y-2 text-[13px]">
        {profile.location && (
          <div className="flex items-center gap-1.5 dark:text-zinc-500 light:text-zinc-400 text-xs font-normal">
            <svg className="w-3.5 h-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{profile.location}</span>
          </div>
        )}

        {profile.oneLineBio && (
          <p className="dark:text-zinc-300 light:text-zinc-600 leading-relaxed font-normal">
            {profile.oneLineBio}
          </p>
        )}

        {/* Featured Work Link */}
        {profile.workUrl && (
          <div className="pt-1">
            <a
              href={profile.workUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="card-link-work"
              className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium dark:text-zinc-400 light:text-zinc-500 dark:hover:text-[#FBF7EE] light:hover:text-[#111111] transition-colors focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-white/30 light:focus-visible:ring-black/20 rounded"
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
