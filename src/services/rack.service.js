import Rack from "../models/rack.model.js";
import Aisle from "../models/aisle.model.js";
import mongoose from "mongoose";

/*
CREATE RACK
*/
export const createRackService = async (data) => {
  if (!mongoose.Types.ObjectId.isValid(data.aisle)) {
    throw new Error("Invalid Aisle ID format");
  }

  const aisleExists = await Aisle.findById(data.aisle);
  if (!aisleExists) {
    throw new Error("Aisle not found");
  }

  const rack = await Rack.create(data);
  return rack;
};

/*
GET ALL RACKS
*/
export const getRacksService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const racks = await Rack.find()
    .populate({
      path: "aisle",
      populate: {
        path: "zone",
        populate: { path: "warehouse" },
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Rack.countDocuments();

  return { total, racks };
};

/*
GET SINGLE RACK
*/
export const getRackByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Rack ID format");
  }

  const rack = await Rack.findById(id).populate({
    path: "aisle",
    populate: {
      path: "zone",
      populate: { path: "warehouse" },
    },
  });

  if (!rack) {
    throw new Error("Rack not found");
  }

  return rack;
};

/*
UPDATE RACK
*/
export const updateRackService = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Rack ID format");
  }

  if (data.aisle) {
    if (!mongoose.Types.ObjectId.isValid(data.aisle)) {
      throw new Error("Invalid Aisle ID format");
    }

    const aisleExists = await Aisle.findById(data.aisle);
    if (!aisleExists) {
      throw new Error("Aisle not found");
    }
  }

  const rack = await Rack.findByIdAndUpdate(id, data, { new: true });

  if (!rack) {
    throw new Error("Rack not found");
  }

  return rack;
};

/*
DELETE RACK
*/
export const deleteRackService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Rack ID format");
  }

  const rack = await Rack.findById(id);
  if (!rack) {
    throw new Error("Rack not found");
  }

  await rack.deleteOne();
};