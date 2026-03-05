import express from "express";
import { createGRN, getGRNs } from "../controllers/inbound.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Create GRN
router.post("/", protect, authorizeRoles("SuperAdmin","WarehouseManager"), createGRN);

// Optional: Get all GRNs
router.get("/", protect, getGRNs);

export default router;