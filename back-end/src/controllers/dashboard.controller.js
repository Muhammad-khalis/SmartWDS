import Product from "../models/product.model.js";
import GRN from "../models/grn.model.js";
import SalesOrder from "../models/salesOrder.model.js";
import Ledger from "../models/ledger.model.js";

/*
Production Level Dashboard Controller (Optimized)
*/
export const getDashboardStats = async (req, res) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    // Using Promise.all to execute all DB queries simultaneously (Performance Boost)
    const [
      inventoryStats,
      lowStockData,
      inventoryByCategory,
      inboundStats,
      outboundStats,
      topProductsRaw,
      recentTransactions
    ] = await Promise.all([
      
      // 1. Total Inventory Value (Calculated on DB side, not in Node.js memory)
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { 
              $sum: { $multiply: ["$quantity", { $ifNull: ["$price", 0] }] } 
            }
          }
        }
      ]),

      // 2. Low Stock Count & List (Limited to 10 for UI performance)
      Product.find({ quantity: { $lt: 10 } })
        .select("name sku quantity")
        .limit(10)
        .lean(),

      // 3. Inventory Value By Category
      Product.aggregate([
        {
          $group: {
            _id: "$category",
            value: { $sum: { $multiply: ["$quantity", "$price"] } }
          }
        },
        { $project: { name: { $ifNull: ["$_id", "Unknown"] }, value: 1, _id: 0 } }
      ]),

      // 4. Monthly Inbound (Filtered for Current Year)
      GRN.aggregate([
        { $match: { createdAt: { $gte: startOfYear } } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            inbound: { $sum: "$quantity" }
          }
        }
      ]),

      // 5. Monthly Outbound (Filtered for Current Year)
      SalesOrder.aggregate([
        { $match: { createdAt: { $gte: startOfYear } } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            outbound: { $sum: "$quantity" }
          }
        }
      ]),

      // 6. Top 5 Products by Sales Volume
      SalesOrder.aggregate([
        { $group: { _id: "$productId", value: { $sum: "$quantity" } } },
        { $sort: { value: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "products", // Ensure this matches your MongoDB collection name
            localField: "_id",
            foreignField: "_id",
            as: "product"
          }
        },
        { $unwind: "$product" },
        { $project: { name: "$product.name", value: 1, _id: 0 } }
      ]),

      // 7. Recent Transactions (Ledger)
      Ledger.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .populate("productId", "name sku")
        .lean()
    ]);

    // Format Monthly Movement Data for Charts (Jan - Dec)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthlyMovement = months.map((month, index) => {
      const monthNum = index + 1;
      return {
        month,
        inbound: inboundStats.find(m => m._id === monthNum)?.inbound || 0,
        outbound: outboundStats.find(m => m._id === monthNum)?.outbound || 0
      };
    });

    // Final Response Construction
    res.status(200).json({
      totalValue: inventoryStats[0]?.totalValue || 0,
      lowStockCount: lowStockData.length,
      lowStockProducts: lowStockData,
      inventoryValueByCategory: inventoryByCategory,
      monthlyMovement,
      topProducts: topProductsRaw,
      recentTransactions,
      // Aggregating simple flow totals for the pie chart/summary
      flow: [
        { name: "Inbound", value: inboundStats.reduce((acc, curr) => acc + curr.inbound, 0) },
        { name: "Outbound", value: outboundStats.reduce((acc, curr) => acc + curr.outbound, 0) }
      ]
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
};