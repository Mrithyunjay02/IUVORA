import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.iuvora.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/card/", "/card/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

