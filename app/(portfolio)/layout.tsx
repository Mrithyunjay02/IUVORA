import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";

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
    var savedTheme = localStorage.getItem('iuvora_theme') || localStorage.getItem('iuvora_site_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.style.setProperty('--bg', '#ffffff');
      document.documentElement.style.setProperty('--fg', '#0a0a0a');
      document.documentElement.style.setProperty('--fg-muted', '#52525b');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.style.setProperty('--bg', '#0a0a0a');
      document.documentElement.style.setProperty('--fg', '#fafafa');
      document.documentElement.style.setProperty('--fg-muted', '#6b6b6b');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`.trim();

export default function PortfolioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[var(--bg)] text-[var(--fg)] selection:bg-[#2563eb] selection:text-white" suppressHydrationWarning>
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
