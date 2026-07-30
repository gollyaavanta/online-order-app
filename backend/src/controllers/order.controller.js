import { Order } from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler.js";
import { config } from "dotenv";

config({ path: "./.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper to generate a unique order number
const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const placeOrder = asyncHandler(async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

  const userId = req.user.id;
  const {
    items,
    shippingAddress,
    subtotal,
    shippingCharge = 0,
    discount = 0,
    totalAmount,
    paymentMethod = "ONLINE",
  } = req.body;

  // Validation
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid or empty order items",
    });
  }

  // Validate item sub-fields according to orderItemSchema
  for (const item of items) {
    if (!item.product || !item.name || !item.sku || !item.quantity || !item.price) {
      return res.status(400).json({
        success: false,
        message: "Each item must include product ID, name, sku, quantity, and price",
      });
    }
  }

  const orderNumber = generateOrderNumber();

  // Create the Order document
  const newOrder = await Order.create({
    orderNumber,
    user: userId,
    items,
    shippingAddress,
    subtotal,
    shippingCharge,
    discount,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
    orderStatus: "Pending",
  });

  // Clear user cart upon placing order
  await User.findByIdAndUpdate(userId, { cart: [] });

  // Handle Cash on Delivery (COD) flow
  if (paymentMethod === "COD") {
    return res.status(201).json({
      success: true,
      message: "Order placed successfully with Cash on Delivery",
      order: newOrder,
    });
  }

  // Handle Stripe Checkout Flow for ONLINE payments
  const line_items = items.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // Add delivery charges as a line item if applicable
  if (shippingCharge > 0) {
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(shippingCharge * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    client_reference_id: newOrder._id.toString(),
  });

  res.json({
    success: true,
    session_url: session.url,
  });
});

const verifyOrder = asyncHandler(async (req, res) => {
  const { orderId, success, transactionId } = req.body;

  if (success === "true" || success === true) {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "Paid",
        orderStatus: "Confirmed",
        transactionId: transactionId || "",
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      message: "Payment successful",
      order: updatedOrder,
    });
  }

  // If payment failed, update status to Failed or delete order based on workflow
  await Order.findByIdAndUpdate(orderId, {
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
  });

  res.json({
    success: false,
    message: "Payment failed",
  });
});

// User Orders (Fetch logged-in user's orders)
const userOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await Order.find({ user: userId })
    .populate("items.product", "name price images")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: orders,
  });
});

// Admin Orders (List all orders with population)
const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: orders,
  });
});

// Update Order Status (Admin)
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, orderStatus, paymentStatus } = req.body;

  const updateFields = {};
  if (orderStatus) updateFields.orderStatus = orderStatus;
  if (paymentStatus) updateFields.paymentStatus = paymentStatus;

  const order = await Order.findByIdAndUpdate(orderId, updateFields, {
    new: true,
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};