import GRN from "../models/grn.model.js";
import Product from "../models/product.model.js";
import Bin from "../models/bin.model.js";
import Ledger from "../models/ledger.model.js";

export const createGRNService = async (data, userId) => {
  // 1️⃣ Find product
  const product = await Product.findById(data.productId);
  if (!product) throw new Error("Product not found");

  // 2️⃣ Find bin
  const bin = await Bin.findById(data.binId);
  if (!bin) throw new Error("Bin not found");

  // 3️⃣ Check bin capacity
  if (bin.currentCapacity + data.quantity > bin.capacity) {
    throw new Error("Bin capacity exceeded");
  }

  // 4️⃣ Update product quantity
  const quantityBefore = product.quantity;
  product.quantity += data.quantity;
  await product.save();

  // 5️⃣ Update bin occupancy
  bin.currentCapacity += data.quantity;
  await bin.save();

  // 6️⃣ Create ledger entry (automatic)
  await Ledger.create({
    productId: product._id,
    type: "IN",
    quantityBefore,
    quantityAfter: product.quantity,
    userId,
    referenceId: data.referenceId,
    notes: `Received from ${data.supplier}`,
  });

  // 7️⃣ Save GRN
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