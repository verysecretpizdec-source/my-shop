import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Minimal Cotton Hoodie",
    price: 69,
    category: "clothing",
    description: "Soft premium hoodie with relaxed fit for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Leather Backpack",
    price: 89,
    category: "accessories",
    description: "Compact backpack for laptop and essentials.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 119,
    category: "electronics",
    description: "Mechanical keyboard with tactile switches.",
    image:
      "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Running Sneakers",
    price: 129,
    category: "clothing",
    description: "Lightweight sneakers for daily running.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "HP Color Laser",
    price: 149,
    category: "electronics",
    description: "Compact and efficient laser printer perfect for home and small office use.",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Wool Blend Coat",
    price: 189,
    category: "clothing",
    description: "Warm and elegant coat for cold weather.",
    image:
      "https://images.unsplash.com/photo-1544967273-6c5f1c5f0f1f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "UltraWide 34 Monitor",
    price: 499,
    category: "electronics",
    description: "34-inch curved monitor for productivity.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "The Pragmatic Programmer",
    price: 54,
    category: "books",
    description: "Classic book about software development best practices.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Clean Code",
    price: 45,
    category: "books",
    description: "Must-read book about writing clean and maintainable code.",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Sony Headphones",
    price: 249,
    category: "electronics",
    description: "Premium wireless earbuds with noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Classic Denim Jacket",
    price: 79,
    category: "clothing",
    description: "Timeless denim jacket for casual look.",
    image:
      "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "How innovations works",
    price: 59,
    category: "books",
    description: "Practical guide to understanding how breakthrough innovations actually happen.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
  },
];

export const CATEGORIES = [
  "all",
  "clothing",
  "electronics",
  "books",
  "accessories",
] as const;