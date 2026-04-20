import mongoose from "mongoose";

const binSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bin name is required"],
      trim: true,
    },
    rack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rack",
      required: [true, "Rack is required"],
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    currentStock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  { timestamps: true }
);

binSchema.index({name:1,rack:1},{unique:true});


binSchema.virtual("isFull").get(function () {
  return this.currentStock >= this.capacity;
});

export default mongoose.model("Bin", binSchema);