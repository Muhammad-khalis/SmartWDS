import Product from "../models/product.model.js";
import Ledger from "../models/ledger.model.js";

// =============================
// CREATE PRODUCT
// =============================
export const createProductService = async (data) => {
  // Check SKU uniqueness
  const existing = await Product.findOne({ sku: data.sku });
  if (existing) {
    throw new Error("SKU already exists");
  }

  const product = await Product.create(data);
  return product;
};

// =============================
// GET PRODUCTS (Search + Filter + Pagination)
// =============================
export const getProductsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const category = query.category;
  const search = query.search;
  const skip = (page - 1) * limit;

  let filter = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  const formattedProducts = products.map((product) => ({
    ...product._doc,
    lowStock: product.quantity <= product.reorderLevel,
  }));

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    data: formattedProducts,
  };
};

// =============================
// UPDATE PRODUCT (WITH AUTO LEDGER)
// =============================
export const updateProductService = async (id, data, userId, referenceId) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  // Check SKU uniqueness (ignore self)
  if (data.sku && data.sku !== product.sku) {
    const existing = await Product.findOne({ sku: data.sku });
    if (existing && existing._id.toString() !== id) {
      throw new Error("SKU already exists");
    }
    product.sku = data.sku;
  }

  const quantityBefore = product.quantity;

  // Update allowed fields
  if (data.name !== undefined) product.name = data.name;
  if (data.category !== undefined) product.category = data.category;
  if (data.price !== undefined) product.price = data.price;
  if (data.reorderLevel !== undefined) product.reorderLevel = data.reorderLevel;
  if (data.quantity !== undefined) product.quantity = data.quantity;

  await product.save();

  // Low stock alert
  if (product.quantity <= product.reorderLevel) {
    console.log(`⚠ Low Stock Alert for ${product.name} (SKU: ${product.sku})`);
  }

  // Create Ledger entry if quantity changed
  if (data.quantity !== undefined && quantityBefore !== product.quantity) {
    const type = product.quantity > quantityBefore ? "IN" : "OUT";

    await Ledger.create({
      productId: product._id,
      type,
      quantityBefore,
      quantityAfter: product.quantity,
      userId,
      referenceId,
      notes: data.notes || "",
    });
  }

  return product;
};

// =============================
// DELETE PRODUCT
// =============================
export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
  return product;
};