import { describe, expect, it } from "vitest";

describe("total", () => {
  it("calculates cart total", () => {
    const items = [
      { price: 50, quantity: 2 },
      { price: 30, quantity: 3 },
    ];

    // проверяем сумму корзины
    // раньше тут по ошибке ожидал 180, потом поправил на 190
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    expect(total).toBe(190);
  });
});
