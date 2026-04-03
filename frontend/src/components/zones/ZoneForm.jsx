import { useEffect, useState } from "react";
import api from "../../api/axios";
import { createZone } from "../../services/zone.service.js";
const ZoneForm = ({ refresh }) => {

  const [name, setName] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState([]);

 const fetchWarehouses = async () => {

  try {

    const res = await api.get("/warehouses");

    console.log(res.data);

    setWarehouses(res.data.warehouses || []);

  } catch (error) {

    console.error("Failed to load warehouses");

  }

};

  useEffect(() => {

    fetchWarehouses();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !warehouse) {
      alert("Please fill all fields");
      return;
    }

    await createZone({ name, warehouse });

    setName("");
    setWarehouse("");

    refresh();

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >

      <h2 className="text-xl font-semibold">
        Create Zone
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Zone Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
      >

        <option value="">Select Warehouse</option>

        {warehouses.map((w) => (

          <option key={w._id} value={w._id}>
            {w.name} ({w.location})
          </option>

        ))}

      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Zone
      </button>

    </form>

  );

};

export default ZoneForm;