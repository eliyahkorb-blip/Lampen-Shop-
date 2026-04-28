"use client";

import { useCart } from "./cart-provider";

export function CartCounter() {
  const { count } = useCart();
  return <span className="cart-count" aria-label={`${count} Artikel im Warenkorb`}>{count}</span>;
}
