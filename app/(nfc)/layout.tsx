import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import "../globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070709",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iuvora.com"),
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
};

export default function NfcRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${libreBaskerville.variable} ${montserrat.variable}`}>
      <body className="bg-[#070709] text-[#FBF7EE] antialiased min-h-screen overflow-x-hidden selection:bg-[#2563eb] selection:text-white">
        {children}
      </body>
    </html>
  );
}
