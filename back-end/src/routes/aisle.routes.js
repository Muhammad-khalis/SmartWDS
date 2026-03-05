import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

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


