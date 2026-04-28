import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <section className="container">
      <div className="page-title legal-content">
        <span className="eyebrow">Kontakt</span>
        <h1>Schreib uns.</h1>
        <p className="lead">Fragen zu Lampen, Sonderfarben oder Bestellungen? Schick eine Nachricht oder schreib direkt an {shopConfig.email}.</p>
        <div className="info-card">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
