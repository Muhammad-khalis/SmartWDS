import express from "express";

// ⭐ FIX: Added curly braces { } and merged into one import
// Kyunke authorizeRoles bhi ab auth.middleware.js ke andar hi hai
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

import {
  createRack,
  getRacks,
  getRack,
  updateRack,
  deleteRack,
} from "../controllers/rack.controller.js";

const router = express.Router();

// CREATE (SuperAdmin)
router.post("/", protect, authorizeRoles("SuperAdmin"), createRack);

// READ (Any logged-in user)
router.get("/", protect, getRacks);
router.get("/:id", protect, getRack);

// UPDATE (SuperAdmin)
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateRack);

// DELETE (SuperAdmin)
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteRack);

export default router;