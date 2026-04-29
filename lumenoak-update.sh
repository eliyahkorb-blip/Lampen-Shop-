#!/usr/bin/env bash
set -euo pipefail

# LumenOak Master-Update für den Next.js Shop
# Nutzung im GitHub Codespace im Projekt-Hauptordner:
#   bash lumenoak-update.sh
# optional mit automatischem Commit + Push:
#   bash lumenoak-update.sh --commit

PROJECT_ROOT="$(pwd)"
BACKUP_DIR="_backup_lumenoak_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP_DIR"
for path in app components lib public package.json next.config.ts tsconfig.json; do
  if [ -e "$path" ]; then
    cp -R "$path" "$BACKUP_DIR/" 2>/dev/null || true
  fi
done

echo "Backup erstellt: $BACKUP_DIR"

mkdir -p app/shop app/produkt/[slug] app/warenkorb app/kontakt app/impressum app/datenschutz app/agb app/widerruf app/versand app/api/checkout app/api/webhook
mkdir -p components lib public/products public/brand

cat > package.json <<'PKG'
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "typescript": "latest"
  },
  "devDependencies": {}
}
PKG

cat > next.config.ts <<'NEXT'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
NEXT

cat > tsconfig.json <<'TS'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TS

cat > lib/shop-config.ts <<'EOF_CONFIG'
export const shopConfig = {
  name: "LumenOak",
  claim: "Licht in Form gebracht.",
  email: "info@lumenoak.de",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://lumenoak.de",
  currency: "EUR",
  shippingCost: 4.9,
  freeShippingFrom: 120,
  productionTime: "5–10 Werktage",
  location: "Deutschland",
  instagram: "",
};
EOF_CONFIG

cat > lib/format.ts <<'EOF_FORMAT'
export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
EOF_FORMAT

cat > lib/products.ts <<'EOF_PRODUCTS'
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
    dimensions: "ca. 20 cm hoch, Ø 12 cm",
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
EOF_PRODUCTS

# Fix doppelte dimensions-Zeile in erstem Produkt, falls stricter TS meckert
python3 - <<'PY'
from pathlib import Path
p=Path('lib/products.ts')
s=p.read_text()
s=s.replace('    dimensions: "ca. 20 cm hoch, Ø 12 cm",\n    specs: commonSpecs,\n    variants:', '    specs: commonSpecs,\n    variants:', 1)
p.write_text(s)
PY

cat > components/cart-provider.tsx <<'EOF_CART_PROVIDER'
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { WoodId } from "@/lib/products";

export type CartItem = {
  id: string;
  productSlug: string;
  productName: string;
  woodId: WoodId;
  woodName: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lumenoak-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      count,
      subtotal,
      addItem: (item, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((cartItem) => cartItem.id === item.id);
          if (existing) {
            return current.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            );
          }
          return [...current, { ...item, quantity }];
        });
      },
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
      updateQuantity: (id, quantity) =>
        setItems((current) =>
          current
            .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter((item) => item.quantity > 0)
        ),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
EOF_CART_PROVIDER

cat > components/cart-counter.tsx <<'EOF_CART_COUNTER'
"use client";

import { useCart } from "./cart-provider";

export function CartCounter() {
  const { count } = useCart();
  return <span className="cart-count" aria-label={`${count} Artikel im Warenkorb`}>{count}</span>;
}
EOF_CART_COUNTER

cat > components/add-to-cart-button.tsx <<'EOF_ADD_CART'
"use client";

import type { Product, WoodId } from "@/lib/products";
import { woodOptions } from "@/lib/products";
import { useCart } from "./cart-provider";

export function AddToCartButton({ product, woodId }: { product: Product; woodId: WoodId }) {
  const { addItem } = useCart();
  const variant = product.variants[woodId];
  const wood = woodOptions.find((option) => option.id === woodId)!;

  return (
    <button
      className="primary-button full"
      onClick={() =>
        addItem({
          id: `${product.slug}-${woodId}`,
          productSlug: product.slug,
          productName: product.name,
          woodId,
          woodName: wood.name,
          price: variant.price,
          image: variant.images[0],
        })
      }
    >
      In den Warenkorb
    </button>
  );
}
EOF_ADD_CART

cat > components/header.tsx <<'EOF_HEADER'
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
        <Link href="/#kollektion">Kollektion</Link>
        <Link href="/#materialien">Materialien</Link>
        <Link href="/#fertigung">Fertigung</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/kontakt">Kontakt</Link>
      </nav>
      <Link href="/warenkorb" className="cart-link">
        Warenkorb <CartCounter />
      </Link>
    </header>
  );
}
EOF_HEADER

