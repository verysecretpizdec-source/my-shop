"use server";

import type { CartItem } from "@/types";

export async function checkoutAction(input: {
  name: string;
  address: string;
  phone: string;
  items: CartItem[];
}) {
  const name = input.name.trim();
  const address = input.address.trim();
  const phone = input.phone.trim();

  if (!name || !address || !phone) {
    return { ok: false, message: "Please fill in all fields." };
  }

  if (!input.items?.length) {
    return { ok: false, message: "Cart is empty." };
  }

  const orderId = `ORD-${Date.now().toString().slice(-8)}`;

  return {
    ok: true,
    message: `Order ${orderId} confirmed. Thank you, ${name}!`,
    orderId,
  };
}
