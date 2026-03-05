import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createBin,
  getBins,
  getBin,
  updateBin,
  deleteBin,
} from "../controllers/bin.controller.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("SuperAdmin"), createBin);
router.get("/", protect, getBins);
router.get("/:id", protect, getBin);
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateBin);
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteBin);

export default router;