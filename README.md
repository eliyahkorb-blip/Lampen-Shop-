# Dito Studio Lights – launch-ready Shopbasis

Ein kompletter Next.js-Shop für 3D-gedruckte Designlampen auf Eichenholz-Basis.

## Was enthalten ist

- Startseite mit Premium-Hero und Produktvorteilen
- Shopübersicht mit 6 Beispielprodukten
- Produktdetailseiten mit SEO/JSON-LD
- LocalStorage-Warenkorb
- Stripe Checkout API-Route
- Stripe Webhook API-Route
- Kontaktformular und Widerrufsformular über Resend optional
- Impressum, Datenschutz, AGB, Widerruf, Versand & Zahlung als Vorlagen
- Sitemap, Robots, Favicon
- Konfigurationsdatei für Shopdaten
- Claude-Code-Anweisung in `CLAUDE.md`

## Setup lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Dann öffnen: http://localhost:3000

## Wichtige Dateien

- `lib/shop-config.ts` – Shopname, E-Mail, Adresse, Versandkosten
- `lib/products.ts` – Produkte, Preise, Texte, Bestand
- `app/api/checkout/route.ts` – Stripe Checkout
- `app/api/webhook/route.ts` – Stripe Webhook für bezahlte Bestellungen
- `app/impressum/page.tsx` – Impressum-Platzhalter
- `app/datenschutz/page.tsx` – Datenschutz-Platzhalter
- `app/agb/page.tsx` – AGB-Platzhalter
- `app/widerruf/page.tsx` – Widerruf + Widerrufsfunktion

## Stripe aktivieren

1. Stripe-Konto anlegen.
2. Test-Keys in `.env.local` eintragen:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. `NEXT_PUBLIC_SITE_URL` auf deine Domain setzen.
4. Lokal testen: `npm run dev`.
5. Webhook in Stripe anlegen:
   - Endpoint: `https://deine-domain.de/api/webhook`
   - Events: `checkout.session.completed`, `checkout.session.expired`
6. Webhook-Secret als `STRIPE_WEBHOOK_SECRET` eintragen.
7. Vor Livegang Stripe auf Live-Keys umstellen.

## E-Mail/Formulare aktivieren

Die Formulare funktionieren im Entwicklungsmodus ohne API-Key und loggen in der Konsole. Für echte E-Mails:

1. Resend-Konto anlegen.
2. Domain verifizieren.
3. `RESEND_API_KEY` und `SHOP_NOTIFICATION_EMAIL` setzen.
4. In `lib/email.ts` den Absender von `onboarding@resend.dev` auf deine verifizierte Domain ändern.

## Deploy auf Vercel

1. Projekt zu GitHub hochladen.
2. Vercel verbinden.
3. Environment Variables aus `.env.example` in Vercel eintragen.
4. `NEXT_PUBLIC_SITE_URL` auf deine echte Domain setzen.
5. Domain verbinden.
6. Stripe Webhook für die Live-Domain anlegen.
7. Testbestellung mit Stripe-Testmodus durchführen.
8. Rechtliche Texte final prüfen.

## Rechtliche Launch-Checkliste Deutschland

Vor echtem Verkauf bitte prüfen:

- Impressum mit echten Daten
- Datenschutzerklärung mit Hosting, Stripe, E-Mail-Dienst, ggf. Analytics
- AGB passend zu Fertigung, Lieferung, Gewährleistung
- Widerrufsbelehrung und Widerrufsformular
- Ab 19.06.2026: leicht zugängliche Widerrufsfunktion/Widerrufsbutton
- Preisangaben inkl. MwSt. bzw. Kleinunternehmerhinweis
- Versandkosten klar vor Bestellung
- Lieferzeiten realistisch
- Button-Lösung im Checkout
- Verpackungsregister/LUCID und Verpackungslizenz prüfen
- ElektroG/CE/Sicherheitsanforderungen für Lampen/LED-Komponenten prüfen

## Produktbilder ersetzen

Aktuell nutzt der Shop hochwertige CSS-Lampenvisuals. Sobald echte Produktfotos vorhanden sind:

1. Bilder nach `public/products/` legen.
2. `Product`-Typ um `image` erweitern.
3. In `ProductCard` und Produktseite statt CSS-Visual `next/image` verwenden.

## Nächste sinnvolle Ausbaustufen

- Varianten: Farbe, Größe, Holzform
- Admin/Produktverwaltung über Shopify, Medusa, Payload CMS oder Supabase
- Bestelldatenbank + automatische E-Mail nach Zahlung
- Rechnungsintegration
- DHL/Sendcloud-Versandlabel
- Produktfotos, 3D-Druck-Making-of und TikTok/Instagram Landingpages
