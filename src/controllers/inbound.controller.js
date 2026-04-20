/*
Controller validates input and returns response
*/

import {
  createGRNService,
  getGRNsService,
  deleteGRNService
} from "../services/inbound.service.js";

import { createGRNSchema } from "../validations/inbound.validation.js";


// ✅ CREATE
export const createGRN = async (req, res, next) => {
  try {
    const { error } = createGRNSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const grn = await createGRNService(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "GRN created successfully",
      data: grn,
    });

  } catch (err) {
    next(err);
  }
};


// ✅ GET
export const getGRNs = async (req, res, next) => {
  try {
    const result = await getGRNsService(req.query);

    res.json({
      success: true,
      ...result,
    });

  } catch (err) {
    next(err);
  }
};


// 🔥 DELETE (NEW)
export const deleteGRN = async (req, res, next) => {
  try {

    const result = await deleteGRNService(
      req.params.id,
      req.user?._id
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (err) {
    next(err);
  }
};