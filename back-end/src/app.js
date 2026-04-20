import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

// ===============================
// Import Middlewares
// ===============================
import errorHandler from "./middleware/errorMiddleware.js";

// ===============================
// Import Route Files
// ===============================
import authRoutes from "./routes/auth.routes.js";
import warehouseRoutes from "./routes/warehouse.routes.js";
import zoneRoutes from "./routes/zone.routes.js";
import aisleRoutes from "./routes/aisle.routes.js";
import rackRoutes from "./routes/rack.routes.js";
import binRoutes from "./routes/bin.routes.js";
import productRoutes from "./routes/product.routes.js";
import inboundRoutes from "./routes/inbound.routes.js";
import outboundRoutes from "./routes/outbound.routes.js";
import ledgerRoutes from "./routes/ledger.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userDataRoutes from "./routes/user.routes.js"; // ⭐ Named properly

// Load environment variables
dotenv.config();

const app = express();

// =====================================================
// 🔹 GLOBAL MIDDLEWARES
// =====================================================

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Cleaned CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smartwds-frontend.vercel.app",
      "https://smartwds-frontend-bker.vercel.app",
      "https://smartwds-frontend-4lo0uik0w-muhammad-khalis-projects-1d24f283.vercel.app"
    ],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);

// =====================================================
// 🔹 API ROUTES
// =====================================================

// Authentication
app.use("/api/auth", authRoutes);

// User Management (Fixed variable name)
app.use("/api/users", userDataRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Warehouse Structure
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/aisles", aisleRoutes);
app.use("/api/racks", rackRoutes);
app.use("/api/bins", binRoutes);

// Inventory & Products
app.use("/api/products", productRoutes);

// Inbound Module (GRN / Receiving)
app.use("/api/inbound", inboundRoutes);

// Outbound Module (Sales Order / Dispatch)
app.use("/api/outbound", outboundRoutes);

// Ledger / Stock Audit
app.use("/api/ledger", ledgerRoutes);

// =====================================================
// 🔹 404 & ERROR HANDLER
// =====================================================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found - ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app;