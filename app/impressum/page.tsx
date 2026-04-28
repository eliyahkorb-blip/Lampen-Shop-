import type { Metadata } from "next";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <section className="container legal-content">
      <div className="page-title">
        <span className="eyebrow">Rechtliches</span>
        <h1>Impressum</h1>
      </div>
      <div className="notice">Platzhalter: Vor Veröffentlichung mit deinen echten Unternehmensdaten ersetzen und rechtlich prüfen lassen.</div>
      <h2>Angaben gemäß § 5 TMG / DDG</h2>
      <p>
        {shopConfig.address.company}<br />
        Inhaber: {shopConfig.address.owner}<br />
        {shopConfig.address.street}<br />
        {shopConfig.address.zipCity}<br />
        {shopConfig.address.country}
      </p>
      <h2>Kontakt</h2>
      <p>E-Mail: {shopConfig.email}<br />Telefon: {shopConfig.phone}</p>
      <h2>Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE000000000 oder Hinweis auf Kleinunternehmerregelung nach § 19 UStG, falls zutreffend.</p>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>{shopConfig.address.owner}, Anschrift wie oben.</p>
      <h2>Online-Streitbeilegung / Verbraucherstreitbeilegung</h2>
      <p>Bitte vor Launch den aktuellen Stand zur OS-Plattform und Verbraucherstreitbeilegung prüfen und passend eintragen.</p>
    </section>
  );
}
