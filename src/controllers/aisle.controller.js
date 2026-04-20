import * as aisleService from "../services/aisle.service.js";

/*
CREATE
*/
export const createAisle = async (req, res, next) => {
  try {
    const aisle = await aisleService.createAisleService(req.body);

    res.status(201).json({
      success: true,
      message: "Aisle created successfully",
      data: aisle,
    });
  } catch (error) {
    next(error);
  }
};

/*
GET ALL
*/
export const getAisles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { total, aisles } =
      await aisleService.getAislesService(page, limit);

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data: aisles,
    });
  } catch (error) {
    next(error);
  }
};

/*
GET SINGLE
*/
export const getAisle = async (req, res, next) => {
  try {
    const aisle = await aisleService.getAisleByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: aisle,
    });
  } catch (error) {
    next(error);
  }
};

/*
UPDATE
*/
export const updateAisle = async (req, res, next) => {
  try {
    const aisle = await aisleService.updateAisleService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Aisle updated successfully",
      data: aisle,
    });
  } catch (error) {
    next(error);
  }
};

/*
DELETE
*/
export const deleteAisle = async (req, res, next) => {
  try {
    await aisleService.deleteAisleService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Aisle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};