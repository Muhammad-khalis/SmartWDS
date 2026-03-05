import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    reorderLevel: {
      type: Number,
      required: true,
      default: 10
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

// Compound index (optional advanced)
productSchema.index({ name: 1, sku: 1 ,category:1});

export default mongoose.model("Product", productSchema);