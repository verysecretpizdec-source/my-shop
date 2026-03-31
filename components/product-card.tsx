"use client";

import { useState } from "react";

import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
  isAdding: boolean;
  onAdd: (productId: number) => void;
}

export function ProductCard({ product, index, isAdding, onAdd }: ProductCardProps) {
  const [isImageBroken, setIsImageBroken] = useState(false);

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-[#1f1f1f] dark:text-zinc-100"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {isImageBroken ? (
        <div className="flex h-52 w-full items-center justify-center bg-zinc-200 px-4 text-center text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
          {product.name}
        </div>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="h-52 w-full object-cover"
            onError={() => setIsImageBroken(true)}
          />
        </>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-h-14 font-semibold">{product.name}</h3>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="line-clamp-2 min-h-12 text-sm text-zinc-500 dark:text-zinc-400">
          {product.description}
        </p>
        <button
          onClick={() => onAdd(product.id)}
          className="mt-auto w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          disabled={isAdding}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
