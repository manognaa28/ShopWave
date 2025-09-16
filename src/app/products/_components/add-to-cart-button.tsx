"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  return (
    <Button size="lg" onClick={() => addToCart(productId)}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
