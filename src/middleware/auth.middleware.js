import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 1️⃣ Protect Middleware (Named Export)
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not defined in .env" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// 2️⃣ Authorize Roles Middleware (Named Export - YEH MISSING THA)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not authorized to access this resource`,
      });
    }
    next();
  };
};