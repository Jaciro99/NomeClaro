import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/names";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/"
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl
  };
}