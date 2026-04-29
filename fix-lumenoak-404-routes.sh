#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Fixe LumenOak 404-Routen..."

mkdir -p app/shop app/produkte app/products app/produkt app/produkte/[slug] app/products/[slug] app/kollektion app/materialien app/fertigung app/faq

# Shop-Seite sicherstellen
cat > app/shop/page.tsx <<'TSX'
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop – LumenOak Designlampen",
  description: "Entdecke 3D-gedruckte Tischlampen mit echtem Holzsockel, USB-C LED und warmweißem Licht.",
};

export default function ShopPage() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Die LumenOak Kollektion</h1>
          <p className="lead">
            Wähle dein Design und danach die passende Holzvariante: Eiche, Ahorn, schwarz geölte Eiche oder Nussbaum.
          </p>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
TSX

# Alternative Routen auf /shop weiterleiten
cat > app/produkte/page.tsx <<'TSX'
import { redirect } from "next/navigation";
export default function ProduktePage() { redirect("/shop"); }
TSX

cat > app/products/page.tsx <<'TSX'
import { redirect } from "next/navigation";
export default function ProductsPage() { redirect("/shop"); }
TSX

cat > app/produkt/page.tsx <<'TSX'
import { redirect } from "next/navigation";
export default function ProduktPage() { redirect("/shop"); }
TSX

cat > app/produkte/[slug]/page.tsx <<'TSX'
import { redirect } from "next/navigation";
export default async function ProdukteSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/produkt/${slug}`);
}
TSX

cat > app/products/[slug]/page.tsx <<'TSX'
import { redirect } from "next/navigation";
export default async function ProductsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/produkt/${slug}`);
}
TSX

# Sektionen als echte Seiten bereitstellen, falls Safari/iPad oder alte Links auf /kollektion usw. gehen
cat > app/kollektion/page.tsx <<'TSX'
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = { title: "Kollektion – LumenOak" };

export default function KollektionPage() {
  return (
    <section className="section">
      <p className="eyebrow">Kollektion</p>
      <h1>Lampen für warme Räume.</h1>
      <p className="lead">Alle LumenOak Designs mit 3D-gedrucktem Schirm, USB-C LED und echtem Holzsockel.</p>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
TSX

cat > app/materialien/page.tsx <<'TSX'
import { woodOptions } from "@/lib/products";

export const metadata = { title: "Materialien – LumenOak" };

export default function MaterialienPage() {
  return (
    <section className="section">
      <p className="eyebrow">Materialien</p>
      <h1>Echtes Holz. Warmes Licht. Klare Formen.</h1>
      <p className="lead">Jede LumenOak Lampe kombiniert einen 3D-gedruckten Schirm mit einem echten Holzsockel.</p>
      <div className="wood-grid">
        {woodOptions.map((wood) => (
          <article key={wood.id} className="wood-card">
            <span className="wood-swatch" style={{ background: wood.colorHint }} />
            <h3>{wood.name}</h3>
            <p>{wood.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
TSX

cat > app/fertigung/page.tsx <<'TSX'
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
TSX

cat > app/faq/page.tsx <<'TSX'
const faq = [
  ["Wie werden die Lampen betrieben?", "Alle LumenOak Lampen werden über ein fest integriertes warmweißes LED-Modul mit USB-C betrieben."],
  ["Kann ich eine normale Glühbirne einsetzen?", "Nein. Die Lampen sind nicht für klassische Glühbirnen, Halogenlampen oder heiße Leuchtmittel geeignet."],
  ["Welche Holzarten gibt es?", "Eiche, Ahorn, schwarz geölte Eiche und Nussbaum."],
  ["Wird jede Lampe auf Bestellung gefertigt?", "Ja. Jede Lampe wird made-to-order gefertigt und handmontiert."],
  ["Wie lange dauert die Lieferung?", "In der Regel 5–10 Werktage, abhängig vom Modell und der aktuellen Auftragslage."],
];

export const metadata = { title: "FAQ – LumenOak" };

export default function FaqPage() {
  return (
    <section className="section narrow">
      <p className="eyebrow">FAQ</p>
      <h1>Häufige Fragen.</h1>
      <div className="faq-list">
        {faq.map(([question, answer]) => (
          <details key={question} className="faq-item">
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
TSX

# Optional: Header robuster machen, damit diese Seiten direkt funktionieren
cat > components/header.tsx <<'TSX'
import Link from "next/link";
import { CartCounter } from "./cart-counter";
import { shopConfig } from "@/lib/shop-config";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="LumenOak Startseite">
        <img src="/brand/lumenoak-logo.svg" alt="LumenOak" className="brand-logo" />
        <span className="brand-text">
          <strong>{shopConfig.name}</strong>
          <small>{shopConfig.claim}</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Hauptnavigation">
        <Link href="/shop">Shop</Link>
        <Link href="/kollektion">Kollektion</Link>
        <Link href="/materialien">Materialien</Link>
        <Link href="/fertigung">Fertigung</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/kontakt">Kontakt</Link>
      </nav>
      <Link href="/warenkorb" className="cart-link">
        Warenkorb <CartCounter />
      </Link>
    </header>
  );
}
TSX

echo "✅ 404-Routen wurden repariert."
echo "Jetzt bitte Dev-Server neu starten: Ctrl+C, dann npm run dev"
echo "Danach testen: /shop, /kollektion, /produkt/wave-mini"
