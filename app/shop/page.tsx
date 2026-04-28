import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Alle 3D-gedruckten Designlampen mit Eichenbasis kaufen.",
};

export default function ShopPage() {
  const collections = Array.from(new Set(products.map((product) => product.collection)));
  return (
    <section className="container">
      <div className="page-title">
        <span className="eyebrow">Shop</span>
        <h1>Alle Lampen</h1>
        <p className="lead">Wähle dein Modell: organische Waveform, lochige Lichtstruktur, kantiger Look oder ruhiger Dome-Glow.</p>
      </div>
      <div className="shop-filters" aria-label="Kollektionen">
        <span className="filter-chip">Alle</span>
        {collections.map((collection) => <span className="filter-chip" key={collection}>{collection}</span>)}
      </div>
      <div className="grid products-grid" style={{ paddingBottom: 72 }}>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
