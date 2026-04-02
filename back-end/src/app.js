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
import outboundRoutes from "./routes/outbound.routes.js"; // ✅ ADDED
import ledgerRoutes from "./routes/ledger.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


// Load environment variables from .env
dotenv.config();

const app = express();


// =====================================================
// 🔹 GLOBAL MIDDLEWARES
// =====================================================

// Parse incoming JSON requests
app.use(express.json());

// Secure HTTP headers
app.use(helmet());

// Enable CORS (Allow frontend access)
app.use(
  cors({
    origin: "https://smartwds-frontend-bker.vercel.app",
    credentials: true,
  })
);

// Rate Limiting (Prevent brute force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// HTTP request logger
app.use(morgan("dev"));


// =====================================================
// 🔹 API ROUTES
// =====================================================

// Authentication
app.use("/api/auth", authRoutes);

// Warehouse Structure
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/aisles", aisleRoutes);
app.use("/api/racks", rackRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Inventory
app.use("/api/products", productRoutes);

// Inbound Module (GRN / Receiving)
app.use("/api/inbound", inboundRoutes);

// Outbound Module (Sales Order / Dispatch) ✅
app.use("/api/outbound", outboundRoutes);

// Ledger / Stock Audit
app.use("/api/ledger", ledgerRoutes);


// =====================================================
// 🔹 404 ROUTE HANDLER (If route not found)
// =====================================================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


// =====================================================
// 🔹 GLOBAL ERROR HANDLER (MUST BE LAST)
// =====================================================
app.use(errorHandler);


export default app;