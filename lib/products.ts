export type WoodId = "eiche" | "ahorn" | "schwarz" | "nussbaum";

export type ProductVariant = {
  woodId: WoodId;
  price: number;
  images: string[];
};

export type Product = {
  slug: string;
  name: string;
  basePrice: number;
  category: string;
  dimensions: string;
  shortDescription: string;
  description: string;
  keywords: string[];
  variants: Record<WoodId, ProductVariant>;
  specs: Record<string, string>;
};

export const woodOptions: Array<{
  id: WoodId;
  name: string;
  shortName: string;
  priceAdd: number;
  description: string;
  colorHint: string;
}> = [
  {
    id: "eiche",
    name: "Eiche",
    shortName: "Eiche",
    priceAdd: 0,
    description: "Warm, klassisch und zeitlos. Eiche passt zu fast jedem Wohnstil.",
    colorHint: "#B98239",
  },
  {
    id: "ahorn",
    name: "Ahorn",
    shortName: "Ahorn",
    priceAdd: 0,
    description: "Hell, ruhig und clean. Ahorn wirkt besonders leicht und skandinavisch.",
    colorHint: "#E8D1A6",
  },
  {
    id: "schwarz",
    name: "Schwarz geölte Eiche",
    shortName: "Schwarz",
    priceAdd: 10,
    description: "Modern, kontrastreich und elegant. Perfekt für dunkle oder minimalistische Einrichtungen.",
    colorHint: "#16130F",
  },
  {
    id: "nussbaum",
    name: "Nussbaum",
    shortName: "Nussbaum",
    priceAdd: 15,
    description: "Dunkel, hochwertig und wohnlich. Nussbaum wirkt besonders edel und ruhig.",
    colorHint: "#6A3F22",
  },
];

const commonSpecs = {
  Lichtquelle: "Fest integriertes LED-Modul",
  Leistung: "ca. 1–3 W",
  Lichtfarbe: "Warmweiß, ca. 2700–3000 K",
  Anschluss: "USB-C",
  Betrieb: "5V USB-Netzteil oder geeignete Powerbank",
  Schirm: "Transluzentes PLA/PETG",
  Sockel: "Massivholz, geschliffen und geölt",
  Nutzung: "Innenbereich",
  Fertigung: "Made-to-order",
  Lieferzeit: "5–10 Werktage",
};

function variant(slug: string, woodId: WoodId, price: number): ProductVariant {
  return {
    woodId,
    price,
    images: [
      `/products/${slug}-${woodId}-front.webp`,
      `/products/${slug}-${woodId}-anschluss.webp`,
      `/products/${slug}-${woodId}-raum.webp`,
    ],
  };
}

