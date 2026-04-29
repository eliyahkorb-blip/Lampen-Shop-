"use client";

import { useMemo, useState } from "react";
import type { Product, WoodId } from "@/lib/products";
import { safetyNotice, warnings, woodOptions } from "@/lib/products";
import { formatEuro } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductDetailClient({ product }: { product: Product }) {
  const [woodId, setWoodId] = useState<WoodId>("eiche");
  const [activeImage, setActiveImage] = useState(0);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const selectedVariant = product.variants[woodId];
  const selectedWood = woodOptions.find((wood) => wood.id === woodId)!;
  const images = selectedVariant.images;

  const imageLabels = useMemo(() => ["Front", "Anschluss", "Im Raum"], []);

  return (
    <div className="product-detail-grid">
      <section className="gallery-card">
        <div className="main-image-wrap">
          {!brokenImages[images[activeImage]] ? (
            <img
              src={images[activeImage]}
              alt={`${product.name} ${selectedWood.name} ${imageLabels[activeImage]}`}
              onError={() => setBrokenImages((state) => ({ ...state, [images[activeImage]]: true }))}
            />
          ) : (
            <div className={`lamp-fallback large ${product.slug}`} aria-hidden="true">
              <span />
            </div>
          )}
        </div>
        <div className="thumbs">
          {images.map((image, index) => (
            <button
              key={image}
              className={index === activeImage ? "active" : ""}
              onClick={() => setActiveImage(index)}
              type="button"
            >
              {imageLabels[index]}
            </button>
          ))}
        </div>
      </section>

      <section className="product-info-card">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="lead">{product.shortDescription}</p>
        <p>{product.description}</p>

        <div className="price-line">
          <span>Ausführung: {selectedWood.name}</span>
          <strong>{formatEuro(selectedVariant.price)}</strong>
        </div>

        <div className="wood-options" aria-label="Holzvariante auswählen">
          {woodOptions.map((wood) => (
            <button
              key={wood.id}
              type="button"
              className={wood.id === woodId ? "selected" : ""}
              onClick={() => {
                setWoodId(wood.id);
                setActiveImage(0);
              }}
            >
              <span className="wood-dot" style={{ background: wood.colorHint }} />
              <span>{wood.shortName}</span>
              {wood.priceAdd > 0 && <small>+{formatEuro(wood.priceAdd)}</small>}
            </button>
          ))}
        </div>
        <p className="wood-description">{selectedWood.description}</p>

        <AddToCartButton product={product} woodId={woodId} />

        <div className="mini-facts">
          <span>{product.dimensions}</span>
          <span>USB-C LED</span>
          <span>5–10 Werktage</span>
        </div>
      </section>

      <section className="detail-panel">
        <h2>Technik & Sicherheit</h2>
        <p>{safetyNotice}</p>
        <div className="spec-grid">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <ul className="warning-list">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
