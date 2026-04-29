export const metadata = { title: "Impressum – LumenOak" };

export default function ImpressumPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Impressum</h1>
      <p className="notice">Platzhalter: Vor Veröffentlichung mit echten Unternehmensdaten ersetzen.</p>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>Vorname Nachname / Unternehmen<br />Straße Hausnummer<br />PLZ Ort<br />Deutschland</p>
      <h2>Kontakt</h2>
      <p>E-Mail: info@lumenoak.de</p>
      <h2>Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer oder Kleinunternehmerhinweis hier final eintragen.</p>
    </section>
  );
}
