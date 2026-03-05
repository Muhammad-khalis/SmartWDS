import express from "express";
import { registor, login } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Register
router.post("/register", registor); // Fixed spelling

// Login
router.post("/login", login);

// Protected Route (SuperAdmin Only)
router.get(
  "/superadmin-only",
  protect,
  authorizeRoles("SuperAdmin"),
  (req, res) => {
    res.json({ message: "Welcome SuperAdmin" });
  }
);

export default router;