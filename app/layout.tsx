import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iuvora.com"),
  title: {
    default: "Iuvora — Web, App, Marketing & IT Services",
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
    title: "Iuvora — Web, App, Marketing & IT Services",
    description:
      "Iuvora is your partner for Web, App, Marketing and IT solutions that drive growth.",
    images: [
      {
        url: "https://www.iuvora.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Iuvora — Web, App, Marketing & IT Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iuvora — Web, App, Marketing & IT Services",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Preloader />
        <SmoothScrollProvider>
          {/* Grain texture overlay — fixed, pointer-events none, 3% opacity */}
          <GrainOverlay />
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        {/* Custom spring cursor — desktop only, progressive enhancement */}
        <CustomCursor />
      </body>
    </html>
  );
}
