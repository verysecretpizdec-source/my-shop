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
      "https://images.unsplash.com/photo-1587829741301-dc798e83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Running Sneakers",
    price: 129,
    category: "clothing",
    description: "Lightweight sneakers for daily running.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Portable SSD 1TB",
    price: 149,
    category: "electronics",
    description: "Fast portable SSD with USB-C connection.",
    image:
      "https://images.unsplash.com/photo-1588872651728-2f5f8f3f2f2f?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1544947958-8b1f8f0f8f8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Clean Code",
    price: 45,
    category: "books",
    description: "Must-read book about writing clean and maintainable code.",
    image:
      "https://images.unsplash.com/photo-1544947958-8b1f8f0f8f8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "AirPods Pro 2",
    price: 249,
    category: "electronics",
    description: "Premium wireless earbuds with noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Classic Denim Jacket",
    price: 79,
    category: "clothing",
    description: "Timeless denim jacket for casual look.",
    image:
      "https://images.unsplash.com/photo-1544967273-6c5f1c5f0f1f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Designing Data-Intensive Applications",
    price: 59,
    category: "books",
    description: "Deep technical book about scalable systems and databases.",
    image:
      "https://images.unsplash.com/photo-1544947958-8b1f8f0f8f8f?auto=format&fit=crop&w=800&q=80",
  },
];

export const CATEGORIES = [
  "all",
  "clothing",
  "electronics",
  "books",
  "accessories",
] as const;