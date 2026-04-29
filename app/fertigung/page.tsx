export const metadata = { title: "Fertigung & Technik – LumenOak" };

export default function FertigungPage() {
  return (
    <section className="section dark-section">
      <p className="eyebrow">Fertigung & Technik</p>
      <h1>Für LED entwickelt, nicht für heiße Leuchtmittel.</h1>
      <div className="feature-grid">
        <article><h3>3D-gedruckter Schirm</h3><p>Transluzentes PLA/PETG mit warmer Lichtstreuung.</p></article>
        <article><h3>USB-C LED</h3><p>Fest integriertes warmweißes LED-Modul mit geringer Wärmeentwicklung.</p></article>
        <article><h3>Massivholzsockel</h3><p>Geschliffen, geölt und handmontiert.</p></article>
        <article><h3>Made-to-order</h3><p>Fertigung nach Bestellung mit 5–10 Werktagen Produktionszeit.</p></article>
      </div>
    </section>
  );
}
