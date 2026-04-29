import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop – LumenOak Designlampen",
  description: "Entdecke 3D-gedruckte Tischlampen mit echtem Holzsockel, USB-C LED und warmweißem Licht.",
};

export default function ShopPage() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Die LumenOak Kollektion</h1>
          <p className="lead">
            Wähle dein Design und danach die passende Holzvariante: Eiche, Ahorn, schwarz geölte Eiche oder Nussbaum.
          </p>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
