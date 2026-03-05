// controllers/ledger.controller.js

import { getLedgerByProductService } from "../services/ledger.service.js";

export const getLedgerByProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const result = await getLedgerByProductService(productId, req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};