cat > components/footer.tsx <<'EOF_FOOTER'
import Link from "next/link";
import { shopConfig } from "@/lib/shop-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img src="/brand/lumenoak-logo.svg" alt="LumenOak" className="footer-logo" />
        <p className="footer-claim">{shopConfig.claim}</p>
        <p>
          3D-gedruckte Designlampen auf echtem Holzsockel – warmweiß,
          handmontiert und made-to-order.
        </p>
      </div>
      <div>
        <h3>Shop</h3>
        <Link href="/shop">Kollektion</Link>
        <Link href="/#materialien">Materialien</Link>
        <Link href="/#fertigung">Fertigung</Link>
        <Link href="/#faq">FAQ</Link>
      </div>
      <div>
        <h3>Service</h3>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/versand">Versand & Zahlung</Link>
        <Link href="/widerruf">Widerruf</Link>
        <Link href="/agb">AGB</Link>
      </div>
      <div>
        <h3>Rechtliches</h3>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <p className="footer-contact">{shopConfig.email}<br />{shopConfig.location}</p>
      </div>
    </footer>
  );
}
EOF_FOOTER

cat > components/product-card.tsx <<'EOF_PRODUCT_CARD'
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatEuro } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const [imageBroken, setImageBroken] = useState(false);
  const image = product.variants.eiche.images[0];

  return (
    <article className="product-card">
      <Link href={`/produkt/${product.slug}`} className="product-image-wrap">
        {!imageBroken ? (
          <img src={image} alt={`${product.name} in Eiche`} onError={() => setImageBroken(true)} />
        ) : (
          <div className={`lamp-fallback ${product.slug}`} aria-hidden="true">
            <span />
          </div>
        )}
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="product-card-bottom">
          <strong>ab {formatEuro(product.basePrice)}</strong>
          <Link href={`/produkt/${product.slug}`} className="text-link">Ansehen</Link>
        </div>
      </div>
    </article>
  );
}
EOF_PRODUCT_CARD

cat > components/product-detail-client.tsx <<'EOF_PRODUCT_DETAIL'
"use client";

import { useMemo, useState } from "react";
import type { Product, WoodId } from "@/lib/products";
import { safetyNotice, warnings, woodOptions } from "@/lib/products";
import { formatEuro } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductDetailClient({ product }: { product: Product }) {
  const [woodId, setWoodId] = useState<WoodId>("eiche");
  const [activeImage, setActiveImage] = useState(0);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const selectedVariant = product.variants[woodId];
  const selectedWood = woodOptions.find((wood) => wood.id === woodId)!;
  const images = selectedVariant.images;

  const imageLabels = useMemo(() => ["Front", "Anschluss", "Im Raum"], []);

  return (
    <div className="product-detail-grid">
      <section className="gallery-card">
        <div className="main-image-wrap">
          {!brokenImages[images[activeImage]] ? (
            <img
              src={images[activeImage]}
              alt={`${product.name} ${selectedWood.name} ${imageLabels[activeImage]}`}
              onError={() => setBrokenImages((state) => ({ ...state, [images[activeImage]]: true }))}
            />
          ) : (
            <div className={`lamp-fallback large ${product.slug}`} aria-hidden="true">
              <span />
            </div>
          )}
        </div>
        <div className="thumbs">
          {images.map((image, index) => (
            <button
              key={image}
              className={index === activeImage ? "active" : ""}
              onClick={() => setActiveImage(index)}
              type="button"
            >
              {imageLabels[index]}
            </button>
          ))}
        </div>
      </section>

      <section className="product-info-card">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="lead">{product.shortDescription}</p>
        <p>{product.description}</p>

        <div className="price-line">
          <span>Ausführung: {selectedWood.name}</span>
          <strong>{formatEuro(selectedVariant.price)}</strong>
        </div>

        <div className="wood-options" aria-label="Holzvariante auswählen">
          {woodOptions.map((wood) => (
            <button
              key={wood.id}
              type="button"
              className={wood.id === woodId ? "selected" : ""}
              onClick={() => {
                setWoodId(wood.id);
                setActiveImage(0);
              }}
            >
              <span className="wood-dot" style={{ background: wood.colorHint }} />
              <span>{wood.shortName}</span>
              {wood.priceAdd > 0 && <small>+{formatEuro(wood.priceAdd)}</small>}
            </button>
          ))}
        </div>
        <p className="wood-description">{selectedWood.description}</p>

        <AddToCartButton product={product} woodId={woodId} />

        <div className="mini-facts">
          <span>{product.dimensions}</span>
          <span>USB-C LED</span>
          <span>5–10 Werktage</span>
        </div>
      </section>

      <section className="detail-panel">
        <h2>Technik & Sicherheit</h2>
        <p>{safetyNotice}</p>
        <div className="spec-grid">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <ul className="warning-list">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
EOF_PRODUCT_DETAIL

cat > components/cart-client.tsx <<'EOF_CART_CLIENT'
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { formatEuro } from "@/lib/format";
import { shopConfig } from "@/lib/shop-config";

export function CartClient() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [message, setMessage] = useState("");
  const shipping = subtotal >= shopConfig.freeShippingFrom || subtotal === 0 ? 0 : shopConfig.shippingCost;
  const total = subtotal + shipping;

  async function startCheckout() {
    setMessage("Stripe ist vorbereitet, aber echte Zahlungsabwicklung muss mit Live-Keys aktiviert werden.");
  }

  if (items.length === 0) {
    return (
      <section className="section narrow cart-empty">
        <h1>Dein Warenkorb ist leer.</h1>
        <p>Entdecke die LumenOak Kollektion und wähle deine Holzvariante.</p>
        <Link href="/shop" className="primary-button">Zur Kollektion</Link>
      </section>
    );
  }

  return (
    <section className="section cart-page">
      <div>
        <p className="eyebrow">Warenkorb</p>
        <h1>Deine Auswahl</h1>
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={`${item.productName} ${item.woodName}`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div>
                <h3>{item.productName}</h3>
                <p>{item.woodName}</p>
                <p>{formatEuro(item.price)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} type="button">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} type="button">+</button>
              </div>
              <button className="remove-button" onClick={() => removeItem(item.id)} type="button">Entfernen</button>
            </article>
          ))}
        </div>
      </div>
      <aside className="cart-summary">
        <h2>Zusammenfassung</h2>
        <p><span>Zwischensumme</span><strong>{formatEuro(subtotal)}</strong></p>
        <p><span>Versand</span><strong>{shipping === 0 ? "kostenlos" : formatEuro(shipping)}</strong></p>
        <p className="summary-total"><span>Gesamt</span><strong>{formatEuro(total)}</strong></p>
        <small>Versandkosten klar vor Bestellung. Preise inkl. MwSt. bzw. Kleinunternehmerhinweis später rechtlich finalisieren.</small>
        <button className="primary-button full" onClick={startCheckout}>Zur Kasse</button>
        <button className="secondary-button full" onClick={clearCart}>Warenkorb leeren</button>
        {message && <p className="notice">{message}</p>}
      </aside>
    </section>
  );
}
EOF_CART_CLIENT

