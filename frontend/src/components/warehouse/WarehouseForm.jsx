import { useState } from "react";
import { createWarehouse } from "../../services/warehouse.service.js";

const WarehouseForm = ({ refresh }) => {

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await createWarehouse({
        name,
        location
      });

      console.log("Created:", res);

      setName("");
      setLocation("");

      refresh();

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Create Warehouse
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Warehouse Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 w-full rounded-lg transition"
        >
          Create Warehouse
        </button>

      </form>

    </div>

  );

};

export default WarehouseForm;