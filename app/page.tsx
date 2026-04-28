import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

export default function HomePage() {
  const featured = products.slice(0, 3);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: shopConfig.name,
    url: shopConfig.siteUrl,
    email: shopConfig.email,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <section className="container hero">
        <div>
          <span className="eyebrow">Made-to-order · 3D-Druck · Eiche</span>
          <h1>Designlampen, die warm wirken statt kalt aussehen.</h1>
          <p className="lead">
            Kleine Tischlampen, Nachtlampen und Ambient Lights: 3D-gedruckte Formen auf echtem Eichenholz – handgefertigt in Kleinserie, perfekt als Geschenk oder für gemütliche Räume.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-primary">Kollektion ansehen</Link>
            <Link href="#prozess" className="btn btn-secondary">Wie sie entstehen</Link>
          </div>
        </div>
        <div className="hero-card" aria-label="Visual einer leuchtenden 3D-Lampe auf Eichenbasis">
          <div className="hero-lamp" />
          <div className="hero-base" />
          <div className="hero-note">
            <span><strong>Warmweiß</strong>LED Ambient-Light</span>
            <span><strong>Eiche</strong>geschliffen & geölt</span>
          </div>
        </div>
      </section>

      <section className="container trust-strip" aria-label="Vorteile">
        <div className="trust-item"><strong>Handmade</strong><span>Kleinserie statt Massenware.</span></div>
        <div className="trust-item"><strong>2–5 Werktage</strong><span>Fertigung je nach Modell.</span></div>
        <div className="trust-item"><strong>USB-C LED</strong><span>Einfach, sparsam, warm.</span></div>
        <div className="trust-item"><strong>Gratis Versand</strong><span>ab 120 € Bestellwert.</span></div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Bestseller</span>
            <h2>Startkollektion</h2>
          </div>
          <Link href="/shop" className="btn btn-secondary">Alle ansehen</Link>
        </div>
        <div className="grid products-grid">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="container section" id="prozess">
        <div className="section-head">
          <div>
            <span className="eyebrow">Fertigung</span>
            <h2>Vom digitalen Design zur echten Lampe.</h2>
          </div>
        </div>
        <div className="grid two-grid">
          <div className="info-card">
            <h3>3D-gedruckter Schirm</h3>
            <p>Jedes Modell wird mit strukturierter Oberfläche gedruckt: Waveform, Lace-Lochmuster, kantige Edge-Form oder ruhige Dome-Silhouette. Dadurch entstehen kleine Einzelstücke mit eigener Lichtwirkung.</p>
          </div>
          <div className="info-card">
            <h3>Eichenbasis</h3>
            <p>Der Holzfuß wird geschliffen, geölt und mit Kabelführung vorbereitet. Der Mix aus warmem Holz und modernem 3D-Druck macht die Lampen wohnlich und trotzdem besonders.</p>
          </div>
          <div className="info-card">
            <h3>Warmweißes Licht</h3>
            <p>Die Lampen sind als Ambient- und Nachtlicht gedacht. Das LED-Modul ist sparsam und bewusst nicht grell, damit es abends gemütlich bleibt.</p>
          </div>
          <div className="info-card">
            <h3>Made-to-order</h3>
            <p>Viele Lampen werden nach Bestellung gefertigt. So bleibt die Produktion schlank, individuell und hochwertig – ideal für kleine Serien und neue Designs.</p>
          </div>
        </div>
      </section>

      <section className="container section" id="faq">
        <div className="section-head">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Häufige Fragen</h2>
          </div>
        </div>
        <div className="grid two-grid">
          <div className="info-card"><h3>Ist das echtes Holz?</h3><p>Ja, die Basis ist als Eiche-Massivholz vorgesehen. Passe Maße und Holzdetails in <code>lib/products.ts</code> an, falls du andere Basen nutzt.</p></div>
          <div className="info-card"><h3>Kann ich Farben ändern?</h3><p>Ja, im Shop sind die Startfarben hinterlegt. Für echte Varianten kannst du weitere Produkte oder Variantenauswahl ergänzen.</p></div>
          <div className="info-card"><h3>Wie läuft die Zahlung?</h3><p>Der Shop nutzt Stripe Checkout. Sobald deine Stripe-Keys hinterlegt sind, können echte Zahlungen aktiviert werden.</p></div>
          <div className="info-card"><h3>Ist der Shop rechtlich fertig?</h3><p>Die Seiten sind vorbereitet, aber Impressum, Datenschutz, AGB und Widerruf müssen vor Launch mit deinen echten Unternehmensdaten geprüft werden.</p></div>
        </div>
      </section>
    </>
  );
}
