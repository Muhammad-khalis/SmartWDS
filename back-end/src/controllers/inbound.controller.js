/*purpose
Controller validates input and returns response.
Calls service to handle logic*/


import { createGRNService, getGRNsService } from "../services/inbound.service.js";
import { createGRNSchema } from "../validations/inbound.validation.js";

export const createGRN = async (req, res, next) => {
  try {
    const { error } = createGRNSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const grn = await createGRNService(req.body, req.user._id);

    res.status(201).json({ success: true, grn });
  } catch (err) {
    next(err);
  }
};

export const getGRNs = async (req, res, next) => {
  try {
    const result = await getGRNsService(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};