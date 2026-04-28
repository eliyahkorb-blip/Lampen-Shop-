import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatMoney } from "@/lib/format";
import { getProductBySlug, products } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} kaufen`,
      description: product.description,
      url: `${shopConfig.siteUrl}/produkt/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: shopConfig.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.priceCents / 100).toFixed(2),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${shopConfig.siteUrl}/produkt/${product.slug}`,
    },
  };

  return (
    <section className="container product-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="product-visual" style={{ "--lamp-gradient": product.gradient } as CSSProperties}>
        {product.isBestseller && <span className="badge">Bestseller</span>}
      </div>
      <aside className="product-panel">
        <Link href="/shop" style={{ color: "var(--muted)", fontWeight: 800 }}>← Zurück zum Shop</Link>
        <h1>{product.name}</h1>
        <p className="lead">{product.longDescription}</p>
        <div className="price" style={{ fontSize: "2rem", marginTop: 18 }}>
          {formatMoney(product.priceCents)}
          {product.compareAtCents && <span className="compare">{formatMoney(product.compareAtCents)}</span>}
        </div>
        <p style={{ color: "var(--muted)" }}>inkl. gesetzlicher MwSt. zzgl. Versand. Fertigung: {shopConfig.productionTime}.</p>
        <AddToCartButton productId={product.id} />
        <div className="spec-list">
          <div className="spec-row"><span>Maße</span><strong>{product.dimensions}</strong></div>
          <div className="spec-row"><span>Material</span><strong>{product.material}</strong></div>
          <div className="spec-row"><span>Licht</span><strong>{product.light}</strong></div>
          <div className="spec-row"><span>Energie</span><strong>{product.energy}</strong></div>
          <div className="spec-row"><span>Basis</span><strong>{product.base}</strong></div>
        </div>
        <div className="feature-list">
          {product.features.map((feature) => <div key={feature}>{feature}</div>)}
        </div>
      </aside>
    </section>
  );
}
