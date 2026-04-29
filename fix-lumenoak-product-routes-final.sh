#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Repariere Produkt-Routen für LumenOak..."

mkdir -p app/produkt/[slug]
mkdir -p app/product/[slug]

cat > app/produkt/[slug]/page.tsx <<'EOF'
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getProduct, products } from "@/lib/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Produkt nicht gefunden – LumenOak",
    };
  }

  return {
    title: `${product.name} – 3D-gedruckte Tischlampe mit Holzsockel | LumenOak`,
    description: product.shortDescription,
    keywords: product.keywords,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <section className="section product-page">
      <ProductDetailClient product={product} />
    </section>
  );
}
EOF

cat > app/product/[slug]/page.tsx <<'EOF'
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function OldProductRoute({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  redirect(`/produkt/${slug}`);
}
EOF

# Produktkarten sicher auf die deutsche Route setzen
if [ -f components/product-card.tsx ]; then
  python3 - <<'PY'
from pathlib import Path
p = Path("components/product-card.tsx")
s = p.read_text()
s = s.replace('href={`/product/${product.slug}`}', 'href={`/produkt/${product.slug}`}')
s = s.replace('href={"/product/" + product.slug}', 'href={"/produkt/" + product.slug}')
s = s.replace('href={`/produkte/${product.slug}`}', 'href={`/produkt/${product.slug}`}')
s = s.replace('href={"/produkte/" + product.slug}', 'href={"/produkt/" + product.slug}')
p.write_text(s)
PY
fi

# Sicherheits-Check: Slugs anzeigen
echo ""
echo "✅ Produkt-Routen wurden repariert."
echo ""
echo "Diese Produktseiten sollten jetzt funktionieren:"
echo "  /produkt/wave-mini"
echo "  /produkt/lace-glow"
echo "  /produkt/halo"
echo "  /produkt/edge"
echo "  /produkt/column"
echo "  /produkt/bloom"
echo ""
echo "Auch alte /product/... Links werden jetzt automatisch weitergeleitet."
echo ""
echo "Jetzt bitte Dev-Server neu starten:"
echo "  npm run dev"
