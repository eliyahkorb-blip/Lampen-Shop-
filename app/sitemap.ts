import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/warenkorb", "/kontakt", "/versand", "/widerruf", "/impressum", "/datenschutz", "/agb"].map((path) => ({
    url: `${shopConfig.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${shopConfig.siteUrl}/produkt/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
