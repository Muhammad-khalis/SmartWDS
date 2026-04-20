import express from "express";
const router = express.Router();
import { getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

// Routes registry
router.get("/", protect, authorizeRoles("SuperAdmin"), getAllUsers);
router.put("/:id", protect, authorizeRoles("SuperAdmin"), updateUser);
router.delete("/:id", protect, authorizeRoles("SuperAdmin"), deleteUser);

export default router;