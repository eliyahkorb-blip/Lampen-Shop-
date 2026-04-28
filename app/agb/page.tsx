import type { Metadata } from "next";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <section className="container legal-content">
      <div className="page-title">
        <span className="eyebrow">Rechtliches</span>
        <h1>Allgemeine Geschäftsbedingungen</h1>
      </div>
      <div className="notice">AGB-Vorlage: Für echte Nutzung unbedingt auf dein Geschäftsmodell, USt.-Status, Gewährleistung, Retouren und individuelle Fertigung prüfen lassen.</div>
      <h2>1. Geltungsbereich</h2>
      <p>Diese AGB gelten für Bestellungen über den Online-Shop von {shopConfig.name}.</p>
      <h2>2. Vertragspartner</h2>
      <p>Der Kaufvertrag kommt zustande mit {shopConfig.address.company}, {shopConfig.address.street}, {shopConfig.address.zipCity}.</p>
      <h2>3. Angebot und Vertragsschluss</h2>
      <p>Die Darstellung der Produkte im Shop stellt kein rechtlich bindendes Angebot dar. Durch Klick auf den zahlungspflichtigen Bestellbutton im Checkout gibst du eine verbindliche Bestellung ab.</p>
      <h2>4. Preise und Versandkosten</h2>
      <p>Alle Preise verstehen sich inklusive gesetzlicher Umsatzsteuer, sofern nicht aufgrund der Kleinunternehmerregelung anders ausgewiesen. Versandkosten werden im Checkout angezeigt.</p>
      <h2>5. Lieferung</h2>
      <p>Die Lieferung erfolgt an die im Checkout angegebene Adresse. Bei made-to-order Produkten beginnt die Fertigung nach erfolgreicher Zahlung.</p>
      <h2>6. Zahlung</h2>
      <p>Die Zahlung erfolgt über die im Stripe Checkout angebotenen Zahlungsmethoden.</p>
      <h2>7. Widerrufsrecht</h2>
      <p>Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu. Details findest du auf der Widerrufsseite. Bei individuell nach Kundenspezifikation angefertigten Produkten können Sonderregeln gelten, die rechtlich sauber geprüft werden müssen.</p>
      <h2>8. Eigentumsvorbehalt</h2>
      <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
      <h2>9. Gewährleistung</h2>
      <p>Es gilt das gesetzliche Mängelhaftungsrecht.</p>
    </section>
  );
}
