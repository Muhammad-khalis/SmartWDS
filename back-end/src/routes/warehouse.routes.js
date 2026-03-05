import express from "express";

import {
  createWarehouse,
  getAllWarehouses,
  getSingleWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../controllers/warehouse.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router=express.Router();

// Routes
router.post("/", protect, authorizeRoles("SuperAdmin"), createWarehouse);
router.get("/", protect, getAllWarehouses);
router.get("/:id", protect, getSingleWarehouse);
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateWarehouse);
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteWarehouse);

export default router;