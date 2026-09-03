import { CardProfile } from "./types";
import { mjProfile } from "./mj";

const cardProfiles: Record<string, CardProfile> = {
  [mjProfile.slug]: mjProfile,
};

export function getCardProfile(slug: string): CardProfile | null {
  if (!slug) return null;
  const normalizedSlug = slug.toLowerCase().trim();
  return cardProfiles[normalizedSlug] || null;
}

export function getAllCardSlugs(): string[] {
  return Object.keys(cardProfiles);
}

export * from "./types";
