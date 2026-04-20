import { useEffect, useState } from "react";
import { getAisles } from "../services/aisle.service";
import AisleForm from "../components/aisles/AisleForm.jsx";
import AisleList from "../components/aisles/AisleList.jsx";

/*
  AISLE MANAGEMENT MODULE
  -----------------------
  • Follows HCI Spacing Rules (8px Grid)
  • Responsive Dashboard Layout
  • System Status Indicators (Loading/Empty)
*/

const Aisles = () => {
  const [aisles, setAisles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAisles = async () => {
    try {
      setLoading(true); // HCI: Start feedback
      const res = await getAisles();
      setAisles(res.data || []);
    } catch (err) {
      console.error("Critical: Failed to sync Aisle data.", err);
    } finally {
      setLoading(false); // HCI: Stop feedback
    }
  };

  useEffect(() => {
    fetchAisles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Page Header --- */}
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Aisle Infrastructure
            </h1>
            <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.3em]">
              Precision Storage Routing & Lane Mapping
            </p>
          </div>
          <button 
            onClick={fetchAisles}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
          >
            🔄 Sync Aisles
          </button>
        </div>

        {/* --- Grid Layout (HCI: Grouping actions and lists) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side (4/12) */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-2 overflow-hidden">
            <AisleForm refresh={fetchAisles} />
          </div>

          {/* List Side (8/12) */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px] overflow-hidden">
            {loading ? (
              /* HCI: Skeleton Loader */
              <div className="p-12 space-y-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl shadow-inner"></div>
                ))}
              </div>
            ) : aisles.length === 0 ? (
              /* HCI: Descriptive Empty State */
              <div className="flex flex-col items-center justify-center py-32 text-center opacity-50">
                <span className="text-6xl mb-6 grayscale">🏗️</span>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">No Lanes Mapped</h3>
                <p className="text-sm text-slate-400 font-medium italic underline decoration-indigo-200">System waiting for Aisle definition.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <AisleList aisles={aisles} refresh={fetchAisles} />
              </div>
            )}
          </div>

        </div>

        {/* System Meta */}
        <div className="pt-6 flex justify-center opacity-25">
          
        </div>

      </div>
    </div>
  );
};

export default Aisles;