cat > app/globals.css <<'EOF_CSS'
:root {
  --dark: #111111;
  --dark-soft: #1b1b1b;
  --cream: #f5f1e8;
  --beige: #d9c8a8;
  --gold: #c79a4a;
  --wood: #8b6a42;
  --text-light: #fff8ea;
  --text-dark: #211a12;
  --muted: #766a5b;
  --line: rgba(139, 106, 66, 0.22);
  --radius: 28px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--cream);
  color: var(--text-dark);
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button { font: inherit; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px clamp(18px, 4vw, 56px);
  background: rgba(245, 241, 232, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);
}
.brand { display: flex; align-items: center; gap: 12px; min-width: max-content; }
.brand-logo { width: 42px; height: 42px; }
.brand-text { display: grid; line-height: 1.1; }
.brand-text strong { font-size: 18px; letter-spacing: .04em; }
.brand-text small { color: var(--muted); font-size: 12px; }
.main-nav { display: flex; gap: 18px; color: #403527; font-size: 14px; }
.main-nav a:hover { color: var(--gold); }
.cart-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 14px;
  background: rgba(255,255,255,.45);
}
.cart-count {
  display: inline-grid;
  place-items: center;
  min-width: 24px;
  height: 24px;
  border-radius: 999px;
  background: var(--dark);
  color: var(--text-light);
  font-size: 12px;
}

.hero {
  min-height: 78vh;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  padding: clamp(48px, 8vw, 110px) clamp(18px, 6vw, 88px);
  background:
    radial-gradient(circle at 72% 34%, rgba(199,154,74,.28), transparent 34%),
    linear-gradient(135deg, #15120e 0%, #231b13 52%, #0f0e0d 100%);
  color: var(--text-light);
}
.hero h1 { font-size: clamp(42px, 7vw, 86px); line-height: .95; letter-spacing: -0.06em; margin: 12px 0 22px; }
.hero p { color: rgba(255,248,234,.78); font-size: clamp(17px, 2vw, 21px); line-height: 1.65; max-width: 660px; }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 28px; }
.hero-card {
  border: 1px solid rgba(255,248,234,.16);
  border-radius: 36px;
  padding: 18px;
  background: rgba(255,255,255,.06);
  box-shadow: 0 30px 100px rgba(0,0,0,.35);
}
.hero-visual {
  min-height: 470px;
  border-radius: 28px;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 50% 35%, rgba(255,219,143,.8), rgba(255,210,121,.22) 38%, rgba(0,0,0,.12) 70%);
}
.trust-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
.trust-row span { border: 1px solid rgba(255,248,234,.18); padding: 8px 12px; border-radius: 999px; color: rgba(255,248,234,.82); font-size: 13px; }

