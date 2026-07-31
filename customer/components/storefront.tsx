'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState,useContext } from 'react';
import {
  Check,
  Heart,
  Package,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import logo from '@/assets/logo.png';
import {CartContext} from "../context/cartContext"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ----------------------------------------------------------------------
// Updated Interfaces Matching API Response
// ----------------------------------------------------------------------
export interface ProductImage {
  _id: string;
  url: string;
  publicId?: string;
  isPrimary?: boolean;
}

export interface BrandInfo {
  _id: string;
  name: string;
}

export interface CategoryInfo {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  brand?: BrandInfo | string;
  category?: CategoryInfo | string;
  images?: ProductImage[];
  shortDescription?: string;
  description?: string;
  ingredients?: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
  averageRating?: number;
  totalReviews?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

// Custom hook for debouncing search inputs
function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const money = (value = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

// Helper functions for safe rendering
const getBrandName = (brand?: BrandInfo | string): string => {
  if (!brand) return '';
  if (typeof brand === 'string') return brand;
  return brand.name || '';
};

const getPrimaryImage = (images?: ProductImage[]): string | null => {
  if (!images || !Array.isArray(images) || images.length === 0) return null;
  const primary = images.find((img) => img.isPrimary);
  return primary ? primary.url : images[0]?.url || null;
};

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------
export function ProductVisual({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const imageUrl = getPrimaryImage(product.images);
  const brandName = getBrandName(product.brand);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/15 ${
        large ? 'aspect-square rounded-xl' : 'aspect-[4/3] rounded-t-xl'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/.16),transparent_45%)]" />
      <Image
        src={imageUrl || logo}
        alt={`${product.name} product pack`}
        width={large ? 192 : 112}
        height={large ? 192 : 112}
        className={`${
          large ? 'h-48 w-48' : 'h-28 w-28'
        } relative object-contain drop-shadow-lg`}
        unoptimized
      />
      {brandName && (
        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-primary shadow-sm">
          {brandName}
        </span>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart ?? ((/* product */) => {});
  const price = product.sellingPrice ?? product.mrp ?? 0;
  const mrp = product.mrp ?? price;
  const discount =
    mrp > price && mrp > 0 ? Math.round((1 - price / mrp) * 100) : 0;
  const brandName = getBrandName(product.brand);

  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
      <Link href={`/shop/${product.slug || product._id}`}>
        <ProductVisual product={product} />
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            {brandName && (
              <p className="text-xs font-semibold text-primary">{brandName}</p>
            )}
            <Link
              href={`/shop/${product.slug || product._id}`}
              className="font-semibold hover:text-primary line-clamp-1"
            >
              {product.name}
            </Link>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-primary"
            aria-label="Save to wishlist"
          >
            <Heart
              className={`h-4 w-4 ${
                saved ? 'fill-primary text-primary' : ''
              }`}
            />
          </button>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription || product.description || ''}
        </p>

        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">{product.averageRating ?? 0}</span>
          <span className="text-muted-foreground">
            ({product.totalReviews ?? 0})
          </span>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-lg font-bold">{money(price)}</span>
          {mrp > price && (
            <span className="pb-0.5 text-sm text-muted-foreground line-through">
              {money(mrp)}
            </span>
          )}
          {discount > 0 && (
            <span className="pb-0.5 text-xs font-semibold text-accent">
              {discount}% off
            </span>
          )}
        </div>

        <p
          className={`text-xs font-medium ${
            product.stock === 0
              ? 'text-destructive'
              : product.stock < 10
              ? 'text-amber-600'
              : 'text-accent'
          }`}
        >
          {product.stock === 0
            ? 'Out of stock'
            : product.stock < 10
            ? `Only ${product.stock} left`
            : 'In stock'}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/checkout?product=${product._id}`}>Buy now</Link>
          </Button>
          <Button
            size="sm"
            disabled={product.stock === 0}
            onClick={() =>{ setAdded(true)
              addToCart(product)
            }}
          >
            {added ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="mr-1 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-80 animate-pulse rounded-xl border bg-muted/40"
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Catalog Component
// ----------------------------------------------------------------------
export function ShopCatalog() {
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 300);

  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Dynamic Data States
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  
  // Async States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch Categories on Mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:4000/api/v1/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategoriesList(data?.data || data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    fetchCategories();
  }, []);

  // 2. Fetch Products dynamically when filters/search changes
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (debouncedTerm) params.append('search', debouncedTerm);
      if (category !== 'all') params.append('category', category);
      if (brand !== 'all') params.append('brand', brand);
      if (sortBy) params.append('sort', sortBy);

      const res = await fetch(
        `http://localhost:4000/api/v1/products?${params.toString()}`
      );
      if (!res.ok) throw new Error('Failed to load products');

      const data = await res.json();
      setProductsList(data?.data || data?.products || (Array.isArray(data) ? data : []));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [debouncedTerm, category, brand, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 3. Fetch Auto-complete suggestions on search input change
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setSuggestions([]);
      return;
    }

    async function fetchSuggestions() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/products/search?q=${encodeURIComponent(
            debouncedTerm
          )}&limit=4`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data?.data || data || []);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    }

    fetchSuggestions();
  }, [debouncedTerm]);

  return (
    <main className="min-h-screen bg-muted/20">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="mb-3 text-sm font-semibold text-primary">
            GOLLYA AVANTA STORE
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everyday favourites, thoughtfully made.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Discover coffee, authentic regional foods and curated gift packs
            from our growing family of brands.
          </p>

          {/* Search Input Bar */}
          <div className="relative mt-7 max-w-2xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="h-12 pl-11 pr-10"
              placeholder="Search products, brands, ingredients or categories..."
            />
            {term && (
              <button
                onClick={() => setTerm('')}
                className="absolute right-3 top-3 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}

            {/* Suggestions Overlay */}
            {suggestions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-lg border bg-popover p-2 shadow-lg">
                {suggestions.map((p) => (
                  <Link
                    href={`/shop/${p.slug || p._id}`}
                    key={p._id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Search className="h-4 w-4 text-primary" />
                    <span>{p.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {getBrandName(p.brand)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Browse our collection</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Brand Filter */}
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Brands</option>
              <option value="Pravin">Pravin</option>
              <option value="Veloura">VELOURA®</option>
              <option value="Masala Matka">Masala Matka®</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Categories Sidebar */}
          <aside className="rounded-xl border bg-card p-4 h-fit">
            <p className="mb-3 text-sm font-semibold">Categories</p>
            <div className="space-y-1">
              <button
                onClick={() => setCategory('all')}
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                  category === 'all'
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                All Products
              </button>

              {categoriesList?.map((item) => (
                <button
                  key={item._id || item.slug}
                  onClick={() => setCategory(item.slug)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                    category === item.slug
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Product Listing Area */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {loading
                  ? 'Searching...'
                  : `${productsList.length} products found`}
              </p>
              <p className="hidden text-sm text-muted-foreground sm:block">
                Free shipping over ₹499
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <CatalogSkeleton />
            ) : error ? (
              <div className="rounded-xl border bg-card p-12 text-center text-destructive">
                <p>{error}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={fetchProducts}
                >
                  Retry
                </Button>
              </div>
            ) : productsList.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {productsList.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                <h2 className="mt-4 font-semibold">No matching products</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try another search term or filter selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}