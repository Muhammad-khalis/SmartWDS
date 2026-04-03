import { useEffect, useState } from "react";
import { getDispatch } from "../services/outbound.services.js";
import DispatchForm from "../components/DispatchForm.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

/*
Outbound Page

Displays
• dispatch form
• order tracking
*/

const Outbound = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    const data = await getDispatch();

    setOrders(data.data || []);

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  return (

    <div className="p-6 space-y-6">

      <DispatchForm refresh={fetchOrders} />

      <div className="bg-white shadow rounded p-4">

        <h2 className="font-semibold mb-4">
          Dispatch Orders
        </h2>

        <table className="w-full">

          <thead className="bg-gray-800 text-white">

            <tr>

              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((o) => (

              <tr key={o._id} className="border-b">

                <td className="p-2">
                  {o.customerName}
                </td>

                <td className="p-2 text-center">
                  {o.quantity}
                </td>

                <td className="p-2 text-center">
                  <StatusBadge status={o.status || "Pending"} />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Outbound;