// back-end/src/config/database.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
   const conn = await mongoose.connect(process.env.MONGO_URI);
console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;  // ✅ this is critical
