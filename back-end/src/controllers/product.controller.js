import {
  createProductService,
  getProductsService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js";
// 🟢 Top of your product.controller.js
import Product from "../models/product.model.js"; // ✅ Product model import
import { createProductSchema } from "../validations/product.validation.js";


// =============================
// CREATE PRODUCT
// =============================
export const createProduct = async (req, res, next) => {
  try {

    const { error } = createProductSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const product = await createProductService(req.body);

    res.status(201).json({
      success: true,
      product
    });

  } catch (err) {
    next(err);
  }
};


// =============================
// GET PRODUCTS
// =============================
export const getProducts = async (req, res, next) => {
  try {

    const result = await getProductsService(req.query);

    res.json({
      success: true,
      ...result
    });

  } catch (err) {
    next(err);
  }
};

// =============================
// GET SINGLE PRODUCT BY ID
// =============================
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) throw new Error("Product not found");

    // lowStock flag add karna
    const formattedProduct = {
      ...product._doc,
      lowStock: product.quantity <= product.reorderLevel
    };

    res.json({
      success: true,
      product: formattedProduct
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// UPDATE PRODUCT (WITH LEDGER)
// =============================
export const updateProduct = async (req, res, next) => {
  try {

    // ⚠ Make sure auth middleware sets req.user
    const userId = req.user?._id || null;

    const product = await updateProductService(
      req.params.id,
      req.body,
      userId,
      req.body.referenceId || null
    );

    res.json({
      success: true,
      product
    });

  } catch (err) {
    next(err);
  }
};


// =============================
// DELETE PRODUCT
// =============================
export const deleteProduct = async (req, res, next) => {
  try {

    await deleteProductService(req.params.id);

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (err) {
    next(err);
  }
};