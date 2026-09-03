import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCardProfile, getAllCardSlugs } from "@/data/cards";
import { CardContainer } from "@/components/card/CardContainer";

interface CardPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllCardSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCardProfile(slug);

  if (!profile) {
    return {
      title: "Card Not Found | Iuvora",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${profile.name} — Digital Visiting Card | Iuvora`,
    description: `${profile.name} • ${profile.title}. Contact details and vCard.`,
    // Strict privacy: no search engine indexation or caching
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        "max-video-preview": -1,
        "max-image-preview": "none",
        "max-snippet": -1,
      },
    },
    // OpenGraph still enabled for clean private preview cards when sharing link directly via chat
    openGraph: {
      title: `${profile.name} — ${profile.title}`,
      description: profile.oneLineBio || "Digital Visiting Card by Iuvora",
      siteName: "Iuvora Digital Card",
    },
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const { slug } = await params;
  const profile = getCardProfile(slug);

  if (!profile) {
    notFound();
  }

  return <CardContainer profile={profile} />;
}
