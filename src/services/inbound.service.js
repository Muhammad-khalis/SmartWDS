import GRN from "../models/grn.model.js";
import Product from "../models/product.model.js";
import Bin from "../models/bin.model.js";
import Ledger from "../models/ledger.model.js";

export const createGRNService = async (data, userId) => {
  const product = await Product.findById(data.productId);
  if (!product) throw new Error("Product not found");

  const bin = await Bin.findById(data.binId);
  if (!bin) throw new Error("Bin not found");

  if (bin.currentCapacity + data.quantity > bin.capacity) {
    throw new Error("Bin capacity exceeded");
  }

  const quantityBefore = product.quantity;
  product.quantity += data.quantity;
  await product.save();

  bin.currentCapacity += data.quantity;
  await bin.save();

  try {
    await Ledger.create({
      productId: product._id,
      type: "IN",
      quantityBefore,
      quantityAfter: product.quantity,
      userId,
      referenceId: data.referenceId,
      notes: `Received from ${data.supplier}`,
    });
  } catch (error) {
    console.error("Ledger creation failed:", error.message);
  }

  const grn = await GRN.create({
    ...data,
    userId,
  });

  return grn;
};

export const getGRNsService = async (query) => {
  const { page = 1, limit = 10, productId, supplier } = query;
  const skip = (page - 1) * limit;

  let filter = {};
  if (productId) filter.productId = productId;
  if (supplier) filter.supplier = supplier;

  const grns = await GRN.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("productId", "name sku category")
    .populate("binId", "name");

  const total = await GRN.countDocuments(filter);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: grns,
  };
};



// 🔥 NEW: DELETE SERVICE (SAFE + 10/10)
export const deleteGRNService = async (grnId, userId) => {

  const grn = await GRN.findById(grnId);
  if (!grn) throw new Error("GRN not found");

  const product = await Product.findById(grn.productId);
  if (!product) throw new Error("Product not found");

  const bin = await Bin.findById(grn.binId);
  if (!bin) throw new Error("Bin not found");

  // safety check
  if (product.quantity < grn.quantity) {
    throw new Error("Stock inconsistency detected");
  }

  const quantityBefore = product.quantity;

  // reverse stock
  product.quantity -= grn.quantity;
  await product.save();

  bin.currentCapacity -= grn.quantity;
  await bin.save();

  // ledger reverse
  try {
    await Ledger.create({
      productId: product._id,
      type: "OUT",
      quantityBefore,
      quantityAfter: product.quantity,
      userId,
      referenceId: grn.referenceId,
      notes: `GRN deleted (reversal)`,
    });
  } catch (error) {
    console.error("Ledger reversal failed:", error.message);
  }

  await GRN.findByIdAndDelete(grnId);

  return { message: "GRN deleted successfully" };
};