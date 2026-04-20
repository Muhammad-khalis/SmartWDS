import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById 
} from "../controllers/product.controller.js";

// ⭐ FIX: Added curly braces { } and merged into one import
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("SuperAdmin", "WarehouseManager"), createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById); 
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteProduct);

export default router;