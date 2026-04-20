import * as zoneService from "../services/zone.service.js";

export const createZoneController = async (req, res, next) => {
  try {
    const zone = await zoneService.createZoneService(req.body);
    res.status(201).json({ success: true, zone });
  } catch (error) {
    next(error);
  }
};

export const getZonesController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { total, zones } = await zoneService.getZonesService(page, limit);
    res.json({ success: true, total, page, limit, zones });
  } catch (error) {
    next(error);
  }
};

export const getZoneByIdController = async (req, res, next) => {
  try {
    const zone = await zoneService.getZoneByIdService(req.params.id);
    res.json({ success: true, zone });
  } catch (error) {
    next(error);
  }
};

export const updateZoneController = async (req, res, next) => {
  try {
    const zone = await zoneService.updateZoneService(req.params.id, req.body);
    res.json({ success: true, zone });
  } catch (error) {
    next(error);
  }
};

export const deleteZoneController = async (req, res, next) => {
  try {
    await zoneService.deleteZoneService(req.params.id);
    res.json({ success: true, message: "Zone deleted successfully" });
  } catch (error) {
    next(error);
  }
};