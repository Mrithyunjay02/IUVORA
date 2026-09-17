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
    title: `${profile.name} - Digital Visiting Card | Iuvora`,
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
      title: `${profile.name} - ${profile.title}`,
      description: profile.oneLineBio || "Digital Visiting Card by Iuvora",
      siteName: "Iuvora Digital Card",
    },
  };
}

import { InteractiveProductCard } from "@/components/ui/card-7";
import { Palette } from "lucide-react";

export default async function CardPage({ params }: CardPageProps) {
  const { slug } = await params;
  const profile = getCardProfile(slug);

  if (!profile) {
    notFound();
  }

  if (slug === "nitish") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] p-4 selection:bg-[#2563eb] selection:text-white">
        <InteractiveProductCard
          title="Nitish"
          description="Web Designer · Iuvora"
          price="Shimoga, KA"
          imageUrl="/cards/nitish-card-bg.jpeg"
          logoIcon={<Palette className="w-5 h-5" />}
          email="nitishjogiwork@gmail.com"
          linkedin="https://www.linkedin.com/in/nitishjogi"
        />
      </div>
    );
  }

  return <CardContainer profile={profile} />;
}
