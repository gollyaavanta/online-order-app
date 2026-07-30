import express from "express";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import authMiddleware from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

// Public Routes
router.get("/", getCategories);

// Admin Routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCategory
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

export default router;