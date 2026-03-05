import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById // ✅ import here
} from "../controllers/product.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("SuperAdmin", "WarehouseManager"), createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById); // ✅ single product route
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteProduct);

export default router;