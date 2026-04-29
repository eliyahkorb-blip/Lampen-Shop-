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
