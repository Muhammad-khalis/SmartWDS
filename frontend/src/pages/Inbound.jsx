import { useEffect, useState } from "react";
import { getGRNs, deleteGRN } from "../services/inbound.service.js";
import GRNForm from "../components/GRNForm.jsx";

/*
Inbound Page
*/

const Inbound = () => {

  const [grns, setGrns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGRN = async () => {
    try {
      const data = await getGRNs();
      setGrns(data.data || []);
    } catch (error) {
      console.error("Failed to load GRN history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGRN();
  }, []);

  // 🔥 DELETE HANDLER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this GRN?");
    if (!confirmDelete) return;

    try {
      await deleteGRN(id);
      fetchGRN(); // 🔄 refresh after delete
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (

    <div className="p-6 space-y-6">

      {/* GRN Creation Form */}
      <GRNForm refresh={fetchGRN} />

      {/* GRN History */}
      <div className="bg-white shadow rounded p-4">

        <h2 className="text-lg font-semibold mb-4">
          GRN History
        </h2>

        <table className="w-full">

          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-left">Supplier</th>
              <th className="p-2 text-center">Actions</th> {/* 🔥 NEW */}
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading GRN records...
                </td>
              </tr>
            )}

            {!loading && grns.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No GRN records found
                </td>
              </tr>
            )}

            {!loading && grns.map((g) => (

              <tr key={g._id} className="border-b hover:bg-gray-50">

                <td className="p-2">
                  {g.productId?.name || "Unknown"}
                </td>

                <td className="p-2 text-center">
                  {g.quantity}
                </td>

                <td className="p-2">
                  {g.supplier}
                </td>

                {/* 🔥 DELETE BUTTON */}
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(g._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Inbound;