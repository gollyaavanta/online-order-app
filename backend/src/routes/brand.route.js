import express from "express";

import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

import authMiddleware from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

router.get("/", getBrands);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createBrand
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateBrand
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteBrand
);

export default router;