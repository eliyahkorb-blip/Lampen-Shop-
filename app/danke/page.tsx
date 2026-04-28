import Link from "next/link";

export default function DankePage() {
  return (
    <section className="container">
      <div className="page-title legal-content">
        <span className="eyebrow">Danke</span>
        <h1>Bestellung erhalten.</h1>
        <p className="lead">Wenn die Zahlung erfolgreich war, findest du die Bestätigung in deiner E-Mail. Wir starten danach mit Fertigung und Versandvorbereitung.</p>
        <Link href="/shop" className="btn btn-primary">Weiter shoppen</Link>
      </div>
    </section>
  );
}
