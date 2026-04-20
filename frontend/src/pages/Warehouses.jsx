import { useEffect, useState } from "react";
import { getWarehouses } from "../services/warehouse.service.js";

import WarehouseForm from "../components/warehouse/WarehouseForm.jsx";
import WarehouseList from "../components/warehouse/WarehouseList.jsx";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const res = await getWarehouses();
      // Ensure data structure integrity
      setWarehouses(res.warehouses || res.data || []);
    } catch (error) {
      console.error("Failed to load warehouses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- PAGE HEADER (HCI: Clear Recognition) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Warehouse Management
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Configure and monitor global storage facilities and logistics hubs.
            </p>
          </div>
          <button 
            onClick={fetchWarehouses}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            🔄 Refresh List
          </button>
        </div>

        {/* --- GRID LAYOUT (Responsive: 1 col on mobile, 12-column grid on desktop) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Section (Left Side - Smaller Width) */}
          <div className="lg:col-span-5 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-2">
             <WarehouseForm refresh={fetchWarehouses} />
          </div>

          {/* List Section (Right Side - Larger Width) */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px] overflow-hidden">
            {loading ? (
              /* HCI: System Status Feedback */
              <div className="p-12 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : warehouses.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-32 opacity-40">
                <span className="text-6xl mb-4">🏢</span>
                <p className="text-lg font-bold text-slate-900 italic underline decoration-indigo-200">No active warehouses defined.</p>
              </div>
            ) : (
              <WarehouseList warehouses={warehouses} refresh={fetchWarehouses} />
            )}
          </div>

        </div>

        {/* Footer Meta */}
        <div className="pt-10 flex justify-center opacity-30">
          
        </div>

      </div>
    </div>
  );
};

export default Warehouses;