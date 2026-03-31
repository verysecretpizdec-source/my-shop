import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/product-card";

describe("ProductCard", () => {
  it("renders name and add button", () => {
    // короткий живой тест рендера карточки
    render(
      createElement(ProductCard, {
        product: {
          id: 10,
          name: "Portable SSD 1TB",
          price: 149,
          description: "Fast drive",
          image: "https://example.com/ssd.jpg",
          category: "electronics",
        },
        index: 0,
        isAdding: false,
        onAdd: () => {},
      }),
    );

    expect(screen.getByText("Portable SSD 1TB")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
