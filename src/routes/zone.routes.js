import express from "express";

// ⭐ FIX: Added curly braces { } and merged into one import
// Kyunke authorizeRoles bhi ab auth.middleware.js ke andar hi hai
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

import {
  createZoneController,
  getZonesController,
  getZoneByIdController,
  updateZoneController,
  deleteZoneController,
} from "../controllers/zone.controller.js";

const router = express.Router();

// SuperAdmin can create, update, delete zones
router.post("/", protect, authorizeRoles("SuperAdmin"), createZoneController);
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateZoneController);
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteZoneController);

// Any logged-in user can view zones
router.get("/", protect, getZonesController);
router.get("/:id", protect, getZoneByIdController);

export default router;