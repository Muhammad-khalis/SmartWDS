import Bin from "../models/bin.model.js";
import Rack from "../models/rack.model.js";
import mongoose from "mongoose";

/*
CREATE BIN
*/
export const createBinService = async (data) => {
  if (!mongoose.Types.ObjectId.isValid(data.rack)) {
    throw new Error("Invalid Rack ID format");
  }

  const rackExists = await Rack.findById(data.rack);
  if (!rackExists) {
    throw new Error("Rack not found");
  }

  const bin = await Bin.create(data);
  return bin;
};

/*
GET ALL BINS
*/
export const getBinsService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const bins = await Bin.find()
    .populate({
      path: "rack",
      populate: {
        path: "aisle",
        populate: {
          path: "zone",
          populate: { path: "warehouse" },
        },
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Bin.countDocuments();

  return { total, bins };
};

/*
GET SINGLE BIN
*/
export const getBinByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Bin ID format");
  }

  const bin = await Bin.findById(id).populate({
    path: "rack",
    populate: {
      path: "aisle",
      populate: {
        path: "zone",
        populate: { path: "warehouse" },
      },
    },
  });

  if (!bin) {
    throw new Error("Bin not found");
  }

  return bin;
};

/*
UPDATE BIN
*/
export const updateBinService = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Bin ID format");
  }

  const bin = await Bin.findById(id);
  if (!bin) {
    throw new Error("Bin not found");
  }

  // only update if data is provided
  if (data.currentStock !== undefined && data.currentStock > bin.capacity) {
    throw new Error("Stock exceeds bin capacity");
  }

  Object.keys(data).forEach((key) => {
    bin[key] = data[key];
  });

  await bin.save();
  return bin;
};

/*
DELETE BIN
*/
export const deleteBinService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Bin ID format");
  }

  const bin = await Bin.findById(id);
  if (!bin) {
    throw new Error("Bin not found");
  }

  await bin.deleteOne();
};