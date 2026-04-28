import type { Metadata } from "next";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <section className="container legal-content">
      <div className="page-title">
        <span className="eyebrow">Rechtliches</span>
        <h1>Datenschutzerklärung</h1>
      </div>
      <div className="notice">Diese Datenschutzerklärung ist eine technische Vorlage. Vor Launch mit deinen echten Tools, Dienstleistern und Rechtsgrundlagen prüfen.</div>
      <h2>1. Verantwortlicher</h2>
      <p>{shopConfig.address.company}, {shopConfig.address.street}, {shopConfig.address.zipCity}, E-Mail: {shopConfig.email}</p>
      <h2>2. Hosting</h2>
      <p>Diese Website ist für Deployment auf Vercel oder einem vergleichbaren Hostinganbieter vorbereitet. Beim Aufruf der Website werden technisch notwendige Zugriffsdaten verarbeitet, um die Website auszuliefern und zu sichern.</p>
      <h2>3. Kontaktformular</h2>
      <p>Wenn du das Kontaktformular nutzt, verarbeiten wir deine Angaben zur Bearbeitung deiner Anfrage. Optional ist Resend als E-Mail-Dienstleister vorbereitet. Falls du Resend nutzt, muss ein Auftragsverarbeitungsvertrag geprüft und ergänzt werden.</p>
      <h2>4. Bestellungen und Zahlung</h2>
      <p>Für Zahlungen ist Stripe Checkout vorbereitet. Zahlungsdaten werden über Stripe verarbeitet; wir erhalten nur die für Bestellung, Zahlung und Versand erforderlichen Informationen. Passe diesen Abschnitt an dein Stripe-Konto, aktive Zahlungsmethoden und deine Datenschutzeinstellungen an.</p>
      <h2>5. Cookies und Local Storage</h2>
      <p>Der Warenkorb wird lokal im Browser gespeichert. Standardmäßig sind keine Marketing-Cookies oder Tracking-Skripte eingebaut.</p>
      <h2>6. Betroffenenrechte</h2>
      <p>Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren.</p>
      <h2>7. Speicherdauer</h2>
      <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für die genannten Zwecke oder gesetzliche Aufbewahrungspflichten erforderlich ist.</p>
    </section>
  );
}
