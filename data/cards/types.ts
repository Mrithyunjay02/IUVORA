export interface CardSocials {
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface CardProfile {
  slug: string;
  name: string;
  title: string;
  photoUrl?: string;
  initials?: string;
  oneLineBio: string;
  phone: string;
  whatsapp: string;
  email: string;
  socials: CardSocials;
  location: string;
  company?: string;
  workUrl?: string;
  borderAccent?: "gold" | "blue" | string;
  theme?: "code" | "design" | "executive";
}
