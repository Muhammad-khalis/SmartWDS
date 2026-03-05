import express from "express";
import {
  createSalesOrder,
  updateSalesOrderStatus,
  getSalesOrders,
  getSalesOrderById
} from "../controllers/outbound.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Single Order Route (ID ke sath)
router.get("/:id", protect, getSalesOrderById);

// Get All Orders (Ab ye 404 nahi dega)
router.get("/", protect, getSalesOrders);

// Create & Dispatch Order
router.post(
  "/",
  protect,
  authorizeRoles("SuperAdmin", "WarehouseManager"),
  createSalesOrder
);

// Update Order Status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("SuperAdmin", "WarehouseManager"),
  updateSalesOrderStatus
);

export default router;