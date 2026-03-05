import mongoose from "mongoose";

const salesOrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    binId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bin",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    customerName: {
      type: String,
      required: true,
    },

    referenceId: {
      type: String,
      required: true,
      unique: true,
    },

    // Order status flow
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "Delivered"],
      default: "Pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SalesOrder", salesOrderSchema);