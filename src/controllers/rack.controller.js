import * as rackService from "../services/rack.service.js";

/*
CREATE
*/
export const createRack = async (req, res, next) => {
  try {
    const rack = await rackService.createRackService(req.body);

    res.status(201).json({
      success: true,
      message: "Rack created successfully",
      data: rack,
    });
  } catch (error) {
    next(error);
  }
};

/*
GET ALL
*/
export const getRacks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { total, racks } =
      await rackService.getRacksService(page, limit);

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data: racks,
    });
  } catch (error) {
    next(error);
  }
};

/*
GET SINGLE
*/
export const getRack = async (req, res, next) => {
  try {
    const rack = await rackService.getRackByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: rack,
    });
  } catch (error) {
    next(error);
  }
};

/*
UPDATE
*/
export const updateRack = async (req, res, next) => {
  try {
    const rack = await rackService.updateRackService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Rack updated successfully",
      data: rack,
    });
  } catch (error) {
    next(error);
  }
};

/*
DELETE
*/
export const deleteRack = async (req, res, next) => {
  try {
    await rackService.deleteRackService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Rack deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};