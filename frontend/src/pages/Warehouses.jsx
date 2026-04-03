import { useEffect, useState } from "react";
import { getWarehouses } from "../services/warehouse.service.js";

import WarehouseForm from "../components/warehouse/WarehouseForm.jsx";
import WarehouseList from "../components/warehouse/WarehouseList.jsx";

const Warehouses = () => {

  const [warehouses, setWarehouses] = useState([]);

  const fetchWarehouses = async () => {
    try {

      const res = await getWarehouses();

      console.log("WAREHOUSES:", res);

      setWarehouses(res.warehouses || []);

    } catch (error) {

      console.error("Failed to load warehouses", error);

    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (

    <div className="max-w-6xl mx-auto p-8 space-y-8">

      {/* Page Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Warehouses
        </h1>

        <p className="text-gray-500 mt-1">
          Manage warehouse locations and storage
        </p>

      </div>

      {/* Grid Layout */}

      <div className="grid grid-cols-2 gap-6">

        <WarehouseForm refresh={fetchWarehouses} />

       <WarehouseList warehouses={warehouses} refresh={fetchWarehouses} />
      </div>

    </div>

  );

};

export default Warehouses;