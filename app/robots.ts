import type { MetadataRoute } from "next";
import { shopConfig } from "@/lib/shop-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${shopConfig.siteUrl}/sitemap.xml`,
  };
}
