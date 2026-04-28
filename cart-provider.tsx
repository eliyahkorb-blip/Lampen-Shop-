"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";

export type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  items: CartLine[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dito-lampen-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hasLoaded]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalCents = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product?.priceCents || 0) * item.quantity;
    }, 0);

    return {
      items,
      addItem: (productId, quantity = 1) => {
        setItems((current) => {
          const product = products.find((entry) => entry.id === productId);
          if (!product) return current;
          const existing = current.find((item) => item.productId === productId);
          if (!existing) return [...current, { productId, quantity: Math.min(quantity, product.stock) }];
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
              : item,
          );
        });
      },
      removeItem: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
      updateQuantity: (productId, quantity) => {
        setItems((current) =>
          current
            .map((item) => {
              if (item.productId !== productId) return item;
              const product = products.find((entry) => entry.id === productId);
              return { ...item, quantity: Math.max(1, Math.min(quantity, product?.stock || 1)) };
            })
            .filter((item) => item.quantity > 0),
        );
      },
      clearCart: () => setItems([]),
      count,
      subtotalCents,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
