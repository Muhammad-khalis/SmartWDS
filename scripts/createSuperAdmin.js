//node createSuperAdmin.js


//node createSuperAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";
import dotenv from "dotenv";
import User from "../src/models/user.model.js";

// Load .env from project root
dotenv.config({ path: path.resolve("../../.env") });

const createSuperAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined in .env");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) return console.log("SuperAdmin already exists!");

    const hashedPassword = await bcrypt.hash("superadmin123", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "SuperAdmin",
    });

    console.log("SuperAdmin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createSuperAdmin();