import Zone from "../models/zone.model.js";

// create zone

export const createZoneService = async (data) => {
  const zone = await Zone.create(data);
  return zone;
};
     
   //getallzone servoce

export const getZonesService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const zones = await Zone.find()
    .populate("warehouse", "name location")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total = await Zone.countDocuments();
  return { total, zones };
};
  
  //getzonebyid

export const getZoneByIdService = async (id) => {
  const zone = await Zone.findById(id).populate("warehouse", "name location");
  if (!zone) throw new Error("Zone not found");
  return zone;
};

  //update zone

export const updateZoneService = async (id, data) => {
  const zone = await Zone.findByIdAndUpdate(id, data, { new: true });
  if (!zone) throw new Error("Zone not found");
  return zone;
};

// delet zone

export const deleteZoneService = async (id) => {
  const zone = await Zone.findByIdAndDelete(id);
  if (!zone) throw new Error("Zone not found");
  return zone;
};
