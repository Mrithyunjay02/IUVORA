import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.slug === "app-development")!;

export const metadata: Metadata = {
  title: "App Development",
  description:
    "iOS and Android applications built for speed and usability — from MVP to full-scale product.",
  openGraph: {
    title: "App Development | Iuvora",
    description:
      "Native-quality apps with cross-platform reach. From MVP to full-scale product.",
    url: "https://iuvora.com/services/app-development",
  },
};

export default function AppDevelopmentPage() {
  return <ServicePageTemplate service={service} />;
}
