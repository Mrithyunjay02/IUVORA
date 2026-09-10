import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import { CardThemeProvider } from "@/components/card/CardThemeProvider";
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
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070709" },
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
  ],
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

// Inline FOUC-prevention script: runs synchronously before first paint,
// reads localStorage and applies .dark / .light class to <html>.
const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem('iuvora_card_theme');
    if (s === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch(e) {}
})();
`.trim();

export default function NfcRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${libreBaskerville.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* FOUC prevention: must run before paint */}
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="antialiased min-h-screen overflow-x-hidden selection:bg-[#2563eb] selection:text-white
          bg-[#070709] text-[#FBF7EE]
          dark:bg-[#070709] dark:text-[#FBF7EE]
          light:bg-[#F5F4F0] light:text-[#111111]"
        suppressHydrationWarning
      >
        <CardThemeProvider>{children}</CardThemeProvider>
      </body>
    </html>
  );
}
