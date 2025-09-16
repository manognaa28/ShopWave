"use client";

import Link from 'next/link';
import {
  Heart,
  Menu,
  ShoppingCart,
  Package,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShopWaveLogo } from './icons';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { useAuth } from '@/context/auth-context';
import { CartSheet } from './cart-sheet';
import { useState } from 'react';

const mainNav = [
  { href: '/products', label: 'All Products', icon: Package },
];

export function SiteHeader() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavItems = [
    ...mainNav,
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
    ...(user
      ? [{ href: '#', label: `Hi, ${user.firstName}`, icon: User, isUser: true }]
      : [{ href: '/login', label: 'Login', icon: LogIn }]),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link
                href="/"
                className="flex items-center space-x-2 mb-8"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShopWaveLogo className="h-8 w-8 text-primary" />
                <span className="inline-block font-bold text-xl">ShopWave</span>
              </Link>
              <nav className="flex flex-col gap-6">
                {mobileNavItems.map((item) => (
                  !item.isUser ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 text-xl font-medium text-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-7 w-7" />
                    {item.label}
                  </Link>
                  ) : null
                ))}
                 {user && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-xl font-medium text-foreground transition-colors hover:text-primary justify-start p-0"
                    >
                      <LogOut className="h-7 w-7" />
                      Logout
                    </Button>
                  )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-8 md:gap-12">
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <ShopWaveLogo className="h-8 w-8 text-primary" />
            <span className="inline-block font-bold text-xl">ShopWave</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end space-x-1 ml-auto">
          <nav className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" size="icon" className="h-12 w-12">
                      <User className="h-7 w-7" />
                      <span className="sr-only">User Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Hi, {user.firstName}!</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <User className="h-7 w-7" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}
          </nav>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative h-12 w-12">
              <Heart className="h-7 w-7" />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="relative h-12 w-12"
          >
            <ShoppingCart className="h-7 w-7" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 text-xs font-bold text-primary-foreground bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Button>
        </div>
      </div>
      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
