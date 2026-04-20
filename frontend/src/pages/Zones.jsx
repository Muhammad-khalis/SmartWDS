import { useEffect, useState } from "react";
import { getZones } from "../services/zone.service.js";
import ZoneForm from "../components/zones/ZoneForm.jsx";
import ZoneTable from "../components/zones/ZoneTable.jsx";

const Zones = () => {
  const [zones, setZones] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const res = await getZones(page);
      setZones(res.zones || []);
    } catch (error) {
      console.error("Failed to fetch zones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Zone Management
            </h1>
            <p className="text-slate-500 font-medium mt-1 uppercase text-[11px] tracking-[0.2em]">
              Organize warehouses into logical storage zones
            </p>
          </div>
          <button 
            onClick={fetchZones}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            🔄 Sync Data
          </button>
        </div>

        {/* --- DASHBOARD GRID (HCI Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Creation Form (4/12 width) */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-2">
            <ZoneForm refresh={fetchZones} />
          </div>

          {/* Right Side: Data Table (8/12 width) */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px] overflow-hidden">
            {loading ? (
              /* HCI: Skeleton Feedback */
              <div className="p-12 space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : zones.length === 0 ? (
              /* Empty State Management */
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                <span className="text-6xl grayscale opacity-30">🗺️</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">No Zones Defined</h3>
                  <p className="text-sm text-slate-400 font-medium">Create your first warehouse zone to get started.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <ZoneTable zones={zones} refresh={fetchZones} />
              </div>
            )}
          </div>

        </div>

        {/* HCI Rule: Status Meta */}
        <div className="flex justify-center pt-6 opacity-30">
          
        </div>

      </div>
    </div>
  );
};

export default Zones;