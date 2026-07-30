import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import authMiddleWare from "../middleware/auth.js";

const cartRouter = express.Router();

// Apply auth middleware to all cart routes at once
// cartRouter.use(authMiddleWare);

// Get user cart
cartRouter.post("/",authMiddleWare, getCart);

// Add item to cart
cartRouter.post("/add",authMiddleWare, addToCart);

// Update item quantity in cart
cartRouter.put("/update",authMiddleWare, updateCartItem);

// Remove specific item from cart (expects productId as a parameter)
cartRouter.post("/remove/:productId",authMiddleWare, removeFromCart);

// Clear entire cart
cartRouter.post("/clear",authMiddleWare, clearCart);

export default cartRouter;