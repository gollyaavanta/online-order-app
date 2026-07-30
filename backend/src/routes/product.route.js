import express from "express";

import upload from "../middleware/multer.js";

import authMiddleware from "../middleware/auth.js";
import {adminMiddleware} from "../middleware/admin.js";

import {
  createProduct,
  getProducts,
  getProductByIdOrSlug,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:identifier", getProductByIdOrSlug);

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 10),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 10),
  updateProduct
);

router.post(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default router;