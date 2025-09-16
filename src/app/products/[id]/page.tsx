import { getProduct } from '@/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '../_components/add-to-cart-button';
import { AddToWishlistButton } from '../_components/add-to-wishlist-button';

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="bg-card rounded-lg overflow-hidden aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold my-3 font-headline">
            {product.name}
          </h1>
          <p className="text-3xl font-light text-foreground mb-6">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <AddToCartButton productId={product.id} />
            <AddToWishlistButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
