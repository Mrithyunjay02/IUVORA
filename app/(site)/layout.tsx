import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iuvora.com"),
  title: {
    default: "Iuvora - Web, App, Marketing & IT Services",
    template: "%s | Iuvora",
  },
  description:
    "Iuvora is your partner for Web, App, Marketing and IT solutions that drive growth.",
  keywords: [
    "web development",
    "app development",
    "digital marketing",
    "IT services",
    "cloud infrastructure",
    "cybersecurity",
    "UI/UX design",
    "SEO",
    "Next.js",
    "React",
    "Iuvora",
  ],
  authors: [{ name: "Iuvora", url: "https://www.iuvora.com" }],
  creator: "Iuvora",
  publisher: "Iuvora",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.iuvora.com",
    siteName: "Iuvora",
    title: "Iuvora - Web, App, Marketing & IT Services",
    description:
      "Iuvora is your partner for Web, App, Marketing and IT solutions that drive growth.",
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
    creator: "@iuvora",
  },
  alternates: {
    canonical: "https://www.iuvora.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#2563eb] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-sm font-semibold"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
