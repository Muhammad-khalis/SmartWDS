// routes/ledger.routes.js
import express from "express";
import { getLedgerByProduct, getAllLedger } from "../controllers/ledger.controller.js";

// ⭐ FIX: Added curly braces { } and merged into one import
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Ledger routes protected by auth
router.get("/product", protect, getLedgerByProduct);
router.get("/product/:productId", protect, getLedgerByProduct); // Added protect here too for safety
router.get("/", protect, getAllLedger);

export default router;