import { beforeEach, describe, expect, it } from "vitest";

import { useCartStore } from "@/store/cart-store";

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("adds product to cart", () => {
    // проверяем, что товар добавляется
    useCartStore.getState().addItem({
      id: 1,
      name: "Test Product",
      price: 100,
      description: "Simple description",
      image: "https://example.com/image.jpg",
      category: "electronics",
    });

    const items = useCartStore.getState().items;
    // и что количество стартует с 1
    expect(items).toHaveLength(1);
    expect(items[0]?.id).toBe(1);
    expect(items[0]?.quantity).toBe(1);
  });
});
