import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = { title: "Widerruf" };

export default function WiderrufPage() {
  return (
    <section className="container legal-content">
      <div className="page-title">
        <span className="eyebrow">Rechtliches</span>
        <h1>Widerruf</h1>
        <p className="lead">Hier ist die Widerrufsseite inklusive vorbereiteter Widerrufsfunktion.</p>
      </div>
      <div className="notice">Ab 19.06.2026 wird für online geschlossene Fernabsatzverträge eine leicht zugängliche Widerrufsfunktion relevant. Diese Seite enthält bereits einen hervorgehobenen Button/Formularbereich. Bitte rechtlich prüfen.</div>
      <h2>Vertrag widerrufen</h2>
      <p>Nutze dieses Formular, um einen Widerruf zu übermitteln. Du kannst alternativ auch per E-Mail an {shopConfig.email} widerrufen.</p>
      <div className="info-card">
        <ContactForm type="withdrawal" />
      </div>
      <h2>Muster-Widerrufsformular</h2>
      <p>Wenn du den Vertrag widerrufen willst, kannst du folgenden Text verwenden:</p>
      <p>
        Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden Waren: [Produkt eintragen].<br />
        Bestellt am: [Datum]. Erhalten am: [Datum].<br />
        Name: [Name]. Anschrift: [Anschrift].<br />
        Datum: [Datum].
      </p>
      <h2>Widerrufsfrist</h2>
      <p>Die gesetzliche Widerrufsfrist beträgt für Verbraucher grundsätzlich 14 Tage. Details und Ausnahmen, insbesondere bei individuell gefertigten Waren, müssen vor Launch konkret geprüft und korrekt formuliert werden.</p>
    </section>
  );
}
