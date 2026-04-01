"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { checkoutAction } from "@/app/actions";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product, SortOption } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";

const sortProducts = (products: Product[], sort: SortOption) => {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "name-asc":
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
};

export function ShopClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const { items, addItem, updateQuantity, removeItem, clearCart } = useCartStore();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to load products");
      return response.json() as Promise<Product[]>;
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: checkoutAction,
    onSuccess: (result) => {
      setMessage(result.message);
      if (result.ok) {
        clearCart();
        setName("");
        setAddress("");
        setPhone("");
      }
    },
  });

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const bySearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);
      const byCategory = category === "all" || product.category === category;
      const byPrice = product.price <= maxPrice;
      return bySearch && byCategory && byPrice;
    });

    return sortProducts(filtered, sort);
  }, [products, search, category, maxPrice, sort]);

  useEffect(() => {
    // TODO: потом переделать на useMemo, пока так работает
    const timer = setTimeout(() => {
      const nextTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(nextTotal);
    }, 100);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Daily Store</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
             Simple online store built with Next.js 15
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-700 dark:bg-[#1f1f1f] dark:text-zinc-100">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as (typeof CATEGORIES)[number])
            }
            className="rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">
              Max price: {formatPrice(maxPrice)}
            </label>
            <input
              type="range"
              min={20}
              max={500}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full"
            />
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price low-high</option>
            <option value="price-desc">Price high-low</option>
          </select>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-700 dark:bg-[#1f1f1f] dark:text-zinc-300">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-700 dark:bg-[#1f1f1f] dark:text-zinc-300">
            No products found. Try changing your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isAdding={false}
                onAdd={(productId) => {
                  const selectedProduct = products.find((item) => item.id === productId);
                  if (!selectedProduct) return;
                  addItem(selectedProduct);
                  setMessage(`${selectedProduct.name} added to cart.`);
                }}
              />
            ))}
          </div>
        )}
      </section>

      <motion.aside
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 dark:border-zinc-700 dark:bg-[#1f1f1f] dark:text-zinc-100"
      >
        <h2 className="text-xl font-semibold">Cart</h2>
        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-100 p-4 shadow-sm 
                           dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 flex gap-4"
              >
                {/* Маленькая картинка товара */}
                <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600">
                 <img
                 src={item.image}
                 alt={item.name}
                 className="w-full h-full object-cover"
                 style={{ objectPosition: '50% 50%' }} 
                 onError={(e) => {
                e.currentTarget.src = "https://placehold.co/56x56/27272a/9ca3af?text=×";
                }}
               />
              </div>
            
                {/* Информация о товаре */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <p className="text-sm font-medium leading-tight line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        ${item.price}
                      </p>
                    </div>
            
                    <button
                      onClick={() => removeItem(item.id)}
                      type="button"
                      className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white 
                                 hover:bg-red-600 transition-colors flex-shrink-0"
                    >
                      X
                    </button>
                  </div>
            
                  
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 rounded-lg border border-zinc-300 dark:border-zinc-600 
                                 flex items-center justify-center text-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-lg border border-zinc-300 dark:border-zinc-600 
                                 flex items-center justify-center text-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <p className="flex items-center justify-between text-sm">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </p>
        </div>

        <form
          className="mt-4 space-y-2"
          onSubmit={(event) => {
            event.preventDefault();
            checkoutMutation.mutate({ name, address, phone, items });
          }}
        >
          <h3 className="text-sm font-semibold">Checkout</h3>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            required
          />
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            required
          />
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone"
            className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            required
          />
          <button
            type="submit"
            disabled={items.length === 0 || checkoutMutation.isPending}
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            Place order
          </button>
        </form>

        {message ? (
          <p className="mt-3 rounded-xl bg-zinc-100 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {message}
          </p>
        ) : null}
      </motion.aside>
    </div>
  );
}
