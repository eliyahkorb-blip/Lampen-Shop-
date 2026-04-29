"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { formatEuro } from "@/lib/format";
import { shopConfig } from "@/lib/shop-config";

export function CartClient() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [message, setMessage] = useState("");
  const shipping = subtotal >= shopConfig.freeShippingFrom || subtotal === 0 ? 0 : shopConfig.shippingCost;
  const total = subtotal + shipping;

  async function startCheckout() {
    setMessage("Stripe ist vorbereitet, aber echte Zahlungsabwicklung muss mit Live-Keys aktiviert werden.");
  }

  if (items.length === 0) {
    return (
      <section className="section narrow cart-empty">
        <h1>Dein Warenkorb ist leer.</h1>
        <p>Entdecke die LumenOak Kollektion und wähle deine Holzvariante.</p>
        <Link href="/shop" className="primary-button">Zur Kollektion</Link>
      </section>
    );
  }

  return (
    <section className="section cart-page">
      <div>
        <p className="eyebrow">Warenkorb</p>
        <h1>Deine Auswahl</h1>
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={`${item.productName} ${item.woodName}`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div>
                <h3>{item.productName}</h3>
                <p>{item.woodName}</p>
                <p>{formatEuro(item.price)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} type="button">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} type="button">+</button>
              </div>
              <button className="remove-button" onClick={() => removeItem(item.id)} type="button">Entfernen</button>
            </article>
          ))}
        </div>
      </div>
      <aside className="cart-summary">
        <h2>Zusammenfassung</h2>
        <p><span>Zwischensumme</span><strong>{formatEuro(subtotal)}</strong></p>
        <p><span>Versand</span><strong>{shipping === 0 ? "kostenlos" : formatEuro(shipping)}</strong></p>
        <p className="summary-total"><span>Gesamt</span><strong>{formatEuro(total)}</strong></p>
        <small>Versandkosten klar vor Bestellung. Preise inkl. MwSt. bzw. Kleinunternehmerhinweis später rechtlich finalisieren.</small>
        <button className="primary-button full" onClick={startCheckout}>Zur Kasse</button>
        <button className="secondary-button full" onClick={clearCart}>Warenkorb leeren</button>
        {message && <p className="notice">{message}</p>}
      </aside>
    </section>
  );
}
