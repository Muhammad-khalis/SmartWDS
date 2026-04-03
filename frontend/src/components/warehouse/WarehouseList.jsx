import { useState } from "react";
import { deleteWarehouse, updateWarehouse } from "../../services/warehouse.service.js";

const WarehouseList = ({ warehouses, refresh }) => {

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // DELETE
  const handleDelete = async (id) => {

    try {

      await deleteWarehouse(id);

      refresh();

    } catch (error) {

      console.error("Delete failed", error);

    }

  };

  // START EDIT
  const startEdit = (warehouse) => {

    setEditingId(warehouse._id);
    setName(warehouse.name);
    setLocation(warehouse.location);

  };

  // SAVE EDIT
  const handleUpdate = async (id) => {

    try {

      await updateWarehouse(id, {
        name,
        location
      });

      setEditingId(null);

      refresh();

    } catch (error) {

      console.error("Update failed", error);

    }

  };

  return (

    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

      <div className="p-6 border-b">

        <h2 className="text-lg font-semibold text-gray-800">
          Warehouses
        </h2>

      </div>

      {warehouses.length === 0 && (
        <p className="p-6 text-gray-500">
          No warehouses found
        </p>
      )}

      {warehouses.length > 0 && (

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b">

            <tr>

              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Name
              </th>

              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Location
              </th>

              <th className="px-6 py-3 text-right font-semibold text-gray-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {warehouses.map((w) => (

              <tr
                key={w._id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* NAME */}

                <td className="px-6 py-4 font-medium text-gray-800">

                  {editingId === w._id ? (

                    <input
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      className="border p-1 rounded w-full"
                    />

                  ) : (

                    w.name

                  )}

                </td>

                {/* LOCATION */}

                <td className="px-6 py-4 text-gray-500">

                  {editingId === w._id ? (

                    <input
                      value={location}
                      onChange={(e)=>setLocation(e.target.value)}
                      className="border p-1 rounded w-full"
                    />

                  ) : (

                    w.location

                  )}

                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4 text-right space-x-2">

                  {editingId === w._id ? (

                    <button
                      onClick={()=>handleUpdate(w._id)}
                      className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      onClick={()=>startEdit(w)}
                      className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Edit
                    </button>

                  )}

                  <button
                    onClick={()=>handleDelete(w._id)}
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

};

export default WarehouseList;