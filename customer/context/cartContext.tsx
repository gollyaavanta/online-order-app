'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "./authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Product {
  _id: string;
  name: string;
  price: number;
  sellingPrice?: number;
  images: {url?:string,publicId?:string,isPrimary?:boolean,_id:string}[];
  stock: number;
  isActive: boolean;
  brand?: { _id: string; name: string; slug: string };
  category?: { _id: string; name: string; slug: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  cartCount:number;
  addToCart: (product: { _id: string }, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (product: { _id: string }) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useContext(StoreContext);

  // Helper to construct request headers dynamically
  const getAuthHeaders = () => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    // withCredentials: true,
  });

  // Fetch populated cart from GET /api/cart
  const fetchCart = async () => {
    // Optional: skip fetching if no token is present
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/cart`, {}, getAuthHeaders());

      if (res.data?.success && res.data?.data?.items) {
        setCartItems(res.data.data.items);
        setCartCount(res.data.data.totalItems)
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch cart whenever token changes (e.g., user logs in or out)
  useEffect(() => {
    fetchCart();
  }, [token]);

  // 1. ADD TO CART
  const addToCart = async (product: { _id: string }, quantity: number = 1) => {
    try {
      await axios.post(
        `${API_URL}/api/cart/add`,
        { productId: product._id, quantity },
        getAuthHeaders()
      );
      await fetchCart();
    } catch (error: any) {
      console.error('Error adding to cart:', error?.response?.data || error);
    }
  };

  // 2. UPDATE QUANTITY
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await axios.put(
        `${API_URL}/api/cart/update`,
        { productId, quantity },
        getAuthHeaders()
      );
      await fetchCart();
    } catch (error: any) {
      console.error('Error updating quantity:', error?.response?.data || error);
    }
  };

  // 3. REMOVE FROM CART
  const removeFromCart = async (product: { _id: string }) => {
    try {
      await axios.post(
        `${API_URL}/api/cart/remove/${product._id}`,
        {},
        getAuthHeaders()
      );
      await fetchCart();
    } catch (error: any) {
      console.error('Error removing item:', error?.response?.data || error);
    }
  };

  // 4. CLEAR CART
  const clearCart = async () => {
    try {
      await axios.post(
        `${API_URL}/api/cart/clear`,
        {},
        getAuthHeaders()
      );
      setCartItems([]);
    } catch (error: any) {
      console.error('Error clearing cart:', error?.response?.data || error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};