"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./cart-provider";

export function AddToCartButton({ productId, label = "In den Warenkorb" }: { productId: string; label?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        className="btn btn-primary btn-full"
        onClick={() => {
          addItem(productId);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 2200);
        }}
      >
        {added ? "Hinzugefügt ✓" : label}
      </button>
      {added && (
        <Link className="btn btn-secondary btn-full" href="/warenkorb">
          Zum Warenkorb
        </Link>
      )}
    </div>
  );
}
