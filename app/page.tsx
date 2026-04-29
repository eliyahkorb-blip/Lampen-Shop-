import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products, woodOptions } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

const faq = [
  ["Wie werden die Lampen betrieben?", "Alle LumenOak Lampen werden über ein fest integriertes warmweißes LED-Modul mit USB-C betrieben."],
  ["Kann ich eine normale Glühbirne einsetzen?", "Nein. Die Lampen sind nicht für klassische Glühbirnen, Halogenlampen oder heiße Leuchtmittel geeignet."],
  ["Welche Holzarten gibt es?", "Eiche, Ahorn, schwarz geölte Eiche und Nussbaum."],
  ["Wird jede Lampe auf Bestellung gefertigt?", "Ja. Jede Lampe wird made-to-order gefertigt und handmontiert."],
  ["Wie lange dauert die Lieferung?", "In der Regel 5–10 Werktage, abhängig vom Modell und der aktuellen Auftragslage."],
  ["Sind kleine Unterschiede normal?", "Ja. Holz ist ein Naturmaterial und 3D-Druck kann minimale Unterschiede zeigen. Jede Lampe ist dadurch leicht individuell."],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">3D-Druck · Massivholz · Warmweiß</p>
          <h1>Designlampen, die Wärme in Form bringen.</h1>
          <p>
            3D-gedruckte Tischlampen auf echtem Holzsockel – warmweiß, modern und auf Bestellung gefertigt. Für Nachttisch, Sideboard und gemütliche Wohnräume.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="primary-button">Kollektion ansehen</Link>
            <Link href="#materialien" className="secondary-button">Materialien entdecken</Link>
          </div>
          <div className="trust-row">
            <span>Handmontiert</span>
            <span>USB-C LED</span>
            <span>Echte Holzsockel</span>
            <span>Made-to-order</span>
            <span>{shopConfig.productionTime}</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-visual">
            <div className="lamp-fallback large wave-mini"><span /></div>
          </div>
        </div>
      </section>

      <section id="kollektion" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Kollektion</p>
            <h2>Lampen für warme Räume.</h2>
          </div>
          <Link href="/shop" className="text-link">Alle ansehen</Link>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <section id="materialien" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Materialien</p>
            <h2>Echtes Holz. Warmes Licht. Klare Formen.</h2>
          </div>
        </div>
        <p className="lead">
          Jede LumenOak Lampe kombiniert einen 3D-gedruckten Schirm mit einem echten Holzsockel. Je nach Modell stehen Eiche, Ahorn, schwarz geölte Eiche und Nussbaum zur Auswahl.
        </p>
        <div className="material-grid">
          {woodOptions.map((wood) => (
            <article className="material-card" key={wood.id}>
              <div className="material-swatch" style={{ background: wood.colorHint }} />
              <h3>{wood.name}</h3>
              <p>{wood.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="fertigung" className="section dark-band">
        <div className="section-header">
          <div>
            <p className="eyebrow">Fertigung & Technik</p>
            <h2>Für LED entwickelt, nicht für heiße Leuchtmittel.</h2>
          </div>
        </div>
        <div className="feature-grid">
          <article className="content-card"><h3>3D-gedruckter Schirm</h3><p>Transluzentes PLA/PETG mit warmer Lichtstreuung und klarer Formgebung.</p></article>
          <article className="content-card"><h3>USB-C LED</h3><p>Fest integriertes warmweißes LED-Modul mit geringer Wärmeentwicklung.</p></article>
          <article className="content-card"><h3>Massivholzsockel</h3><p>Geschliffen, geölt und handmontiert – jede Holzmaserung ist individuell.</p></article>
          <article className="content-card"><h3>Made-to-order</h3><p>Produktion nach Bestellung, dadurch weniger Lagerware und mehr Individualität.</p></article>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Häufige Fragen.</h2>
          </div>
        </div>
        <div className="faq-list">
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
