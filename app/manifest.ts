import type { MetadataRoute } from "next";

import { seo } from "@/lib/seo";
import { practice } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.siteName,
    short_name: practice.shortName,
    description: seo.description,
    lang: "de-AT",
    start_url: "/",
    display: "browser",
    background_color: "#f6f5f1",
    theme_color: "#f6f5f1",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
