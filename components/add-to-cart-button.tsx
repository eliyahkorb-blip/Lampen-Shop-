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
