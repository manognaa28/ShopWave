"use client";

import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartCrack } from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
  const { products, isLoading } = useCart(); // useCart provides all products

  const wishlistedProducts = products.filter((p) => wishlistItems.includes(p.id));

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10 font-headline">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Skeleton Loader can be added here */}
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-10 font-headline">My Wishlist</h1>
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg">
          <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven&apos;t added anything to your wishlist yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
