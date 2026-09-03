import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Iuvora - tell us about your goals and we'll respond within one business day.",
  openGraph: {
    title: "Contact | Iuvora",
    description:
      "Start a project with Iuvora. Respond within 24 hours, no-fluff process.",
    url: "https://www.iuvora.com/contact",
  },
  alternates: {
    canonical: "https://www.iuvora.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
