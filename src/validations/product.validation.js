import Joi from "joi";

export const createProductSchema = Joi.object({

  // Product name (min 3 chars for safety)
  name: Joi.string()
    .min(3)
    .max(100)
    .trim()
    .required(),

  // SKU must be unique (DB level), here we just validate format
  sku: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),

  // Category name
  category: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required(),

  // Quantity cannot be negative
  quantity: Joi.number()
    .integer()
    .min(0)
    .required(),

  // Reorder level cannot be negative
  reorderLevel: Joi.number()
    .integer()
    .min(0)
    .required(),

  // Price must be positive number
  price: Joi.number()
    .precision(2)
    .min(0)
    .required(),

});