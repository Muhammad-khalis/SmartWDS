import Ledger from "../models/ledger.model.js";
import { getLedgerByProductService } from "../services/ledger.service.js";

/*
Get ledger by product
*/
export const getLedgerByProduct = async (req, res, next) => {
try {

const productId = req.params.productId;

const result = await getLedgerByProductService(
  productId,
  req.query
);

res.json({
  success: true,
  ...result
});


} catch (err) {

next(err);


}
};

/*
Get all ledger entries
*/
export const getAllLedger = async (req, res) => {

const entries = await Ledger
.find()
.populate("productId", "name sku")
.sort({ createdAt: -1 });

res.json({
success: true,
data: entries
});

};
