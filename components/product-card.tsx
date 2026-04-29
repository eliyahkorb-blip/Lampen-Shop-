"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatEuro } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const [imageBroken, setImageBroken] = useState(false);
  const image = product.variants.eiche.images[0];

  return (
    <article className="product-card">
      <Link href={`/produkt/${product.slug}`} className="product-image-wrap">
        {!imageBroken ? (
          <img src={image} alt={`${product.name} in Eiche`} onError={() => setImageBroken(true)} />
        ) : (
          <div className={`lamp-fallback ${product.slug}`} aria-hidden="true">
            <span />
          </div>
        )}
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="product-card-bottom">
          <strong>ab {formatEuro(product.basePrice)}</strong>
          <Link href={`/produkt/${product.slug}`} className="text-link">Ansehen</Link>
        </div>
      </div>
    </article>
  );
}
