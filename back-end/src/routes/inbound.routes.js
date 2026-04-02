import express from "express";
import { createGRN, getGRNs, deleteGRN } from "../controllers/inbound.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Create GRN
router.post("/", protect, authorizeRoles("SuperAdmin","WarehouseManager"), createGRN);

// Get GRNs
router.get("/", protect, getGRNs);

// 🔥 ADD THIS LINE
router.delete("/:id", protect, authorizeRoles("SuperAdmin","WarehouseManager"), deleteGRN);

export default router;