export const products: Product[] = [
  {
    slug: "wave-mini",
    name: "Wave Mini",
    basePrice: 69,
    category: "Ruhig & minimalistisch",
    dimensions: "ca. 20 cm hoch, Ø 12 cm",
    shortDescription: "Sanfte Wellen, warmes Licht und ein ruhiger Look für Nachttisch, Sideboard oder Wohnzimmer.",
    description:
      "Wave Mini ist die minimalistische Tischlampe von LumenOak mit organischer Wellenstruktur. Der 3D-gedruckte Schirm verteilt das warmweiße Licht weich und gleichmäßig, während der massive Holzsockel natürliche Wärme in den Raum bringt.",
    keywords: ["3D gedruckte Lampe", "Tischlampe", "Nachttischlampe", "Wave Lampe"],
    specs: commonSpecs,
    variants: {
      eiche: variant("wave-mini", "eiche", 69),
      ahorn: variant("wave-mini", "ahorn", 69),
      schwarz: variant("wave-mini", "schwarz", 79),
      nussbaum: variant("wave-mini", "nussbaum", 84),
    },
  },
  {
    slug: "lace-glow",
    name: "Lace Glow",
    basePrice: 79,
    category: "Filigran & dekorativ",
    dimensions: "ca. 20 cm hoch, Ø 12 cm",
    shortDescription: "Filigranes Muster und atmosphärisches Licht mit besonderem Schatteneffekt.",
    description:
      "Lace Glow kombiniert eine feine, durchbrochene Struktur mit warmem LED-Licht. Das Muster erzeugt ein lebendiges Lichtspiel und macht die Lampe besonders dekorativ – ideal für Wohnzimmer, Regale oder Sideboards.",
    keywords: ["Designlampe", "Lichtspiel", "Ambient Light", "3D gedruckte Lampe"],
    specs: commonSpecs,
    variants: {
      eiche: variant("lace-glow", "eiche", 79),
      ahorn: variant("lace-glow", "ahorn", 79),
      schwarz: variant("lace-glow", "schwarz", 89),
      nussbaum: variant("lace-glow", "nussbaum", 94),
    },
  },
  {
    slug: "halo",
    name: "Halo",
    basePrice: 79,
    category: "Ruhig & minimalistisch",
    dimensions: "ca. 18 cm hoch, Ø 14 cm",
    shortDescription: "Rund, weich und beruhigend – perfekt als Nachtlicht oder Ambient Light.",
    description:
      "Halo setzt auf eine ruhige, runde Form mit feiner Linienstruktur. Das Licht wirkt weich, harmonisch und besonders gemütlich. Ideal für Schlafzimmer, Nachttisch oder ruhige Wohnbereiche.",
    keywords: ["Nachtlicht", "Ambient Light", "runde Tischlampe", "Designleuchte Holz"],
    specs: commonSpecs,
    variants: {
      eiche: variant("halo", "eiche", 79),
      ahorn: variant("halo", "ahorn", 79),
      schwarz: variant("halo", "schwarz", 89),
      nussbaum: variant("halo", "nussbaum", 94),
    },
  },
  {
    slug: "edge",
    name: "Edge",
    basePrice: 89,
    category: "Modern & geometrisch",
    dimensions: "ca. 19 cm hoch, 12 × 12 cm",
    shortDescription: "Geometrisch, klar und modern – für alle, die kantiges Design mögen.",
    description:
      "Edge bringt klare Linien und moderne Geometrie in die LumenOak Kollektion. Die markante Form wirkt clean und hochwertig, bleibt durch das warme LED-Licht aber wohnlich und angenehm.",
    keywords: ["moderne Tischlampe", "geometrische Lampe", "Designlampe Holzsockel"],
    specs: commonSpecs,
    variants: {
      eiche: variant("edge", "eiche", 89),
      ahorn: variant("edge", "ahorn", 89),
      schwarz: variant("edge", "schwarz", 99),
      nussbaum: variant("edge", "nussbaum", 104),
    },
  },
  {
    slug: "column",
    name: "Column",
    basePrice: 89,
    category: "Modern & minimalistisch",
    dimensions: "ca. 24 cm hoch, Ø 10 cm",
    shortDescription: "Schlank, vertikal und elegant – ein ruhiger Lichtkörper für moderne Räume.",
    description:
      "Column ist die minimalistische Säulenlampe der Kollektion. Die vertikale Rippenstruktur verteilt das Licht gleichmäßig und sorgt für eine elegante Präsenz auf Sideboards, Regalen oder Nachttischen.",
    keywords: ["Säulenlampe", "USB-C Lampe", "moderne Tischlampe", "Ambient Light"],
    specs: commonSpecs,
    variants: {
      eiche: variant("column", "eiche", 89),
      ahorn: variant("column", "ahorn", 89),
      schwarz: variant("column", "schwarz", 99),
      nussbaum: variant("column", "nussbaum", 104),
    },
  },
  {
    slug: "bloom",
    name: "Bloom",
    basePrice: 99,
    category: "Organisch & besonders",
    dimensions: "ca. 20 cm hoch, Ø 13 cm",
    shortDescription: "Organisch, weich und besonders – inspiriert von natürlichen Formen.",
    description:
      "Bloom ist eines der ausdrucksstärksten Modelle der LumenOak Kollektion. Die blütenartige Form erzeugt ein warmes, weiches Lichtbild und macht die Lampe zu einem besonderen Designobjekt im Raum.",
    keywords: ["organische Lampe", "handgemachte Lampe", "Designobjekt", "3D gedruckte Lampe"],
    specs: commonSpecs,
    variants: {
      eiche: variant("bloom", "eiche", 99),
      ahorn: variant("bloom", "ahorn", 99),
      schwarz: variant("bloom", "schwarz", 109),
      nussbaum: variant("bloom", "nussbaum", 114),
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const safetyNotice =
  "Die LumenOak Lampen sind für ein fest integriertes warmweißes LED-Modul entwickelt. Das Lichtsystem wird über USB-C betrieben und ist auf geringe Wärmeentwicklung ausgelegt. Nicht für klassische Glühbirnen, Halogen- oder andere heiße Leuchtmittel geeignet.";

export const warnings = [
  "Nur für Innenräume geeignet.",
  "Nicht abdecken.",
  "Nicht mit Glühbirnen, Halogenlampen oder heißen Leuchtmitteln verwenden.",
  "Nur mit dem vorgesehenen LED-System betreiben.",
  "Von direkter Hitze, offenem Feuer und starker Sonneneinstrahlung fernhalten.",
];
