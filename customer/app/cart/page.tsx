'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useState, useContext } from 'react';

import { CartContext, CartItem } from '../../context/cartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || [];
  const addToCart = cartContext?.addToCart;
  const updateQuantity = cartContext?.updateQuantity;
  const removeFromCart = cartContext?.removeFromCart;

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (coupon.trim() === 'WELCOME10') {
      setDiscount(30);
    } else {
      setDiscount(0);
    }
  };

  const handleQuantityChange = async (
    product: { _id: string },
    currentQty: number,
    delta: number
  ) => {
    if (!product?._id) return;

    const newQty = currentQty + delta;

    if (newQty <= 0) {
      if (removeFromCart) {
        await removeFromCart(product);
      }
      return;
    }

    if (delta > 0) {
      // Incrementing: use addToCart ($inc: +1)
      if (addToCart) {
        await addToCart(product, 1);
      }
    } else {
      // Decrementing: use updateQuantity ($set: newQty)
      if (updateQuantity) {
        await updateQuantity(product._id, newQty);
      }
    }
  };

  const handleRemove = async (product: { _id: string }) => {
    if (removeFromCart && product?._id) {
      await removeFromCart(product);
    }
  };

  // Match backend getCart controller calculation
  const subtotal = cartItems.reduce((acc, item) => {
    if (!item?.product) return acc;
    const itemPrice = item.product.sellingPrice ?? item.product.price ?? 0;
    const itemQty = Number(item.quantity) || 1;
    return acc + itemPrice * itemQty;
  }, 0);

  const shippingFee = subtotal > 0 ? 49 : 0;
  const totalAmount = Math.max(0, subtotal + shippingFee - discount);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild>
            <Link href="/shop">Explore Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Shopping cart</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Cart Items List */}
          <section className="rounded-xl border bg-card p-5 space-y-6">
            <div className="divide-y space-y-4">
              {cartItems.map((item: CartItem, index) => {
                if (!item.product) return null;

                const product = item.product;
                const price = product.sellingPrice ?? product.price ?? 0;
                const quantity = item.quantity || 1;
                const itemTotal = price * quantity;

                // Handle string array for images
                const imageUrl =
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]?.url
                    : null;
                const brandName = product.brand?.name || 'Brand';

                return (
                  <div
                    key={product._id || index}
                    className="pt-4 first:pt-0 flex gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span>{brandName}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          {product.category?.name && (
                            <p className="text-xs text-muted-foreground">
                              {product.category.name}
                            </p>
                          )}
                        </div>

                        <b>₹{itemTotal}</b>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center rounded-md border">
                          <button
                            className="p-2 hover:bg-muted/50 rounded-l-md"
                            onClick={() =>
                              handleQuantityChange(product, quantity, -1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="w-7 text-center text-sm font-medium">
                            {quantity}
                          </span>

                          <button
                            className="p-2 hover:bg-muted/50 rounded-r-md"
                            onClick={() =>
                              handleQuantityChange(product, quantity, 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => handleRemove(product)}
                          className="text-sm text-destructive hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <ShoppingBag className="h-4 w-4" />
              Continue shopping
            </Link>
          </section>

          {/* Order Summary Sidebar */}
          <aside className="h-fit rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Order summary</h2>

            <div className="mt-4 flex gap-2">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="Coupon code"
              />

              <Button variant="outline" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Use <strong>WELCOME10</strong> for ₹30 off.
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </p>

              <p className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shippingFee}</span>
              </p>

              {discount > 0 && (
                <p className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </p>
              )}

              <p className="flex justify-between border-t pt-3 text-base font-bold">
                <span>Total (GST included)</span>
                <span>₹{totalAmount}</span>
              </p>
            </div>

            <Button className="mt-6 w-full" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}