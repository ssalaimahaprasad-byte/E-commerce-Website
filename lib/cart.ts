"use client";
import { useEffect, useState } from "react";

export type CartLine = { productId: string; slug: string; name: string; priceMinor: number; image: string; quantity: number };
const KEY = "renzocart:cart";
const LEGACY_KEY = "novacart:cart";

export const readCart = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
function write(c: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(c));
  localStorage.setItem(LEGACY_KEY, JSON.stringify(c));
  window.dispatchEvent(new Event("cart"));
}

export function addToCart(l: Omit<CartLine, "quantity">, q = 1) {
  const c = readCart(); const e = c.find((x) => x.productId === l.productId);
  e ? (e.quantity = Math.min(10, e.quantity + q)) : c.push({ ...l, quantity: q }); write(c);
}
export const setQty = (id: string, q: number) => write(readCart().map((x) => (x.productId === id ? { ...x, quantity: Math.max(1, Math.min(10, q)) } : x)));
export const removeLine = (id: string) => write(readCart().filter((x) => x.productId !== id));
export const clearCart = () => write([]);

export function useCart() {
  const [cart, set] = useState<CartLine[]>([]);
  useEffect(() => { const f = () => set(readCart()); f(); window.addEventListener("cart", f); return () => window.removeEventListener("cart", f); }, []);
  return cart;
}
