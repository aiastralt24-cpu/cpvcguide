import type { MetadataRoute } from "next";
import { buildAbsoluteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/analytics"],
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
  };
}
