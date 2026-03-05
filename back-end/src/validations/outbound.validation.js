import Joi from "joi";

export const createSalesOrderSchema = Joi.object({
  productId: Joi.string().required(),
  binId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  customerName: Joi.string().required(),
  referenceId: Joi.string().required(),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Dispatched", "Delivered")
    .required(),
});