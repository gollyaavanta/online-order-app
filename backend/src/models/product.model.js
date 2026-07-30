import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // --- 1. Basic Identifiers ---
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // --- 2. Categorization & Relations ---
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  

    // --- 3. Media ---
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        isPrimary: { type: Boolean, default: false }, // Pinpoint primary grid thumbnail[cite: 1]
      },
    ],

    // --- 4. Content & Descriptions ---
    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },

    // Food & Specialty Specs
    ingredients: {
      type: String,
      default: "",
    },
    nutritionalInformation: {
      type: String,
      default: "",
    },
    directionsForUse: {
      type: String,
      default: "",
    },
    benefits: {
      type: String,
      default: "",
    },
    storageInstructions: {
      type: String,
      default: "",
    },
    shelfLife: {
      type: String,
      default: "",
    },
    netWeight: {
      type: String,
      default: "",
    },

    // --- 5. Pricing & Taxes ---
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    gstPercent: {
      type: Number,
      default: 0, // Required for GST calculations during checkout[cite: 1]
    },

    // --- 6. Inventory Management ---
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5, // Triggers Low Stock Alerts in Admin Panel[cite: 1]
    },

    // --- 7. Search & SEO ---
    tags: [
      {
        type: String,
        trim: true, // Used for Smart Search auto-suggestions & filtering[cite: 1]
      },
    ],
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },

    // --- 8. FAQs & Recommendations ---
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ], // Section 3 Requirement[cite: 1]

    frequentlyBoughtTogether: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Section 16 Requirement[cite: 1]
      },
    ],
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Section 3 Requirement[cite: 1]
      },
    ],

    // --- 9. Reviews & Visibility ---
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// --- Compound Text Index for Smart Search ---
// Enables MongoDB text search across multiple fields simultaneously[cite: 1]
productSchema.index({
  name: "text",
  ingredients: "text",
  tags: "text",
  shortDescription: "text",
});

export const Product = mongoose.model("Product", productSchema);