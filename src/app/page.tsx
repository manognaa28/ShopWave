import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section className="text-center py-20 sm:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 font-headline">
          Welcome to ShopWave
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
          Discover the new wave of online shopping. Quality products, seamless
          experience.
        </p>
        <Button asChild size="lg">
          <Link href="/products">
            Shop All Products <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 font-headline">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
