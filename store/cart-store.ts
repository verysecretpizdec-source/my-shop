"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }

          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "my-shop-cart",
    },
  ),
);
