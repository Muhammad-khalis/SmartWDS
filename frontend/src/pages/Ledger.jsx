import { useEffect, useState } from "react";
import api from "../api/axios.js";

/*
Inventory Ledger
----------------

Displays product movement history
(IN / OUT transactions)
*/

const Ledger = () => {

const [entries, setEntries] = useState([]);
const [loading, setLoading] = useState(true);

const fetchLedger = async () => {

  try {

    const res = await api.get("/ledger");

    setEntries(res.data.data || []);

  } catch (error) {

    console.error("Failed to load ledger:", error);

  } finally {

    setLoading(false);

  }

};

useEffect(() => {


fetchLedger();


}, []);

return (

<div className="p-6">

  <h1 className="text-xl font-bold mb-6">
    Inventory Ledger
  </h1>

  <div className="bg-white shadow rounded overflow-hidden">

    <table className="w-full">

      <thead className="bg-gray-800 text-white">

        <tr>
          <th className="p-3 text-left">Product</th>
          <th className="p-3 text-center">Type</th>
          <th className="p-3 text-center">Before</th>
          <th className="p-3 text-center">After</th>
          <th className="p-3 text-center">Reference</th>
        </tr>

      </thead>

      <tbody>

        {loading && (
          <tr>
            <td colSpan="5" className="text-center p-4">
              Loading ledger...
            </td>
          </tr>
        )}

        {!loading && entries.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-4">
              No ledger records found
            </td>
          </tr>
        )}

        {!loading && entries.map((e) => (

          <tr key={e._id} className="border-b hover:bg-gray-50">

            <td className="p-3">
              {e.productId?.name || "Unknown"}
            </td>

            <td className="p-3 text-center">

              {e.type === "IN" ? (
                <span className="text-green-600 font-semibold">
                  IN
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  OUT
                </span>
              )}

            </td>

            <td className="p-3 text-center">
              {e.quantityBefore}
            </td>

            <td className="p-3 text-center">
              {e.quantityAfter}
            </td>

            <td className="p-3 text-center">
              {e.referenceId}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


);

};

export default Ledger;
