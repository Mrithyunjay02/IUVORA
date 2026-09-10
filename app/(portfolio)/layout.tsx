import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iuvora.com"),
  title: {
    default: "Iuvora | Selected Works & Portfolio",
    template: "%s | Iuvora",
  },
  description:
    "Explore featured case studies and production web platforms engineered by Iuvora. Standalone showcase archive.",
  keywords: [
    "Iuvora",
    "Portfolio",
    "Selected Works",
    "Web Development",
    "App Development",
    "Daynit Enterprises",
    "Shams Al Kanari",
    "MH Developers",
    "FitForce",
    "Style Dance Crew Studio",
  ],
  authors: [{ name: "Iuvora", url: "https://www.iuvora.com" }],
  openGraph: {
    title: "Iuvora | Selected Works & Portfolio",
    description:
      "A curated archive of web applications, luxury brand platforms, and digital systems built by Iuvora.",
    url: "https://www.iuvora.com/work",
    siteName: "Iuvora Portfolio",
    locale: "en_US",
    type: "website",
  },
};

const themeInitScript = `
(function() {
  try {
    var savedTheme = localStorage.getItem('iuvora_theme');
    var isDark = savedTheme ? savedTheme === 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function PortfolioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#0c0d12] text-zinc-900 dark:text-white selection:bg-[#2563eb] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#3b82f6] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold uppercase tracking-wider"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
