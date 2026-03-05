// routes/ledger.routes.js
import express from "express";
import { getLedgerByProduct } from "../controllers/ledger.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/product", protect, getLedgerByProduct);
router.get("/:productId", protect, getLedgerByProduct);


export default router;