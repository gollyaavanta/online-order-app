import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Helper function to keep populated structure consistent across responses
const populateCartQuery = (query) => {
  return query.populate({
    path: "items.product",
    select: "name price sellingPrice images stock isActive",
    populate: [
      { path: "brand", select: "name slug" },
      { path: "category", select: "name slug" },
    ],
  });
};

// 1. ADD TO CART
export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  const parsedQty = Number(quantity);
  if (isNaN(parsedQty) || parsedQty <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0",
    });
  }

  // Find product and verify stock
  const product = await Product.findOne({ _id: productId, isActive: true }).select("stock");
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found or inactive",
    });
  }

  // Get current cart to calculate true cumulative quantity
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  const currentCartQty = existingItemIndex > -1 ? cart.items[existingItemIndex].quantity : 0;
  const targetQty = currentCartQty + parsedQty;

  if (product.stock < targetQty) {
    return res.status(400).json({
      success: false,
      message: `Cannot add. Stock is ${product.stock}, but you already have ${currentCartQty} in cart.`,
    });
  }

  // Update quantity if existing, otherwise push
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity = targetQty;
  } else {
    cart.items.push({ product: productId, quantity: parsedQty });
  }

  await cart.save();

  // Return populated cart to keep frontend hydrated
  const updatedCart = await populateCartQuery(Cart.findById(cart._id)).lean();

  return res.status(200).json({
    success: true,
    message: "Product added to cart",
    data: updatedCart,
  });
});

// 2. GET CART
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  const cart = await populateCartQuery(Cart.findOne({ user: userId })).lean();

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        user: userId,
        items: [],
        totalItems: 0,
        distinctCount: 0,
        totalPrice: 0,
      },
    });
  }

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => {
    if (!item.product) return sum;
    const itemPrice = item.product.sellingPrice ?? item.product.price ?? 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  res.status(200).json({
    success: true,
    data: {
      ...cart,
      distinctCount: cart.items.length,
      totalItems,
      totalPrice,
    },
  });
});

// 3. UPDATE CART ITEM QUANTITY
export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const parsedQty = Number(quantity);

  // If quantity <= 0, remove item directly
  if (parsedQty <= 0) {
    const updatedCart = await populateCartQuery(
      Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId } } },
        { new: true }
      )
    ).lean();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: updatedCart,
    });
  }

  // Check stock limit for explicit quantity set
  const product = await Product.findById(productId).select("stock");
  if (product && product.stock < parsedQty) {
    return res.status(400).json({
      success: false,
      message: `Cannot update. Only ${product.stock} unit(s) available`,
    });
  }

  // Update existing quantity positional match
  const cart = await populateCartQuery(
    Cart.findOneAndUpdate(
      { user: userId, "items.product": productId },
      { $set: { "items.$.quantity": parsedQty } },
      { new: true }
    )
  ).lean();

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart or item not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: cart,
  });
});

// 4. REMOVE ITEM FROM CART
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await populateCartQuery(
    Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    )
  ).lean();

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    data: cart,
  });
});

// 5. CLEAR CART
export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $set: { items: [] } }
  );

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});