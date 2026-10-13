import type { MetadataRoute } from "next";

import { practice } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${practice.url}/sitemap.xml`,
  };
}
