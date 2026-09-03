import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.slug === "digital-marketing")!;

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "A–Z digital marketing: SEO, paid ads, social media, content, branding, and email - strategy through execution.",
  openGraph: {
    title: "Digital Marketing | Iuvora",
    description:
      "Full-funnel growth marketing - SEO, paid ads, social, content, and branding.",
    url: "https://www.iuvora.com/services/digital-marketing",
  },
  alternates: {
    canonical: "https://www.iuvora.com/services/digital-marketing",
  },
};

export default function DigitalMarketingPage() {
  return <ServicePageTemplate service={service} />;
}
