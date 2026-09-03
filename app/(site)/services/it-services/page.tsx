import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

const service = SERVICES.find((s) => s.slug === "it-services")!;

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "Managed IT support, cloud infrastructure, DevOps, cybersecurity, and helpdesk — reliable infrastructure so your team can focus.",
  openGraph: {
    title: "IT Services | Iuvora",
    description:
      "Reliable cloud infrastructure and managed IT support with zero downtime.",
    url: "https://www.iuvora.com/services/it-services",
  },
  alternates: {
    canonical: "https://www.iuvora.com/services/it-services",
  },
};

export default function ITServicesPage() {
  return <ServicePageTemplate service={service} />;
}
