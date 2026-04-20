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
import userDataRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// ⭐ FIX 1: Trust Proxy (Railway/Cloud deployments ke liye lazmi hai)
app.set('trust proxy', 1);

// =====================================================
// 🔹 GLOBAL MIDDLEWARES
// =====================================================

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ⭐ FIX 2: Dynamic CORS (Har Vercel link ko allow karega)
const allowedOrigins = [
  "http://localhost:5173",
  "https://smartwds-frontend.vercel.app",
  "https://smartwds-frontend-bker.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);
      
      // Allow if in list OR if it's a vercel preview link
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ⭐ FIX 3: Rate Limiting with Proxy Validation Fix
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  validate: { xForwardedForHeader: false }, 
});
app.use(limiter);

// =====================================================
// 🔹 API ROUTES
// =====================================================

app.use("/api/auth", authRoutes);
app.use("/api/users", userDataRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/aisles", aisleRoutes);
app.use("/api/racks", rackRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inbound", inboundRoutes);
app.use("/api/outbound", outboundRoutes);
app.use("/api/ledger", ledgerRoutes);

// Root route to check if server is alive
app.get("/", (req, res) => {
  res.send("SmartWDS Backend is running successfully!");
});

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