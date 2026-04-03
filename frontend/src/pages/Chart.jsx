import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.service.js";

import InventoryValueChart from "../components/charts/InventoryValueChart.jsx";
import MovementChart from "../components/charts/MovementChart.jsx";
import TopProductsChart from "../components/charts/TopProductsChart.jsx";
import InboundOutboundChart from "../components/charts/InboundOutboundChart.jsx";

const Dashboard = () => {

  const [data, setData] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      const res = await getDashboardData();
      setData(res);

    };

    fetchData();

  }, []);

  return (

    <div className="p-8 bg-gray-50 min-h-screen space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Inventory Overview
        </h1>

        <p className="text-gray-500">
          Real-time warehouse analytics & stock intelligence
        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-13 rounded-xl shadow-lg">

          <p className="text-sm opacity-100">
            Total Inventory Value
          </p>

          <h3 className="text-xl font-bold mt-2">
            ${data.totalValue?.toLocaleString() || 0}
          </h3>

        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-xl shadow-lg">

          <p className="text-sm opacity-80">
            Low Stock Items
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.lowStockCount || 0}
          </h2>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">

          <p className="text-sm opacity-80">
            Total Inbound
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.flow?.find(f => f.name === "Inbound")?.value || 0}
          </h2>

        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">

          <p className="text-sm opacity-80">
            Total Outbound
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.flow?.find(f => f.name === "Outbound")?.value || 0}
          </h2>

        </div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h3 className="font-semibold text-lg mb-4">
            Monthly Stock Movement
          </h3>

          <MovementChart data={data.monthlyMovement || []} />

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h3 className="font-semibold text-lg mb-4">
            Inventory Value by Category
          </h3>

          <InventoryValueChart data={data.inventoryValueByCategory || []} />

        </div>

      </div>


      {/* SECOND CHART ROW */}

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h3 className="font-semibold text-lg mb-4">
            Top Products
          </h3>

          <TopProductsChart data={data.topProducts || []} />

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h3 className="font-semibold text-lg mb-4">
            Inbound vs Outbound
          </h3>

          <InboundOutboundChart data={data.flow || []} />

        </div>

      </div>


      {/* TABLE SECTION */}

      <div className="grid grid-cols-2 gap-8">


        {/* Recent Transactions */}

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h3 className="font-semibold text-lg mb-4">
            Recent Transactions
          </h3>

          <table className="w-full text-sm">

            <thead className="text-gray-500">

              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-center py-2">Type</th>
                <th className="text-center py-2">Reference</th>
              </tr>

            </thead>

            <tbody>

              {(data.recentTransactions || []).map(t => (

                <tr key={t._id} className="border-t hover:bg-gray-50">

                  <td className="py-2">
                    {t.productId?.name}
                  </td>

                  <td className="text-center py-2">

                    {t.type === "IN"
                      ? <span className="text-green-600 font-semibold">IN</span>
                      : <span className="text-red-600 font-semibold">OUT</span>
                    }

                  </td>

                  <td className="text-center py-2">
                    {t.referenceId}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* Critical Stock */}

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h3 className="font-semibold text-lg mb-4">
            Critical Low Stock
          </h3>

          <div className="space-y-3">

            {(data.lowStockProducts || []).map(p => (

              <div
                key={p._id}
                className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
              >

                <div>

                  <p className="font-semibold">
                    {p.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    SKU: {p.sku}
                  </p>

                </div>

                <span className="text-red-600 font-semibold">
                  {p.quantity} left
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;