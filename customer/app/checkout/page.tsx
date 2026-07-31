'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { CartContext, CartItem } from '../../context/cartContext';
import { StoreContext } from '../../context/authContext';
import {
  CheckCircle2,
  Lock,
  MapPin,
  Truck,
  ShoppingBag,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CheckoutItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const urlQty = Number(searchParams.get('qty')) || 1;

  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || [];

  const storeContext = useContext(StoreContext);
  const url = storeContext?.url || 'http://localhost:4000';

  const [singleProduct, setSingleProduct] = useState<CheckoutItem | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(productId));
  const [complete, setComplete] = useState(false);

  // Fetch product directly from API when 'product' query parameter is present
  useEffect(() => {
    async function fetchSingleProduct() {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${url}/api/v1/product/${productId}`);
        if (!res.ok) {
          // Fallback if the endpoint standard differs
          const altRes = await fetch(`${url}/api/product/${productId}`);
          if (altRes.ok) {
            const altData = await altRes.json();
            parseAndSetProduct(altData);
          }
        } else {
          const data = await res.json();
          parseAndSetProduct(data);
        }
      } catch (err) {
        console.error('Failed to load checkout product:', err);
      } finally {
        setLoading(false);
      }
    }

    function parseAndSetProduct(responseData: any) {
      const prod = responseData?.data || responseData?.product || responseData;
      if (prod && (prod._id || prod.id)) {
        setSingleProduct({
          _id: prod._id || prod.id,
          name: prod.name,
          price: prod.sellingPrice ?? prod.price ?? 0,
          quantity: urlQty,
          image: prod.images?.[0].url,
        });
      }
    }

    fetchSingleProduct();
  }, [productId, url, urlQty]);

  // Determine active checkout item list
  let itemsToCheckout: CheckoutItem[] = [];

  if (productId) {
    if (singleProduct) {
      itemsToCheckout = [singleProduct];
    }
  } else if (cartItems.length > 0) {
    itemsToCheckout = cartItems
      .filter((item: CartItem) => item && item.product)
      .map((item: CartItem) => ({
        _id: item.product._id,
        name: item.product.name || '',
        price: item.product.sellingPrice ?? item.product.price ?? 0,
        quantity: item.quantity || 1,
        image: item.product.images?.[0].url,
      }));
  }

  // Cost calculations
  const subtotal = itemsToCheckout.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 0 ? 49 : 0;
  const totalAmount = subtotal + shippingFee;

function handlePlaceOrder(e){
  e.preventDefault();

  
}


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading checkout details...</p>
      </div>
    );
  }

  if (complete) {
    return (
      <main className="min-h-screen bg-muted/20">
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
          <h1 className="mt-4 text-3xl font-bold">Order confirmed</h1>
          <p className="mt-3 text-muted-foreground">
            Your confirmation, invoice, and shipping updates will be sent by email and WhatsApp.
          </p>
          <Button className="mt-7" asChild>
            <a href="/my-orders">Track your order</a>
          </Button>
        </div>
      </main>
    );
  }

  if (itemsToCheckout.length === 0) {
    return (
      <main className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Your checkout is empty</h2>
          <p className="text-sm text-muted-foreground">Add items to your cart or select a product to proceed with checkout.</p>
          <Button asChild>
            <a href="/">Browse Products</a>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm font-semibold text-primary">SECURE CHECKOUT</p>
        <h1 className="mt-1 text-3xl font-bold">Complete your order</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Checkout Form */}
          <div className="space-y-5">
            {[
              [
                '1',
                'Contact details',
                ['Email address', 'Mobile / WhatsApp number'],
              ],
              [
                '2',
                'Delivery address',
                [
                  'Full name',
                  'PIN code',
                  'Address, area, street',
                  'City',
                  'State',
                ],
              ],
            ].map(([number, title, fields]) => (
              <section
                key={title as string}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="font-semibold">
                  <span className="mr-2 rounded-full bg-primary px-2.5 py-1 text-xs text-primary-foreground">
                    {number as string}
                  </span>
                  {title as string}
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(fields as string[]).map((field) => (
                    <Input
                      key={field}
                      placeholder={field}
                      className={
                        field.includes('Address') ? 'sm:col-span-2' : ''
                      }
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Delivery & Payment */}
            <section className="rounded-xl border bg-card p-6">
              <h2 className="font-semibold">3. Delivery & Payment</h2>

              <div className="mt-4 space-y-3 text-sm">
                <label className="flex gap-3 rounded-lg border p-3 items-center">
                  <input type="radio" name="delivery" defaultChecked />
                  <Truck className="h-5 w-5 text-primary" />
                  Standard delivery — 3–7 business days
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    'UPI',
                    'Credit / Debit Card',
                    'Net Banking / Wallet',
                    'Cash on Delivery',
                  ].map((method, index) => (
                    <label
                      key={method}
                      className="inline-flex w-full items-center gap-2 rounded-lg border p-3 text-xs sm:text-sm"
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={index === 0}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-xl border bg-card p-6">
            <h2 className="font-semibold border-b pb-3">Order Summary</h2>

            {/* Dynamic Items List */}
            <div className="mt-4 max-h-60 overflow-y-auto divide-y space-y-2 pr-1">
              {itemsToCheckout.map((item, idx) => (
                <div key={item._id || idx} className="pt-2 first:pt-0">
                  <div className="flex justify-between font-medium text-sm">
                    <span className="truncate pr-2">{item.name}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="mt-5 space-y-2 border-t pt-4 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </p>

              <p className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shippingFee}</span>
              </p>

              <p className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </p>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={handlePlaceOrder}
            >
              <Lock className="mr-2 h-4 w-4" />
              Place Secure Order
            </Button>

            <p className="mt-3 flex gap-2 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              PIN-code availability is checked before payment.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
} 
