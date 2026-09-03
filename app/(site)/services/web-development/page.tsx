import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.slug === "web-development")!;

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Custom websites, web apps, and e-commerce - built for performance, accessibility, and long-term growth.",
  openGraph: {
    title: "Web Development | Iuvora",
    description:
      "From marketing sites to complex web apps - we design and build with performance and conversion at the core.",
    url: "https://www.iuvora.com/services/web-development",
  },
  alternates: {
    canonical: "https://www.iuvora.com/services/web-development",
  },
};

export default function WebDevelopmentPage() {
  return <ServicePageTemplate service={service} />;
}
