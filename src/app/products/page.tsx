"use client";

import { useState, useEffect, useMemo } from 'react';
import { getProducts, getProductCategories } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        getProducts(),
        getProductCategories(),
      ]);
      setProducts(fetchedProducts);
      setCategories(['All', ...fetchedCategories]);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Our Products
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our curated collection of high-quality goods.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))
        ) : (
          categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ||
                (category === 'All' && !selectedCategory)
                  ? 'default'
                  : 'outline'
              }
              onClick={() =>
                setSelectedCategory(category === 'All' ? null : category)
              }
            >
              {category}
            </Button>
          ))
        )}
      </div>

      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
