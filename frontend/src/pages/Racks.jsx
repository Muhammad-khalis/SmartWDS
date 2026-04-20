import { useEffect, useState } from "react";
import { getRacks } from "../services/rack.service";
import RackForm from "../components/racks/RackForm.jsx";
import RackList from "../components/racks/RackList.jsx";

/*
  RACK ARCHITECTURE MANAGEMENT
  ----------------------------
  • Clean UI: High contrast for readability.
  • Responsive: 12-column grid system.
  • HCI Status: Skeleton loading and refined footer visibility.
*/

const Racks = () => {
  const [racks, setRacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRacks = async () => {
    try {
      setLoading(true);
      const res = await getRacks();
      setRacks(res.data || []);
    } catch (err) {
      console.error("Critical: Rack sync failed.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRacks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Page Header --- */}
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Rack Management
            </h1>
            <p className="text-slate-500 font-medium mt-1 uppercase text-[11px] tracking-widest">
              Vertical Storage Systems & Capacity Control
            </p>
          </div>
          <button 
            onClick={fetchRacks}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
          >
            🔄 Sync Racks
          </button>
        </div>

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side (Action Area) */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-2">
            <RackForm refresh={fetchRacks} />
          </div>

          {/* List Side (Data Display) */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px] overflow-hidden">
            {loading ? (
              /* HCI: Professional Skeleton Loader */
              <div className="p-12 space-y-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : racks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                <span className="text-6xl mb-6 grayscale">🪜</span>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">No Racks Configured</h3>
                <p className="text-sm text-slate-400 font-medium">Define rack locations to begin storage operations.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <RackList racks={racks} refresh={fetchRacks} />
              </div>
            )}
          </div>
        </div>

        {/* --- High Visibility Footer (Fixed Visibility) --- */}
        <div className="flex flex-col items-center justify-center pt-12 space-y-2">
          <div className="h-px w-20 bg-slate-200 mb-2"></div>
          
          
        </div>

      </div>
    </div>
  );
};

export default Racks;