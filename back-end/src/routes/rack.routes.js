import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

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