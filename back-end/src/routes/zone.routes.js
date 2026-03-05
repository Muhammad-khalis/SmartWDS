import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
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