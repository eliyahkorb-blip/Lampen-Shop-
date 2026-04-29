import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = shopConfig.domain;
  return [
    "",
    "/shop",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf",
    "/versand",
    ...products.map((product) => `/produkt/${product.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
