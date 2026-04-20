import express from "express";

// ⭐ FIX: Added curly braces { } and merged into one import
// Kyunke authorizeRoles bhi ab auth.middleware.js ke andar hi hai
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

import {
  createAisle,
  getAisles,
  getAisle,
  updateAisle,
  deleteAisle,
} from "../controllers/aisle.controller.js";

const router = express.Router();

// CREATE (SuperAdmin)
router.post("/", protect, authorizeRoles("SuperAdmin"), createAisle);

// READ (Any logged in user)
router.get("/", protect, getAisles);
router.get("/:id", protect, getAisle);

// UPDATE (SuperAdmin)
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateAisle);

// DELETE (SuperAdmin)
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteAisle);

export default router;