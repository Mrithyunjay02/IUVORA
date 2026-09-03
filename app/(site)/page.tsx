import type { Metadata } from "next";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { WhyIuvora } from "@/components/sections/WhyIuvora";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Iuvora - Web, App, Marketing & IT Services",
  description:
    "Iuvora is your partner for Web, App, Marketing and IT solutions that drive growth.",
  openGraph: {
    title: "Iuvora - Web, App, Marketing & IT Services",
    description:
      "Iuvora is your partner for Web, App, Marketing and IT solutions that drive growth.",
    url: "https://www.iuvora.com",
    siteName: "Iuvora",
    images: [
      {
        url: "https://www.iuvora.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Iuvora - Web, App, Marketing & IT Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iuvora - Web, App, Marketing & IT Services",
    description:
      "Iuvora is your partner for Web, App, Marketing and IT solutions that drive growth.",
    images: ["https://www.iuvora.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.iuvora.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* IntersectionObserver scroll-invert engine */}
      <ScrollThemeProvider />

      {/* Section sequence - alternates dark → light → dark → light → dark → light → dark */}
      <Hero />
      <ServicesOverview />
      {/* 9.2 - Capabilities word marquee: not part of the invert cycle, 
          always-dark divider strip between light services and dark process */}
      <Marquee />
      <Process />
      <CaseStudies />
      <WhyIuvora />
      <Testimonials />
      <CtaBand />
    </>
  );
}
