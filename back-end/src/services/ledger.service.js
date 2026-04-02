import Ledger from "../models/ledger.model.js";

export const getLedgerByProductService = async (productId, query) => {

const { page = 1, limit = 10 } = query;

const skip = (page - 1) * limit;

const ledgerEntries = await Ledger
.find({ productId })
.populate("productId", "name sku") // 👈 product details
.sort({ createdAt: -1 })
.skip(skip)
.limit(Number(limit));

const total = await Ledger.countDocuments({ productId });

return {
total,
page: Number(page),
pages: Math.ceil(total / limit),
data: ledgerEntries,
};

};
