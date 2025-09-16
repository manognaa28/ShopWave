"use client";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function AddToWishlistButton({ productId }: { productId: string }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  const handleToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <Button size="lg" variant="outline" onClick={handleToggle}>
      <Heart
        className={cn(
          "mr-2 h-5 w-5",
          isWishlisted && "text-red-500 fill-current"
        )}
      />
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
}
