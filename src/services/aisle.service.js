import Aisle from "../models/aisle.model.js";
import Zone from "../models/zone.model.js";

/*
CREATE AISLE
*/
export const createAisleService = async (data) => {
  const zoneExists = await Zone.findById(data.zone);
  if (!zoneExists) {
    throw new Error("Zone not found");
  }

  const aisle = await Aisle.create(data);
  return aisle;
};

/*
GET ALL AISLES (with pagination)
*/
export const getAislesService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const aisles = await Aisle.find()
    .populate({
      path: "zone",
      populate: { path: "warehouse" },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Aisle.countDocuments();

  return { total, aisles };
};

/*
GET SINGLE AISLE
*/
export const getAisleByIdService = async (id) => {
  const aisle = await Aisle.findById(id).populate({
    path: "zone",
    populate: { path: "warehouse" },
  });

  if (!aisle) {
    throw new Error("Aisle not found");
  }

  return aisle;
};

/*
UPDATE AISLE
*/
export const updateAisleService = async (id, data) => {
  const aisle = await Aisle.findById(id);

  if (!aisle) {
    throw new Error("Aisle not found");
  }

  if (data.zone) {
    const zoneExists = await Zone.findById(data.zone);
    if (!zoneExists) {
      throw new Error("Zone not found");
    }
  }

  const updated = await Aisle.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updated;
};

/*
DELETE AISLE
*/
export const deleteAisleService = async (id) => {
  const aisle = await Aisle.findById(id);

  if (!aisle) {
    throw new Error("Aisle not found");
  }

  await aisle.deleteOne();
};