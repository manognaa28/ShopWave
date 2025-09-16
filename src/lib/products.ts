import type { Product } from '@/lib/types';

// This is mock data. In a real application, you would fetch this from a database.
const products: Product[] = [
  {
    id: 'prod_electronics_1',
    name: 'Wireless Headphones',
    description:
      'Experience immersive sound with these noise-cancelling wireless headphones. Long-lasting battery and comfortable design for all-day listening.',
    price: 7999,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600',
    imageHint: 'wireless headphones',
    category: 'Electronics',
  },
  {
    id: 'prod_electronics_2',
    name: 'Sleek Laptop',
    description:
      'A powerful and lightweight laptop for work and play. Features a high-resolution display and the latest-generation processor.',
    price: 89999,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600',
    imageHint: 'laptop computer',
    category: 'Electronics',
  },
  {
    id: 'prod_electronics_3',
    name: 'Smartwatch Pro',
    description:
      'Stay connected and track your fitness with the Smartwatch Pro. Features a vibrant display, heart rate monitor, and GPS.',
    price: 24999,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600',
    imageHint: 'smartwatch',
    category: 'Electronics',
  },
  {
    id: 'prod_apparel_1',
    name: 'Classic Cotton Tee',
    description:
      'A must-have in every wardrobe. Made from 100% premium cotton for ultimate comfort and durability. Available in various colors.',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600',
    imageHint: 'cotton t-shirt',
    category: 'Apparel',
  },
  {
    id: 'prod_apparel_2',
    name: 'Durable Denim Jeans',
    description:
      'Timeless style meets rugged construction. These denim jeans are designed to last and look good doing it.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600',
    imageHint: 'denim jeans',
    category: 'Apparel',
  },
  {
    id: 'prod_apparel_3',
    name: 'Comfort Sneakers',
    description:
      'The perfect blend of style and comfort. These sneakers will take you from a morning walk to a night out with ease.',
    price: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600',
    imageHint: 'sneakers',
    category: 'Apparel',
  },
  {
    id: 'prod_books_1',
    name: 'The Science of Everything',
    description:
      'A captivating journey through the history of scientific discovery, from ancient times to the modern day.',
    price: 499,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600',
    imageHint: 'hardcover book',
    category: 'Books',
  },
  {
    id: 'prod_books_2',
    name: 'Galaxy at War',
    description:
      'An epic science fiction novel of interstellar conflict and the heroes who rise to meet the challenge.',
    price: 399,
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600',
    imageHint: 'sci-fi novel',
    category: 'Books',
  },
  {
    id: 'prod_books_3',
    name: 'The Joy of Cooking',
    description:
      'A comprehensive cookbook for home chefs of all skill levels. Features over 1,000 delicious recipes.',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
    imageHint: 'cookbook',
    category: 'Books',
  },
  {
    id: 'prod_home_1',
    name: 'Ceramic Coffee Mug',
    description:
      'Start your day right with this beautifully crafted ceramic mug. Perfect for coffee, tea, or your favorite hot beverage.',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600',
    imageHint: 'coffee mug',
    category: 'Home Goods',
  },
];

export async function getProducts(category?: string): Promise<Product[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (category) {
    return products.filter((p) => p.category === category);
  }
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products.find((p) => p.id === id);
}

export async function getProductCategories(): Promise<string[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  const categories = products.map((p) => p.category);
  return [...new Set(categories)];
}
