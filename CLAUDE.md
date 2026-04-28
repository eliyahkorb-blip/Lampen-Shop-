# Claude Code Projektanweisung – Dito Studio Lights Shop

Du arbeitest an einem Next.js App-Router Shop für 3D-gedruckte Designlampen auf Eichenholz-Basis.

## Ziel

Der Shop soll hochwertig, schnell, SEO-stark und conversion-orientiert sein. Zielgruppe sind Käufer von Design-Deko, Nachtlampen, Geschenken und handmade Wohnaccessoires.

## Designrichtung

- Premium, warm, modern, handmade
- Dunkler Hintergrund, warmes Gold/Eiche, weiches Licht
- Große Headlines, hochwertige Produktkarten, klare CTAs
- Keine generischen Template-Vibes
- Mobile-first und sehr sauber responsive

## Technische Regeln

- Next.js App Router verwenden
- TypeScript strikt halten
- Keine unnötigen Dependencies
- Produktdaten zunächst in `lib/products.ts`
- Globale Shopdaten in `lib/shop-config.ts`
- Komponenten klein und sauber halten
- Keine Secrets committen
- `.env.local` nie ausgeben oder committen

## Commerce-Regeln

- Warenkorb liegt aktuell im LocalStorage
- Checkout läuft über `/api/checkout` mit Stripe Checkout
- Webhook `/api/webhook` verarbeitet `checkout.session.completed`
- Preise in Cent speichern
- Produkte serverseitig gegen `lib/products.ts` validieren, nie blind Clientpreise übernehmen
- Versandkosten aus `shopConfig.shipping` ziehen

## Rechtliches

Alle Rechtstexte sind Platzhalter. Keine Rechtsberatung behaupten. Vor Launch müssen Impressum, Datenschutz, AGB, Widerruf, Preise, Versandkosten, USt.-Status und Lampen-/Elektro-Sicherheit geprüft werden.

## SEO/GEO

Für jede Produktseite:
- klare H1
- Meta Title/Description
- Product JSON-LD
- natürliche Keywords: 3D gedruckte Lampe, Designlampe, Nachtlampe, Tischlampe, Eiche, handmade, Ambient Light

## Performance

- Keine schweren Animationen
- Bilder später mit `next/image`
- Gute Semantik
- Accessible Buttons/Labels
- Kontrast beibehalten

## Wenn du Code änderst

1. Kurz erklären, was geändert wurde
2. Keine unnötigen Refactors
3. `npm run typecheck` gedanklich berücksichtigen
4. Bei Checkout/Webhook besonders vorsichtig sein
