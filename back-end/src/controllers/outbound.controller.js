import {
  createSalesOrderService,
  updateSalesOrderStatusService,
  getAllSalesOrdersService,
  getSalesOrderByIdService
} from "../services/outbound.service.js";

import {
  createSalesOrderSchema,
  updateStatusSchema,
} from "../validations/outbound.validation.js";

/**
 * Create Sales Order Controller
 */
export const createSalesOrder = async (req, res, next) => {
  try {
    const { error } = createSalesOrderSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const order = await createSalesOrderService(
      req.body,
      req.user._id
    );

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Single Sales Order Controller
 */
export const getSalesOrderById = async (req, res, next) => {
  try {
    const order = await getSalesOrderByIdService(req.params.id);
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get All Sales Orders Controller
 */
export const getSalesOrders = async (req, res, next) => {
  try {
    const result = await getAllSalesOrdersService(req.query);
    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update Status Controller
 */
export const updateSalesOrderStatus = async (req, res, next) => {
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const order = await updateSalesOrderStatusService(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};