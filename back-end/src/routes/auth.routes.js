import express from "express";
import { register, login } from "../controllers/auth.controller.js";

// ⭐ FIX 1: Use curly braces { } for named imports
// ⭐ FIX 2: Ensure path is correct (Humne authorizeRoles ko auth.middleware mein rakha tha)
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Protected Route (SuperAdmin Only)
router.get(
  "/superadmin-only",
  protect,
  authorizeRoles("SuperAdmin"),
  (req, res) => {
    res.json({ message: "Welcome SuperAdmin!" });
  }
);

export default router;