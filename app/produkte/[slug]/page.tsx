import { redirect } from "next/navigation";
export default async function ProdukteSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/produkt/${slug}`);
}
