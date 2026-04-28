export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  collection: "Wave" | "Lace" | "Edge" | "Aura";
  description: string;
  longDescription: string;
  priceCents: number;
  compareAtCents?: number;
  stock: number;
  madeToOrder: boolean;
  isBestseller?: boolean;
  dimensions: string;
  material: string;
  light: string;
  energy: string;
  color: string;
  base: string;
  features: string[];
  gradient: string;
};

export const products: Product[] = [
  {
    id: "wave-mini-oak",
    slug: "wave-mini-oak",
    name: "Wave Mini Oak",
    subtitle: "Sanfte Wellenform für Nachtisch und Sideboard",
    collection: "Wave",
    description: "Kleine Tischlampe mit organischer Waveform, warmem Licht und runder Eichenbasis.",
    longDescription:
      "Die Wave Mini Oak ist deine erste Signature-Lampe: kompakt, hochwertig und perfekt für Schlafzimmer, Flur oder gemütliche Ecken. Der 3D-gedruckte Lampenschirm streut das Licht weich, während das runde Eiche-Holzbrett der Lampe einen natürlichen Premium-Look gibt.",
    priceCents: 6900,
    stock: 12,
    madeToOrder: true,
    isBestseller: true,
    dimensions: "ca. 18 cm hoch · 12 cm Ø",
    material: "PLA/PETG nach Auswahl, Eiche massiv geölt",
    light: "warmweißes LED-Modul, USB-C",
    energy: "LED, ca. 3–5 W",
    color: "Cremeweiß transluzent",
    base: "runde Eichenbasis, geschliffen und geölt",
    features: ["Handgefertigt in Kleinserie", "Warmweißes Ambient-Light", "Leichter Schirm mit Wave-Struktur", "Echte Eichenbasis"],
    gradient: "radial-gradient(circle at 35% 25%, #fff8df, #d9b36b 34%, #51351f 82%)",
  },
  {
    id: "lace-glow-oak",
    slug: "lace-glow-oak",
    name: "Lace Glow Oak",
    subtitle: "Lochige Struktur mit spannendem Lichtspiel",
    collection: "Lace",
    description: "Designlampe mit perforierter Oberfläche, die schöne Lichtpunkte an Wand und Tisch erzeugt.",
    longDescription:
      "Lace Glow Oak ist für alle, die mehr als nur eine Lampe wollen. Die offene, lochige Form erzeugt ein lebendiges Lichtspiel und wirkt ausgeschaltet wie ein kleines Designobjekt. Ideal als Geschenk, Nachttischlampe oder Akzent auf Kommode und Regal.",
    priceCents: 7900,
    stock: 8,
    madeToOrder: true,
    dimensions: "ca. 21 cm hoch · 13 cm Ø",
    material: "transluzentes PLA/PETG, Eiche massiv geölt",
    light: "warmweißes LED-Modul, USB-C",
    energy: "LED, ca. 3–5 W",
    color: "Ivory / Warmweiß",
    base: "runde Eichenbasis mit Kabelführung",
    features: ["Perforiertes Lichtmuster", "Sehr dekorativ bei Dunkelheit", "Jede Lampe leicht individuell", "USB-C Anschluss"],
    gradient: "radial-gradient(circle at 50% 30%, #fff2c2, #f0a84a 38%, #4b261a 85%)",
  },
  {
    id: "edge-cube-oak",
    slug: "edge-cube-oak",
    name: "Edge Cube Oak",
    subtitle: "Kantige Form, klarer moderner Look",
    collection: "Edge",
    description: "Minimalistische Lampe mit kantigem Schirm und hochwertigem Holzsockel.",
    longDescription:
      "Edge Cube Oak bringt klare Linien in moderne Wohnungen. Die kantige Silhouette passt besonders gut zu Schreibtisch, Regal, TV-Lowboard oder modernen Schlafzimmern. Der Schirm ist so gestaltet, dass er elegant wirkt, aber trotzdem angenehm weiches Licht abgibt.",
    priceCents: 8900,
    stock: 10,
    madeToOrder: true,
    dimensions: "ca. 20 cm hoch · 12 × 12 cm",
    material: "PLA/PETG, Eiche massiv geölt",
    light: "warmweißes LED-Modul, USB-C",
    energy: "LED, ca. 3–5 W",
    color: "Mattweiß / transluzent",
    base: "Eichenbasis, rund oder eckig konfigurierbar",
    features: ["Moderner kantiger Look", "Ideal für minimalistische Räume", "Blendarmes Ambient-Light", "Kleinserie statt Massenware"],
    gradient: "linear-gradient(135deg, #f7ead2, #c98d49 40%, #2b2018 88%)",
  },
  {
    id: "aura-dome-oak",
    slug: "aura-dome-oak",
    name: "Aura Dome Oak",
    subtitle: "Weiche Kuppelform mit ruhiger Lichtfläche",
    collection: "Aura",
    description: "Runde Ambient-Lampe mit sanftem Glow für gemütliche Räume.",
    longDescription:
      "Aura Dome Oak ist die ruhigste Lampe der Kollektion. Die Kuppelform verteilt das Licht gleichmäßig und schafft ein warmes Ambiente, ohne aufdringlich zu sein. Besonders schön für Schlafzimmer, Leseecken und Wohnbereiche.",
    priceCents: 7400,
    stock: 15,
    madeToOrder: true,
    dimensions: "ca. 17 cm hoch · 14 cm Ø",
    material: "transluzentes PLA/PETG, Eiche massiv geölt",
    light: "warmweißes LED-Modul, USB-C",
    energy: "LED, ca. 3–5 W",
    color: "Opalweiß",
    base: "runde Eichenbasis, geölt",
    features: ["Sehr weiches Licht", "Zeitlose runde Form", "Kompakt und geschenktauglich", "Warm und gemütlich"],
    gradient: "radial-gradient(circle at 50% 22%, #fff9ef, #d4a35d 48%, #523621 92%)",
  },
  {
    id: "wave-tall-oak",
    slug: "wave-tall-oak",
    name: "Wave Tall Oak",
    subtitle: "Höhere Waveform als Statement-Stück",
    collection: "Wave",
    description: "Größere Tischlampe mit eleganter, vertikaler Wellenstruktur.",
    longDescription:
      "Wave Tall Oak ist das Statement-Modell für Sideboard, Wohnzimmer oder Empfangsbereich. Die vertikale Wellenstruktur wirkt hochwertig und modern, ohne kalt zu sein. Durch die Eichenbasis bleibt die Lampe natürlich und wohnlich.",
    priceCents: 9900,
    compareAtCents: 11900,
    stock: 6,
    madeToOrder: true,
    dimensions: "ca. 28 cm hoch · 13 cm Ø",
    material: "PLA/PETG, Eiche massiv geölt",
    light: "warmweißes LED-Modul, USB-C",
    energy: "LED, ca. 4–6 W",
    color: "Cremeweiß transluzent",
    base: "runde Eichenbasis, optional größer",
    features: ["Premium-Modell", "Starker Blickfang", "Vertikale Wave-Struktur", "Made-to-order"],
    gradient: "radial-gradient(circle at 42% 20%, #fff6d8, #c88e4e 42%, #3b2518 90%)",
  },
  {
    id: "lace-mini-gift",
    slug: "lace-mini-gift",
    name: "Lace Mini Gift",
    subtitle: "Kleine Geschenk-Lampe mit Charakter",
    collection: "Lace",
    description: "Kompaktes Geschenkmodell mit perforierter Struktur und warmer Lichtwirkung.",
    longDescription:
      "Lace Mini Gift ist bewusst klein gehalten und eignet sich perfekt als Geschenk, Deko-Licht oder Nachtlicht. Die perforierte Struktur erzeugt eine besondere Lichtwirkung und macht jede Ecke sofort gemütlicher.",
    priceCents: 5900,
    stock: 20,
    madeToOrder: true,
    dimensions: "ca. 14 cm hoch · 10 cm Ø",
    material: "PLA/PETG, Eiche massiv geölt",
    light: "warmweißes LED-Modul, USB-C",
    energy: "LED, ca. 2–4 W",
    color: "Ivory / Warmweiß",
    base: "runde Eichenbasis mini",
    features: ["Perfekt als Geschenk", "Kompakt", "Gemütliches Lichtspiel", "Preiswerter Einstieg"],
    gradient: "radial-gradient(circle at 55% 22%, #fff3c7, #e3a957 40%, #4d2d1b 88%)",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
