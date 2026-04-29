import { shopConfig } from "@/lib/shop-config";

export const metadata = {
  title: "Kontakt – LumenOak",
};

export default function KontaktPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Kontakt</p>
      <h1>Kontakt zu LumenOak</h1>
      <p>Du hast Fragen zu Modellen, Holzvarianten, Lieferzeit oder einer individuellen Anfrage?</p>
      <div className="content-card">
        <p><strong>E-Mail:</strong> {shopConfig.email}</p>
        <p><strong>Standort:</strong> {shopConfig.location}</p>
      </div>
      <p className="notice">Hinweis: Vor dem echten Verkaufsstart bitte finale Unternehmensdaten, rechtliche Texte und E-Mail-Zustellung prüfen.</p>
    </section>
  );
}
