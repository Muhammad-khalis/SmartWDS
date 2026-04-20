import mongoose from "mongoose";
import SalesOrder from "../models/salesOrder.model.js";
import Product from "../models/product.model.js";
import Bin from "../models/bin.model.js";
import Ledger from "../models/ledger.model.js";

/**
 * Create Sales Order & Dispatch Stock
 * This function runs inside a MongoDB transaction (atomic logic)
 */
export const createSalesOrderService = async (data, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Find product
    const product = await Product.findById(data.productId).session(session);
    if (!product) throw new Error("Product not found");

    // 2️⃣ Check stock availability (Prevent negative stock)
    if (product.quantity < data.quantity) {
      throw new Error("Insufficient stock");
    }

    // 3️⃣ Find bin
    const bin = await Bin.findById(data.binId).session(session);
    if (!bin) throw new Error("Bin not found");

    // 4️⃣ Save quantity before update (for ledger)
    const quantityBefore = product.quantity;

    // 5️⃣ Reduce product stock
    product.quantity -= data.quantity;
    await product.save({ session });

    // 6️⃣ Reduce bin occupancy
    bin.currentCapacity -= data.quantity;
    await bin.save({ session });

    // 7️⃣ Create Sales Order (Status = Dispatched)
    const salesOrder = await SalesOrder.create(
      [
        {
          ...data,
          status: "Dispatched",
          userId,
        },
      ],
      { session }
    );

    // 8️⃣ Create Ledger Entry (OUT transaction)
    await Ledger.create(
      [
        {
          productId: product._id,
          type: "OUT",
          quantityBefore,
          quantityAfter: product.quantity,
          referenceId: data.referenceId,
          userId,
          notes: `Dispatched to ${data.customerName}`,
        },
      ],
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return salesOrder[0];
  } catch (error) {
    // Rollback if anything fails
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

/**
 * Single Sales Order by ID
 */
export const getSalesOrderByIdService = async (id) => {
  const order = await SalesOrder.findById(id)
    .populate("productId", "name sku price category") 
    .populate("binId", "name")
    .populate("userId", "name email"); // Kis ne dispatch kiya wo bhi dikhayega

  if (!order) {
    throw new Error("Sales order not found");
  }

  return order;
};

/**
 * Get All Sales Orders (with Pagination & Populate)
 */
export const getAllSalesOrdersService = async (query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  // populate se product aur bin ka asli naam bhi nazar aayega
  const orders = await SalesOrder.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("productId", "name sku") 
    .populate("binId", "name");

  const total = await SalesOrder.countDocuments();

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: orders,
  };
};

/**
 * Update Sales Order Status
 */
export const updateSalesOrderStatusService = async (id, status) => {
  const order = await SalesOrder.findById(id);
  if (!order) throw new Error("Sales order not found");

  order.status = status;
  await order.save();

  return order;
};