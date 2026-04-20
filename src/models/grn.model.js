
/*Stores received goods info.
Links GRN to product, bin, and user.
referenceId ensures unique GRNs.
*/
import mongoose from "mongoose";

const grnSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    binId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bin",
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GRN", grnSchema);