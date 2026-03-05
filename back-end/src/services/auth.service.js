/*
1️⃣ Find user
2️⃣ If not found → stop
3️⃣ Compare password
4️⃣ If not match → stop
5️⃣ Generate token
*/
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// ================= REGISTER SERVICE =================
export const registerUserService = async (data) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

// ================= LOGIN SERVICE =================
export const loginUserService = async (email, password) => {
  // Find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User does not exist!");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password not matched!");
  }

  // Generate token
  const token = generateToken(user); // Pass full user object

  return {
    user,
    token,
  };
};