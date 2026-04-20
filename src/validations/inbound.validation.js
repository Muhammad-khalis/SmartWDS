import Joi from "joi";

export const createGRNSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  binId: Joi.string().required(),
  supplier: Joi.string().required(),
  referenceId: Joi.string().required(),
});