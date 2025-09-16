"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";

type WishlistContextType = {
  wishlistItems: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedWishlist = localStorage.getItem('shopwave-wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopwave-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((id: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(id)) return prev;
      toast({ title: "Added to wishlist!" });
      return [...prev, id];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlistItems((prev) => {
      toast({ title: "Removed from wishlist" });
      return prev.filter((itemId) => itemId !== id);
    });
  }, [toast]);

  const isInWishlist = useCallback((id: string) => {
    return wishlistItems.includes(id);
  }, [wishlistItems]);

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
