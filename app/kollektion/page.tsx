import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = { title: "Kollektion – LumenOak" };

export default function KollektionPage() {
  return (
    <section className="section">
      <p className="eyebrow">Kollektion</p>
      <h1>Lampen für warme Räume.</h1>
      <p className="lead">Alle LumenOak Designs mit 3D-gedrucktem Schirm, USB-C LED und echtem Holzsockel.</p>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