.section { padding: clamp(54px, 8vw, 96px) clamp(18px, 6vw, 88px); }
.section.narrow { max-width: 920px; margin: 0 auto; }
.section-header { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 30px; }
.section-header h2, .section h1 { font-size: clamp(34px, 5vw, 58px); letter-spacing: -0.045em; line-height: 1; margin: 0; }
.eyebrow { text-transform: uppercase; letter-spacing: .18em; font-size: 12px; color: var(--gold); font-weight: 700; }
.lead { font-size: 20px; line-height: 1.55; color: #4f4336; }

.primary-button, .secondary-button, .text-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 13px 18px;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
}
.primary-button { background: var(--gold); color: #160f08; box-shadow: 0 12px 30px rgba(199,154,74,.25); }
.secondary-button { background: transparent; border-color: var(--line); color: var(--text-dark); }
.hero .secondary-button { color: var(--text-light); border-color: rgba(255,248,234,.25); }
.full { width: 100%; }
.text-link { padding: 0; color: var(--gold); }

.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.product-card {
  background: rgba(255,255,255,.55);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 18px 55px rgba(67,42,15,.06);
}
.product-image-wrap { min-height: 340px; display: grid; place-items: center; background: #efe6d5; overflow: hidden; }
.product-image-wrap img { width: 100%; height: 340px; object-fit: cover; }
.product-card-body { padding: 22px; }
.product-card h3 { font-size: 24px; margin: 0 0 10px; }
.product-card p { color: var(--muted); line-height: 1.55; }
.product-card-bottom { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 18px; }

.lamp-fallback {
  width: 180px; height: 260px; border-radius: 38% 38% 24px 24px;
  position: relative; background: repeating-linear-gradient(90deg, rgba(255,255,255,.2), rgba(255,255,255,.2) 6px, rgba(255,226,159,.7) 7px, rgba(255,226,159,.7) 12px), radial-gradient(circle, #ffe8a8, #ffcb69 60%, #fff0 65%);
  box-shadow: 0 0 80px rgba(255,196,87,.55);
}
.lamp-fallback::after { content: ""; position: absolute; left: 50%; bottom: -52px; transform: translateX(-50%); width: 170px; height: 62px; border-radius: 22px; background: linear-gradient(90deg, #9a642d, #c58a3c); }
.lamp-fallback.large { width: 260px; height: 360px; }
.lamp-fallback.lace-glow { border-radius: 48%; background: radial-gradient(circle, rgba(255,229,156,.9), rgba(255,203,105,.55)), repeating-linear-gradient(45deg, transparent 0 16px, rgba(255,255,255,.5) 17px 21px); }
.lamp-fallback.halo { border-radius: 999px 999px 34px 34px; }
.lamp-fallback.edge { border-radius: 18px; clip-path: polygon(18% 0, 82% 0, 100% 28%, 86% 100%, 14% 100%, 0 28%); }
.lamp-fallback.column { width: 120px; height: 340px; border-radius: 999px; }
.lamp-fallback.bloom { border-radius: 50% 50% 28% 28%; clip-path: polygon(50% 0, 60% 14%, 72% 2%, 77% 23%, 96% 13%, 86% 45%, 100% 62%, 82% 100%, 18% 100%, 0 62%, 14% 45%, 4% 13%, 23% 23%, 28% 2%, 40% 14%); }

.product-detail-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 28px; padding: clamp(30px, 6vw, 80px) clamp(18px, 6vw, 88px); }
.gallery-card, .product-info-card, .detail-panel, .cart-summary, .content-card {
  background: rgba(255,255,255,.58);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(20px, 3vw, 32px);
}
.main-image-wrap { min-height: 560px; display: grid; place-items: center; border-radius: 22px; background: #efe6d5; overflow: hidden; }
.main-image-wrap img { width: 100%; height: 560px; object-fit: cover; }
.thumbs { display: flex; gap: 10px; margin-top: 14px; }
.thumbs button, .wood-options button, .quantity-controls button, .remove-button {
  border: 1px solid var(--line); border-radius: 999px; background: #fffaf0; padding: 10px 14px; cursor: pointer;
}
.thumbs button.active, .wood-options button.selected { border-color: var(--gold); box-shadow: inset 0 0 0 1px var(--gold); }
.product-info-card h1 { font-size: clamp(38px, 5vw, 64px); margin: 0 0 12px; letter-spacing: -0.05em; }
.price-line { display: flex; align-items: center; justify-content: space-between; gap: 20px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 18px 0; margin: 24px 0; }
.price-line strong { font-size: 32px; }
.wood-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.wood-options button { display: flex; align-items: center; gap: 10px; justify-content: flex-start; }
.wood-dot { width: 22px; height: 22px; border-radius: 50%; border: 1px solid rgba(0,0,0,.12); }
.wood-options small { margin-left: auto; color: var(--muted); }
.wood-description { color: var(--muted); }
.mini-facts { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
.mini-facts span { background: #fffaf0; border: 1px solid var(--line); border-radius: 999px; padding: 8px 10px; font-size: 13px; }
.detail-panel { grid-column: 1 / -1; }
.spec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
.spec-grid div { background: #fffaf0; border: 1px solid var(--line); border-radius: 18px; padding: 14px; display: grid; gap: 6px; }
.spec-grid span { color: var(--muted); font-size: 13px; }
.warning-list { margin: 18px 0 0; padding-left: 20px; color: #5a3820; }

.material-grid, .feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.material-card, .feature-card { border: 1px solid var(--line); border-radius: 24px; padding: 20px; background: rgba(255,255,255,.52); }
.material-swatch { width: 100%; height: 62px; border-radius: 16px; margin-bottom: 14px; border: 1px solid var(--line); }
.dark-band { background: var(--dark); color: var(--text-light); }
.dark-band .lead, .dark-band p { color: rgba(255,248,234,.74); }
.dark-band .content-card { background: rgba(255,255,255,.07); border-color: rgba(255,255,255,.14); }
.faq-list { display: grid; gap: 12px; max-width: 980px; }
.faq-list details { border: 1px solid var(--line); border-radius: 18px; padding: 18px 20px; background: rgba(255,255,255,.55); }
.faq-list summary { cursor: pointer; font-weight: 800; }
.faq-list p { color: var(--muted); line-height: 1.6; }

.site-footer { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 30px; padding: 56px clamp(18px, 6vw, 88px); background: #111; color: var(--text-light); }
.site-footer a, .site-footer p { display: block; color: rgba(255,248,234,.7); margin: 8px 0; line-height: 1.55; }
.site-footer h3 { margin-top: 0; }
.footer-logo { width: 58px; height: 58px; }
.footer-claim { color: var(--gold)!important; }
.footer-contact { margin-top: 18px!important; }

.cart-page { display: grid; grid-template-columns: 1fr 360px; gap: 26px; }
.cart-items { display: grid; gap: 14px; }
.cart-item { display: grid; grid-template-columns: 90px 1fr auto auto; align-items: center; gap: 14px; border: 1px solid var(--line); border-radius: 22px; padding: 14px; background: rgba(255,255,255,.55); }
.cart-item img { width: 90px; height: 90px; border-radius: 16px; object-fit: cover; }
.quantity-controls { display: flex; align-items: center; gap: 8px; }
.remove-button { color: #6d321b; }
.cart-summary { height: fit-content; position: sticky; top: 100px; }
.cart-summary p { display: flex; justify-content: space-between; gap: 18px; }
.summary-total { border-top: 1px solid var(--line); padding-top: 16px; font-size: 20px; }
.notice { background: #fff4d9; border: 1px solid #e7c87a; padding: 12px; border-radius: 14px; }
.cart-empty { text-align: center; min-height: 55vh; display: grid; place-items: center; }

.legal-page { line-height: 1.75; }
.legal-page h1 { margin-bottom: 12px; }
.legal-page h2 { margin-top: 32px; }
.legal-page .notice { margin: 20px 0; }

@media (max-width: 980px) {
  .hero, .product-detail-grid, .cart-page { grid-template-columns: 1fr; }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .material-grid, .feature-grid, .spec-grid { grid-template-columns: repeat(2, 1fr); }
  .site-footer { grid-template-columns: 1fr 1fr; }
  .main-nav { display: none; }
}
@media (max-width: 620px) {
  .product-grid, .material-grid, .feature-grid, .spec-grid, .wood-options, .site-footer { grid-template-columns: 1fr; }
  .cart-item { grid-template-columns: 70px 1fr; }
  .hero h1 { font-size: 44px; }
  .brand-text small { display: none; }
}
EOF_CSS

cat > app/layout.tsx <<'EOF_LAYOUT'
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = {
  title: "LumenOak – 3D-gedruckte Designlampen mit Holzsockel",
  description:
    "Handgefertigte 3D-gedruckte Tischlampen und Nachtlichter mit echtem Holzsockel. Warmweißes LED-Licht, USB-C Anschluss und individuelle Holzvarianten.",
  keywords: [
    "3D gedruckte Lampe",
    "Designlampe Holzsockel",
    "Tischlampe warmweiß",
    "Nachttischlampe Holz",
    "USB-C Lampe",
    "moderne Tischlampe",
    "handgemachte Lampe",
    "Ambient Light",
    "Designleuchte Holz",
  ],
  metadataBase: new URL(shopConfig.domain),
  openGraph: {
    title: "LumenOak – Licht in Form gebracht",
    description:
      "3D-gedruckte Designlampen auf echtem Holzsockel – warmweiß, handmontiert und made-to-order.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
EOF_LAYOUT

cat > app/page.tsx <<'EOF_HOME'
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products, woodOptions } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

const faq = [
  ["Wie werden die Lampen betrieben?", "Alle LumenOak Lampen werden über ein fest integriertes warmweißes LED-Modul mit USB-C betrieben."],
  ["Kann ich eine normale Glühbirne einsetzen?", "Nein. Die Lampen sind nicht für klassische Glühbirnen, Halogenlampen oder heiße Leuchtmittel geeignet."],
  ["Welche Holzarten gibt es?", "Eiche, Ahorn, schwarz geölte Eiche und Nussbaum."],
  ["Wird jede Lampe auf Bestellung gefertigt?", "Ja. Jede Lampe wird made-to-order gefertigt und handmontiert."],
  ["Wie lange dauert die Lieferung?", "In der Regel 5–10 Werktage, abhängig vom Modell und der aktuellen Auftragslage."],
  ["Sind kleine Unterschiede normal?", "Ja. Holz ist ein Naturmaterial und 3D-Druck kann minimale Unterschiede zeigen. Jede Lampe ist dadurch leicht individuell."],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">3D-Druck · Massivholz · Warmweiß</p>
          <h1>Designlampen, die Wärme in Form bringen.</h1>
          <p>
            3D-gedruckte Tischlampen auf echtem Holzsockel – warmweiß, modern und auf Bestellung gefertigt. Für Nachttisch, Sideboard und gemütliche Wohnräume.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="primary-button">Kollektion ansehen</Link>
            <Link href="#materialien" className="secondary-button">Materialien entdecken</Link>
          </div>
          <div className="trust-row">
            <span>Handmontiert</span>
            <span>USB-C LED</span>
            <span>Echte Holzsockel</span>
            <span>Made-to-order</span>
            <span>{shopConfig.productionTime}</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-visual">
            <div className="lamp-fallback large wave-mini"><span /></div>
          </div>
        </div>
      </section>

      <section id="kollektion" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Kollektion</p>
            <h2>Lampen für warme Räume.</h2>
          </div>
          <Link href="/shop" className="text-link">Alle ansehen</Link>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <section id="materialien" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Materialien</p>
            <h2>Echtes Holz. Warmes Licht. Klare Formen.</h2>
          </div>
        </div>
        <p className="lead">
          Jede LumenOak Lampe kombiniert einen 3D-gedruckten Schirm mit einem echten Holzsockel. Je nach Modell stehen Eiche, Ahorn, schwarz geölte Eiche und Nussbaum zur Auswahl.
        </p>
        <div className="material-grid">
          {woodOptions.map((wood) => (
            <article className="material-card" key={wood.id}>
              <div className="material-swatch" style={{ background: wood.colorHint }} />
              <h3>{wood.name}</h3>
              <p>{wood.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="fertigung" className="section dark-band">
        <div className="section-header">
          <div>
            <p className="eyebrow">Fertigung & Technik</p>
            <h2>Für LED entwickelt, nicht für heiße Leuchtmittel.</h2>
          </div>
        </div>
        <div className="feature-grid">
          <article className="content-card"><h3>3D-gedruckter Schirm</h3><p>Transluzentes PLA/PETG mit warmer Lichtstreuung und klarer Formgebung.</p></article>
          <article className="content-card"><h3>USB-C LED</h3><p>Fest integriertes warmweißes LED-Modul mit geringer Wärmeentwicklung.</p></article>
          <article className="content-card"><h3>Massivholzsockel</h3><p>Geschliffen, geölt und handmontiert – jede Holzmaserung ist individuell.</p></article>
          <article className="content-card"><h3>Made-to-order</h3><p>Produktion nach Bestellung, dadurch weniger Lagerware und mehr Individualität.</p></article>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Häufige Fragen.</h2>
          </div>
        </div>
        <div className="faq-list">
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
EOF_HOME

cat > app/shop/page.tsx <<'EOF_SHOP'
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
          <p className="lead">Wähle dein Design und danach die passende Holzvariante: Eiche, Ahorn, schwarz geölte Eiche oder Nussbaum.</p>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
EOF_SHOP

cat > app/produkt/[slug]/page.tsx <<'EOF_PRODUCT_PAGE'
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} – 3D-gedruckte Tischlampe mit Holzsockel | LumenOak`,
    description: `${product.name} von LumenOak: ${product.shortDescription} Warmweißes LED-Licht, USB-C Anschluss und individuelle Holzvarianten.`,
    keywords: product.keywords,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
EOF_PRODUCT_PAGE

cat > app/warenkorb/page.tsx <<'EOF_CART_PAGE'
import { CartClient } from "@/components/cart-client";

export const metadata = {
  title: "Warenkorb – LumenOak",
};

export default function WarenkorbPage() {
  return <CartClient />;
}
EOF_CART_PAGE

cat > app/kontakt/page.tsx <<'EOF_CONTACT'
import { shopConfig } from "@/lib/shop-config";

export const metadata = {
  title: "Kontakt – LumenOak",
};

export default function KontaktPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Kontakt</p>
      <h1>Kontakt zu LumenOak</h1>
      <p>Du hast Fragen zu Modellen, Holzvarianten, Lieferzeit oder einer individuellen Anfrage?</p>
      <div className="content-card">
        <p><strong>E-Mail:</strong> {shopConfig.email}</p>
        <p><strong>Standort:</strong> {shopConfig.location}</p>
      </div>
      <p className="notice">Hinweis: Vor dem echten Verkaufsstart bitte finale Unternehmensdaten, rechtliche Texte und E-Mail-Zustellung prüfen.</p>
    </section>
  );
}
EOF_CONTACT

cat > app/impressum/page.tsx <<'EOF_IMPRESSUM'
export const metadata = { title: "Impressum – LumenOak" };

export default function ImpressumPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Impressum</h1>
      <p className="notice">Platzhalter: Vor Veröffentlichung mit echten Unternehmensdaten ersetzen.</p>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>Vorname Nachname / Unternehmen<br />Straße Hausnummer<br />PLZ Ort<br />Deutschland</p>
      <h2>Kontakt</h2>
      <p>E-Mail: info@lumenoak.de</p>
      <h2>Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer oder Kleinunternehmerhinweis hier final eintragen.</p>
    </section>
  );
}
EOF_IMPRESSUM

cat > app/datenschutz/page.tsx <<'EOF_DATENSCHUTZ'
export const metadata = { title: "Datenschutz – LumenOak" };

export default function DatenschutzPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Datenschutzerklärung</h1>
      <p className="notice">Platzhalter: Vor Verkaufsstart final rechtlich prüfen und verwendete Dienste ergänzen.</p>
      <h2>Verantwortlicher</h2>
      <p>Verantwortliche Stelle und Kontaktdaten hier eintragen.</p>
      <h2>Hosting</h2>
      <p>Diese Website kann über Vercel gehostet werden. Details zur Datenverarbeitung final ergänzen.</p>
      <h2>Zahlungsabwicklung</h2>
      <p>Falls Stripe genutzt wird, Stripe als Zahlungsdienstleister mit Datenschutzhinweisen ergänzen.</p>
      <h2>Kontaktaufnahme</h2>
      <p>Bei Kontaktaufnahme per E-Mail werden die Angaben zur Bearbeitung der Anfrage verarbeitet.</p>
    </section>
  );
}
EOF_DATENSCHUTZ

cat > app/agb/page.tsx <<'EOF_AGB'
export const metadata = { title: "AGB – LumenOak" };

export default function AgbPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Allgemeine Geschäftsbedingungen</h1>
      <p className="notice">Platzhalter: Vor echtem Verkauf rechtlich prüfen lassen, besonders wegen made-to-order, Gewährleistung, Versand und Verbraucherrechten.</p>
      <h2>Geltungsbereich</h2>
      <p>Diese AGB gelten für Bestellungen über den LumenOak Online-Shop.</p>
      <h2>Produkte</h2>
      <p>Die Lampen werden auf Bestellung gefertigt. Holzmaserung und leichte produktionsbedingte Unterschiede können variieren.</p>
      <h2>Preise und Versand</h2>
      <p>Alle Preise und Versandkosten werden im Bestellprozess ausgewiesen.</p>
    </section>
  );
}
EOF_AGB

cat > app/widerruf/page.tsx <<'EOF_WIDERRUF'
export const metadata = { title: "Widerruf – LumenOak" };

export default function WiderrufPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Rechtliches</p>
      <h1>Widerrufsbelehrung</h1>
      <p className="notice">Platzhalter: Vor Verkaufsstart final rechtlich prüfen. Besonders wichtig bei personalisierten oder auf Bestellung gefertigten Produkten.</p>
      <h2>Widerrufsrecht</h2>
      <p>Verbraucher haben grundsätzlich ein Widerrufsrecht. Details und Ausnahmen müssen final rechtlich korrekt eingetragen werden.</p>
      <h2>Widerrufsformular</h2>
      <p>Ein Muster-Widerrufsformular hier einfügen.</p>
    </section>
  );
}
EOF_WIDERRUF

cat > app/versand/page.tsx <<'EOF_VERSAND'
import { shopConfig } from "@/lib/shop-config";
import { formatEuro } from "@/lib/format";

export const metadata = { title: "Versand & Zahlung – LumenOak" };

export default function VersandPage() {
  return (
    <section className="section narrow legal-page">
      <p className="eyebrow">Service</p>
      <h1>Versand & Zahlung</h1>
      <h2>Lieferzeit</h2>
      <p>Die Lampen werden made-to-order gefertigt. Die Lieferzeit beträgt in der Regel {shopConfig.productionTime}.</p>
      <h2>Versandkosten</h2>
      <p>Versandkosten: {formatEuro(shopConfig.shippingCost)}. Kostenloser Versand ab {formatEuro(shopConfig.freeShippingFrom)} Bestellwert.</p>
      <h2>Zahlung</h2>
      <p>Stripe Checkout ist vorbereitet und muss vor Livegang mit echten Zahlungsdaten aktiviert werden.</p>
    </section>
  );
}
EOF_VERSAND

cat > app/robots.ts <<'EOF_ROBOTS'
import { MetadataRoute } from "next";
import { shopConfig } from "@/lib/shop-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${shopConfig.domain}/sitemap.xml`,
  };
}
EOF_ROBOTS

cat > app/sitemap.ts <<'EOF_SITEMAP'
import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = shopConfig.domain;
  return [
    "",
    "/shop",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf",
    "/versand",
    ...products.map((product) => `/produkt/${product.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
EOF_SITEMAP

cat > app/api/checkout/route.ts <<'EOF_CHECKOUT'
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Stripe Checkout ist vorbereitet. Für echte Zahlungen müssen STRIPE_SECRET_KEY, NEXT_PUBLIC_SITE_URL und Produkt-/Preislogik final verbunden werden.",
    },
    { status: 501 }
  );
}
EOF_CHECKOUT

cat > app/api/webhook/route.ts <<'EOF_WEBHOOK'
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ received: true, message: "Webhook-Platzhalter" });
}
EOF_WEBHOOK

cat > public/brand/lumenoak-logo.svg <<'EOF_LOGO'
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="64" fill="#111111"/>
  <path d="M128 36C159.5 61.5 179 91 179 124C179 157.1 156.2 181 128 181C99.8 181 77 157.1 77 124C77 91 96.5 61.5 128 36Z" fill="#C79A4A"/>
  <path d="M128 58C146.5 79.5 157 101 157 124C157 146.6 144 161 128 161C112 161 99 146.6 99 124C99 101 109.5 79.5 128 58Z" fill="#FFF8EA"/>
  <path d="M70 202H186" stroke="#C79A4A" stroke-width="12" stroke-linecap="round"/>
  <path d="M96 220H160" stroke="#FFF8EA" stroke-width="8" stroke-linecap="round"/>
</svg>
EOF_LOGO

cat > public/favicon.svg <<'EOF_FAVICON'
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="16" fill="#111111"/>
  <path d="M32 9C41 17 47 25 47 34C47 43 40 50 32 50C24 50 17 43 17 34C17 25 23 17 32 9Z" fill="#C79A4A"/>
  <path d="M32 18C37 24 40 29 40 34C40 39 36 43 32 43C28 43 24 39 24 34C24 29 27 24 32 18Z" fill="#FFF8EA"/>
</svg>
EOF_FAVICON

# .gitignore reparieren/erweitern
if [ ! -f .gitignore ]; then
  touch .gitignore
fi
if ! grep -q "node_modules" .gitignore; then echo "node_modules" >> .gitignore; fi
if ! grep -q ".next" .gitignore; then echo ".next" >> .gitignore; fi
if ! grep -q ".env" .gitignore; then echo ".env*" >> .gitignore; fi
if ! grep -q "_backup_lumenoak" .gitignore; then echo "_backup_lumenoak_*" >> .gitignore; fi

# TypeScript Build-Check vorbereiten
if [ ! -f next-env.d.ts ]; then
cat > next-env.d.ts <<'EOF_NEXT_ENV'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
EOF_NEXT_ENV
fi

echo ""
echo "✅ LumenOak Master-Update wurde geschrieben."
echo ""
echo "Wichtig: Deine Produktbilder müssen jetzt in diesen Ordner:"
echo "  public/products/"
echo ""
echo "Beispiel-Dateinamen:"
echo "  wave-mini-eiche-front.webp"
echo "  wave-mini-eiche-anschluss.webp"
echo "  wave-mini-eiche-raum.webp"
echo ""
echo "Test im Codespace:"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "Wenn alles passt, pushen:"
echo "  git add ."
echo "  git commit -m 'Update shop to LumenOak brand and products'"
echo "  git push"
echo ""

if [ "${1:-}" = "--commit" ]; then
  echo "Commit + Push wird ausgeführt..."
  git add .
  git commit -m "Update shop to LumenOak brand and products" || true
  git push
fi
