import Warehouse from "../models/warehouse.model.js";

// Create Warehouse
export const createWarehouse = async (req, res, next) => {
  try {
    const { name, location, description } = req.body;

    // Check duplicate
    const exist = await Warehouse.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: "Warehouse already exists" });
    }

    const warehouse = await Warehouse.create({
      name,
      location,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, warehouse });
  } catch (err) {
    next(err);
  }
};

// Get All Warehouses (with optional pagination)
export const getAllWarehouses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const warehouses = await Warehouse.find().skip(skip).limit(limit);
    const total = await Warehouse.countDocuments();

    res.json({ success: true, total, page, limit, warehouses });
  } catch (err) {
    next(err);
  }
};

// Get Single Warehouse
export const getSingleWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.json({ success: true, warehouse });
  } catch (err) {
    next(err);
  }
};

// Update Warehouse
export const updateWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.json({ success: true, warehouse });
  } catch (err) {
    next(err);
  }
};

// Delete Warehouse
export const deleteWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.json({ success: true, message: "Warehouse deleted" });
  } catch (err) {
    next(err);
  }
};