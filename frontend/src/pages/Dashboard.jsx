import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import { getDashboardData } from "../services/dashboard.service.js";

const Dashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await getDashboardData();

        setData(res);

      } catch (err) {

        console.error("Dashboard error:", err);

      }

    };

    fetchData();

  }, []);

  if (!data) {

    return (
      <Layout>
        <div className="p-10 text-gray-500">
          Loading dashboard...
        </div>
      </Layout>
    );

  }

  return (

    <Layout>

      <div className="p-8 space-y-10">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            Inventory Overview
          </h1>

          <p className="text-gray-500">
            Warehouse alerts and recent activity
          </p>

        </div>


        {/* QUICK ACTIONS */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <a
              href="/products/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Product
            </a>

            <a
              href="/inbound"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Receive Goods
            </a>

            <a
              href="/outbound"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Dispatch Order
            </a>

            <a
              href="/warehouses"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Create Warehouse
            </a>

          </div>

        </div>


        {/* LOW STOCK */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Critical Low Stock
          </h2>

          <table className="w-full text-sm">

            <thead className="border-b">

              <tr>

                <th className="text-left p-2">Product</th>
                <th className="p-2 text-left">SKU</th>
                <th className="p-2 text-left">Quantity</th>

              </tr>

            </thead>

            <tbody>

              {data.lowStockProducts?.length === 0 && (

                <tr>

                  <td colSpan="3" className="p-4 text-gray-400 text-center">
                    No low stock products
                  </td>

                </tr>

              )}

              {data.lowStockProducts?.map((p) => (

                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-2 font-medium">
                    {p.name}
                  </td>

                  <td className="p-2 text-gray-500">
                    {p.sku}
                  </td>

                  <td className="p-2 text-red-500 font-semibold">
                    {p.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* RECENT TRANSACTIONS */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Recent Transactions
          </h2>

          <table className="w-full text-sm">

            <thead className="border-b">

              <tr>

                <th className="text-left p-2">Product</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Reference</th>

              </tr>

            </thead>

            <tbody>

              {data.recentTransactions?.length === 0 && (

                <tr>

                  <td colSpan="3" className="p-4 text-gray-400 text-center">
                    No recent transactions
                  </td>

                </tr>

              )}

              {data.recentTransactions?.map((t) => (

                <tr
                  key={t._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-2 font-medium">
                    {t.productId?.name || "Unknown"}
                  </td>

                  <td className="p-2">

                    {t.type === "IN" ? (

                      <span className="text-green-600 font-semibold">
                        IN
                      </span>

                    ) : (

                      <span className="text-red-600 font-semibold">
                        OUT
                      </span>

                    )}

                  </td>

                  <td className="p-2 text-gray-500">
                    {t.referenceId}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );

};

export default Dashboard;