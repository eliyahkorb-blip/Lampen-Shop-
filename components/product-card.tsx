import Link from "next/link";
import type { CSSProperties } from "react";
import { Product } from "@/lib/products";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/produkt/${product.slug}`} className="product-visual" style={{ "--lamp-gradient": product.gradient } as CSSProperties}>
        {product.isBestseller && <span className="badge">Bestseller</span>}
      </Link>
      <div className="product-body">
        <h3><Link href={`/produkt/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.description}</p>
        <div className="product-meta">
          <div className="price">
            {formatMoney(product.priceCents)}
            {product.compareAtCents && <span className="compare">{formatMoney(product.compareAtCents)}</span>}
          </div>
          <Link className="btn btn-secondary" href={`/produkt/${product.slug}`}>Ansehen</Link>
        </div>
      </div>
    </article>
  );
}
