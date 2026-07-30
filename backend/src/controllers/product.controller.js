import { Product } from "../models/product.model.js";
import { Brand } from "../models/brand.model.js";
import { Category } from "../models/category.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// Helper to safely parse strings or JSON arrays sent via multipart/form-data
const safeJsonParse = (data) => {
  if (!data) return [];
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return data.split(",").map((item) => item.trim());
    }
  }
  return data;
};

// Helper for URL slug generation
const createSlug = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ==============================================================================
// 1. ADD NEW PRODUCT (Admin Only)
// ==============================================================================
export const createProduct = async (req, res) => {
  try {
    const body = req.body;
    // Process Multer Image Files
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const results = await Promise.all(uploadPromises);

      uploadedImages = results.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        isPrimary: index === 0,
      }));
    }

    // Explicit Sanitation & Type Conversion
    const productPayload = {
      name: body.name?.trim(),
      slug: body.slug ? createSlug(body.slug) : createSlug(body.name || ""),
      sku: body.sku?.trim().toUpperCase(),
      brand: body.brand,
      category: body.category,

      shortDescription: body.shortDescription || "",
      description: body.description || "",
      ingredients: body.ingredients || "",
      nutritionalInformation: body.nutritionalInformation || "",
      directionsForUse: body.directionsForUse || "",
      benefits: body.benefits || "",
      storageInstructions: body.storageInstructions || "",
      shelfLife: body.shelfLife || "",
      netWeight: body.netWeight || "",

      mrp: Number(body.mrp),
      sellingPrice: Number(body.sellingPrice),
      gstPercent: Number(body.gstPercent || 0),
      stock: Number(body.stock || 0),
      lowStockThreshold: Number(body.lowStockThreshold || 5),

      isActive: body.isActive === true || body.isActive === "true",
      isFeatured: body.isFeatured === true || body.isFeatured === "true",

      tags: safeJsonParse(body.tags),
      faqs: safeJsonParse(body.faqs),
      frequentlyBoughtTogether: safeJsonParse(body.frequentlyBoughtTogether),
      relatedProducts: safeJsonParse(body.relatedProducts),

      images: uploadedImages,
    };

    const newProduct = new Product(productPayload);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// ==============================================================================
// 2. READ ALL PRODUCTS (Shop Page, Smart Search & Filters)
// ==============================================================================
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      brand,
      category,
      sort,
      isActive,
      isFeatured,
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};

    // 1. Boolean Filters
    if (isActive !== undefined) query.isActive = isActive === "true";
    if (isFeatured !== undefined) query.isFeatured = isFeatured === "true";

    // 2. Safe Category Handling (Slug vs ObjectId)
    if (category && category !== "all") {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

      if (isObjectId) {
        query.category = category;
      } else {
        // Query category by slug safely
        const foundCategory = await Category.findOne({ slug: category }).lean();

        if (foundCategory) {
          query.category = foundCategory._id;
        } else {
          // Category doesn't exist -> Return empty response safely without crashing
          return res.status(200).json({
            success: true,
            count: 0,
            total: 0,
            page: Number(page),
            totalPages: 0,
            data: [],
          });
        }
      }
    }

    // 3. Safe Brand Handling
    if (brand && brand !== "all") {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(brand);

      if (isObjectId) {
        query.brand = brand;
      } else {
        // Try finding brand document first if Brand is a referenced schema
        const foundBrand = await Brand?.findOne({ name: brand }).lean();

        if (foundBrand) {
          query.brand = foundBrand._id;
        } else {
          // If brand is stored directly as a text field or regex match
          // Escape special characters like ® to prevent regex crashes
          const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          query.brand = { $regex: new RegExp(`^${escapedBrand}$`, "i") };
        }
      }
    }

    // 4. Price Filtering
    if (minPrice || maxPrice) {
      query.sellingPrice = {};
      if (minPrice) query.sellingPrice.$gte = Number(minPrice);
      if (maxPrice) query.sellingPrice.$lte = Number(maxPrice);
    }

    // 5. Search Filtering
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { ingredients: { $regex: escapedSearch, $options: "i" } },
        { tags: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    // 6. Sorting Map
    let sortOptions = { createdAt: -1 }; // Default: Latest first
    if (sort === "price-asc") {
      sortOptions = { sellingPrice: 1 };
    } else if (sort === "price-desc") {
      sortOptions = { sellingPrice: -1 };
    } else if (sort === "rating") {
      sortOptions = { averageRating: -1 };
    }

    // Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    // Database Queries
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("brand", "name logo")
        .populate("category", "name slug")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: products,
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
// ==============================================================================
// 3. READ SINGLE PRODUCT (By Mongo ID or Slug)
// ==============================================================================
export const getProductByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    const query = isObjectId ? { _id: identifier } : { slug: identifier };

    const product = await Product.findOne(query)
      .populate("brand", "name logo description")
      .populate("category", "name slug")
      .populate("frequentlyBoughtTogether", "name sellingPrice images slug stock")
      .populate("relatedProducts", "name sellingPrice images slug stock");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// ==============================================================================
// 4. UPDATE PRODUCT (Admin Only)
// ==============================================================================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const body = req.body;
    let updatedImages = [...existingProduct.images];

    // Handle new images if provided via Multer
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const newUploadedFiles = await Promise.all(uploadPromises);

      const newImages = newUploadedFiles.map((img) => ({
        url: img.url,
        publicId: img.publicId,
        isPrimary: false,
      }));

      updatedImages = [...updatedImages, ...newImages];
    }

    const updatePayload = { ...body, images: updatedImages };

    // Explicit Type Castings if fields are present
    if (body.name) updatePayload.name = body.name.trim();
    if (body.name && !body.slug) updatePayload.slug = createSlug(body.name);
    if (body.mrp) updatePayload.mrp = Number(body.mrp);
    if (body.sellingPrice) updatePayload.sellingPrice = Number(body.sellingPrice);
    if (body.gstPercent) updatePayload.gstPercent = Number(body.gstPercent);
    if (body.stock !== undefined) updatePayload.stock = Number(body.stock);
    if (body.isActive !== undefined) updatePayload.isActive = body.isActive === true || body.isActive === "true";

    if (body.tags) updatePayload.tags = safeJsonParse(body.tags);
    if (body.faqs) updatePayload.faqs = safeJsonParse(body.faqs);
    if (body.frequentlyBoughtTogether) updatePayload.frequentlyBoughtTogether = safeJsonParse(body.frequentlyBoughtTogether);
    if (body.relatedProducts) updatePayload.relatedProducts = safeJsonParse(body.relatedProducts);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// ==============================================================================
// 5. DELETE PRODUCT (Admin Only)
// ==============================================================================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete associated images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((img) => deleteFromCloudinary(img.publicId));
      await Promise.all(deletePromises);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product and associated media deleted successfully",
      data: { id: req.params.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};