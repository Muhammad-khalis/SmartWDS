import { useState, useEffect } from "react";
import api from "../api/axios";
import GRNForm from "../components/GRNForm";
import { PackageSearch, History, Calendar, User, Tag } from "lucide-react";

const Inbound = () => {
  const [inboundHistory, setInboundHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Function jo history ko fetch karega
  const fetchInboundHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/inbound");
      // Backend response check
      const data = res.data.data || res.data;
      setInboundHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch inbound history");
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchInboundHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      {/* 1. GRN Form Section (Jo aapne photo dikhayi) */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-8">
        <GRNForm refresh={fetchInboundHistory} />
      </div>

      {/* 2. Recent Transactions Table Section (Jo gayab tha) */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <History size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Recent Inbound Protocol</h2>
          </div>
          <button 
            onClick={fetchInboundHistory}
            className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all"
          >
            Refresh Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Volume</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Bin</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Supplier</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                    Syncing Data Nodes...
                  </td>
                </tr>
              ) : inboundHistory.length > 0 ? (
                inboundHistory.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-black text-[10px]">
                          {item.productId?.name?.charAt(0) || "P"}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{item.productId?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-black text-indigo-600">+{item.quantity} units</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase">
                        {item.binId?.name || "Node-X"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{item.supplier}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-300 font-bold text-xs uppercase tracking-widest">
                    No Inbound Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inbound;