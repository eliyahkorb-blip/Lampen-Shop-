import type { Metadata } from "next";
import { formatMoney } from "@/lib/format";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = { title: "Versand & Zahlung" };

export default function VersandPage() {
  return (
    <section className="container legal-content">
      <div className="page-title">
        <span className="eyebrow">Service</span>
        <h1>Versand & Zahlung</h1>
        <p className="lead">Transparent vorbereitet für echte Bestellungen.</p>
      </div>
      <h2>Liefergebiet</h2>
      <p>Der Shop ist aktuell für Lieferungen nach Deutschland und Österreich vorbereitet. Du kannst die erlaubten Länder in <code>lib/shop-config.ts</code> ändern.</p>
      <h2>Versandkosten</h2>
      <p>Standardversand: {formatMoney(shopConfig.shipping.standardCents)}. Ab {formatMoney(shopConfig.shipping.freeFromCents)} Bestellwert ist der Versand kostenlos.</p>
      <h2>Lieferzeit</h2>
      <p>Viele Lampen werden nach Bestellung gefertigt. Plane aktuell {shopConfig.productionTime} ein. Die finale Lieferzeit sollte vor Launch anhand deiner echten Fertigung und deines Versanddienstleisters angepasst werden.</p>
      <h2>Zahlungsarten</h2>
      <p>Die Zahlung läuft über Stripe Checkout. Welche Zahlarten erscheinen, hängt von deinem Stripe-Konto, deinen aktivierten Zahlungsmethoden und dem Kundenland ab.</p>
      <div className="notice">Vor Launch prüfen: Verpackungskosten, Versandversicherung, Retourenadresse, Lieferzeiten, Kleinunternehmer-/USt.-Status und Rechnungsprozess.</div>
    </section>
  );
}
