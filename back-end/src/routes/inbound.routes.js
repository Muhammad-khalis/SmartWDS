import express from "express";
import { createGRN, getGRNs, deleteGRN } from "../controllers/inbound.controller.js";

// ⭐ FIX: Added curly braces { } and merged imports
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create GRN
router.post("/", protect, authorizeRoles("SuperAdmin", "WarehouseManager"), createGRN);

// Get GRNs
router.get("/", protect, getGRNs);

// Delete GRN
router.delete("/:id", protect, authorizeRoles("SuperAdmin", "WarehouseManager"), deleteGRN);

export default router;