"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { products, type Product } from "@/lib/products";
import { formatMoney } from "@/lib/format";
import { shopConfig } from "@/lib/shop-config";

export function CartClient() {
  const { items, updateQuantity, removeItem, subtotalCents, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((item): item is { product: Product; quantity: number } => Boolean(item)),
    [items],
  );

  const shippingCents = subtotalCents >= shopConfig.shipping.freeFromCents || subtotalCents === 0 ? 0 : shopConfig.shipping.standardCents;
  const totalCents = subtotalCents + shippingCents;

  async function checkout() {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Checkout konnte nicht gestartet werden.");
      clearCart();
      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unbekannter Checkout-Fehler.");
    } finally {
      setIsLoading(false);
    }
  }

  if (detailedItems.length === 0) {
    return (
      <div className="info-card">
        <h2>Dein Warenkorb ist leer.</h2>
        <p>Such dir eine Lampe aus und leg sie in den Warenkorb.</p>
        <Link href="/shop" className="btn btn-primary">Zum Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div>
        {detailedItems.map(({ product, quantity }) => (
          <article className="cart-item" key={product.id}>
            <div className="cart-thumb" style={{ "--lamp-gradient": product.gradient } as CSSProperties} />
            <div>
              <strong>{product.name}</strong>
              <p style={{ color: "var(--muted)", margin: "6px 0" }}>{product.subtitle}</p>
              <div className="qty">
                <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Menge verringern">−</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Menge erhöhen">+</button>
                <button className="remove-btn" onClick={() => removeItem(product.id)}>Entfernen</button>
              </div>
            </div>
            <div className="price">{formatMoney(product.priceCents * quantity)}</div>
          </article>
        ))}
      </div>
      <aside className="summary">
        <h2>Zusammenfassung</h2>
        <div className="summary-row"><span>Zwischensumme</span><strong>{formatMoney(subtotalCents)}</strong></div>
        <div className="summary-row"><span>Versand</span><strong>{shippingCents === 0 ? "Kostenlos" : formatMoney(shippingCents)}</strong></div>
        <div className="summary-row"><span>Steuern</span><strong>im Checkout berechnet</strong></div>
        <div className="summary-row total"><span>Gesamt</span><strong>{formatMoney(totalCents)}</strong></div>
        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>Sichere Zahlung über Stripe. Versandadresse und finale Steuer-/Zahlungsdaten werden im Checkout erfasst.</p>
        {error && <p className="notice" style={{ color: "var(--danger)" }}>{error}</p>}
        <button className="btn btn-primary btn-full" onClick={checkout} disabled={isLoading}>
          {isLoading ? "Checkout startet..." : "Sicher bezahlen"}
        </button>
        <Link className="btn btn-secondary btn-full" href="/shop" style={{ marginTop: 10 }}>Weiter einkaufen</Link>
      </aside>
    </div>
  );
}
