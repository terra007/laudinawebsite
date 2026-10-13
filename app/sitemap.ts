import type { MetadataRoute } from "next";

import { practice } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: practice.url, changeFrequency: "monthly", priority: 1 },
    { url: `${practice.url}/impressum`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
