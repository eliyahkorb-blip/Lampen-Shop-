export const shopConfig = {
  name: process.env.NEXT_PUBLIC_SHOP_NAME || "Dito Studio Lights",
  tagline: "3D-gedruckte Designlampen auf echtem Eichenholz",
  email: process.env.NEXT_PUBLIC_SHOP_EMAIL || "info@deine-domain.de",
  phone: process.env.NEXT_PUBLIC_SHOP_PHONE || "+49 000 000000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  currency: "EUR",
  locale: "de-DE",
  address: {
    company: "Dito Studio Lights",
    owner: "Vorname Nachname",
    street: "Musterstraße 1",
    zipCity: "97070 Würzburg",
    country: "Deutschland",
  },
  shipping: {
    standardCents: 490,
    freeFromCents: 12000,
    countries: ["DE", "AT"],
  },
  productionTime: "2–5 Werktage Fertigung + Versandlaufzeit",
};
