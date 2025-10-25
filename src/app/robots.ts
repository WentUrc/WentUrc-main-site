import type { MetadataRoute } from "next";

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  return "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
        `${baseUrl}/sitemap.xml`,
        "https://blog.IGCrystal.icu/sitemap.xml",
        "https://IGCrystal.icu/sitemap.xml",
    ],
  };
}
