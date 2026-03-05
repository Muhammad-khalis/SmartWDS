import * as binService from "../services/bin.service.js";

/*
CREATE BIN
*/
export const createBin = async (req, res, next) => {
  try {
    const bin = await binService.createBinService(req.body);

    res.status(201).json({
      success: true,
      message: "Bin created successfully",
      data: bin,
    });
  } catch (error) {
    next(error);
  }
};

/*
GET ALL BINS
*/
export const getBins = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { total, bins } = await binService.getBinsService(page, limit);

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data: bins,
    });
  } catch (error) {
    next(error);
  }
};

/*
GET SINGLE BIN
*/
export const getBin = async (req, res, next) => {
  try {
    const bin = await binService.getBinByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: bin,
    });
  } catch (error) {
    next(error);
  }
};

/*
UPDATE BIN
*/
export const updateBin = async (req, res, next) => {
  try {
    // safe update using service
    const updatedBin = await binService.updateBinService(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Bin updated successfully",
      data: updatedBin,
    });
  } catch (err) {
    next(err);
  }
};
/*
DELETE BIN
*/
export const deleteBin = async (req, res, next) => {
  try {
    await binService.deleteBinService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bin deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};