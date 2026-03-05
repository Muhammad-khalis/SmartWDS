/*
This is an Authentication Middleware.

👉 It protects private routes.
👉 It checks if user is logged in.
👉 It verifies JWT token.*/
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // 2️⃣ Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not defined in .env" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user in DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user to request

    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error.message);

    // Token invalid / expired
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default protect;