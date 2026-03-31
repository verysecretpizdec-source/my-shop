export type Category = "electronics" | "clothing" | "books" | "accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface CheckoutPayload {
  name: string;
  address: string;
  phone: string;
  items: CartItem[];
}
