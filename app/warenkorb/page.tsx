import type { Metadata } from "next";
import { CartClient } from "@/components/cart-client";

export const metadata: Metadata = { title: "Warenkorb" };

export default function CartPage() {
  return (
    <section className="container">
      <div className="page-title">
        <span className="eyebrow">Checkout</span>
        <h1>Warenkorb</h1>
        <p className="lead">Prüfe deine Lampen und starte danach den sicheren Stripe Checkout.</p>
      </div>
      <CartClient />
    </section>
  );
}
