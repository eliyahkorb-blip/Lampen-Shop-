import { shopConfig } from "@/lib/shop-config";
import { formatEuro } from "@/lib/format";

export const metadata = { title: "Versand & Zahlung – LumenOak" };

export default function VersandPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Service</p>
      <h1>Versand & Zahlung</h1>
      <h2>Lieferzeit</h2>
      <p>Die Lampen werden made-to-order gefertigt. Die Lieferzeit beträgt in der Regel {shopConfig.productionTime}.</p>
      <h2>Versandkosten</h2>
      <p>Versandkosten: {formatEuro(shopConfig.shippingCost)}. Kostenloser Versand ab {formatEuro(shopConfig.freeShippingFrom)} Bestellwert.</p>
      <h2>Zahlung</h2>
      <p>Stripe Checkout ist vorbereitet und muss vor Livegang mit echten Zahlungsdaten aktiviert werden.</p>
    </section>
  );
}
