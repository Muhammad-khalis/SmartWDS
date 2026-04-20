import express from "express";
import {
  createSalesOrder,
  updateSalesOrderStatus,
  getSalesOrders,
  getSalesOrderById
} from "../controllers/outbound.controller.js";

// ⭐ FIX: Named Imports ke liye curly braces { } lazmi hain
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * OUTBOUND ROUTE ARCHITECTURE
 */

// 1. Get All Orders
router.get(
  "/", 
  protect, 
  authorizeRoles("SuperAdmin", "WarehouseManager", "DispatchManager", "Operator"), 
  getSalesOrders
);

// 2. Single Order
router.get(
  "/:id", 
  protect, 
  getSalesOrderById
);

// 3. Create Order
router.post(
  "/",
  protect,
  authorizeRoles("SuperAdmin", "DispatchManager"), 
  createSalesOrder
);

// 4. Update Status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("SuperAdmin", "DispatchManager", "WarehouseManager"),
  updateSalesOrderStatus
);

export default router;