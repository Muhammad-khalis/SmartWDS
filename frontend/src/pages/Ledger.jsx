import { useEffect, useState, useCallback } from "react";
import api from "../api/axios.js";
import { Search, Download, RotateCcw, FileText, Database } from "lucide-react";

const Ledger = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLedger = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await api.get("/ledger");
      setEntries(res.data.data || []);
    } catch (error) {
      console.error("Failed to load ledger:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchLedger(); }, [fetchLedger]);

  // ⭐ Search Logic
  const filteredEntries = entries.filter(e => 
    e.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.referenceId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ⭐ Professional CSV Export Logic
  const exportToCSV = () => {
    if (filteredEntries.length === 0) return alert("No data to export");
    const headers = ["Product,SKU,Type,Before,After,Change,Reference,Date\n"];
    const rows = filteredEntries.map(e => {
      const name = e.productId?.name || "Deleted Product";
      const sku = e.productId?.sku || "N/A";
      const diff = e.quantityAfter - e.quantityBefore;
      const date = new Date(e.createdAt).toLocaleDateString();
      return `${name},${sku},${e.type},${e.quantityBefore},${e.quantityAfter},${diff},${e.referenceId || 'SYSTEM'},${date}\n`;
    });
    const blob = new Blob([headers + rows.join("")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartWDS_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & ACTIONS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight  uppercase">Inventory Ledger</h1>
            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-[0.3em] mt-1">Audit Trail & Security Logs</p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <div className="relative flex-grow lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" placeholder="FILTER BY PRODUCT OR REF..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={exportToCSV} className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">
              <Download size={14} /> Export CSV
            </button>
            <button onClick={fetchLedger} disabled={isRefreshing} className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50">
              <RotateCcw size={14} className={isRefreshing ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Subject Instance</th>
                  <th className="px-8 py-5 text-center">Protocol</th>
                  <th className="px-8 py-5 text-center">Shift Status</th>
                  <th className="px-8 py-5 text-center">Net Delta</th>
                  <th className="px-8 py-5 text-right">Auth Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-none">
                      <td colSpan="5" className="p-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                    </tr>
                  ))
                ) : filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-32 text-center opacity-30">
                      <Database size={48} className="mx-auto mb-4" />
                      <p className="font-black uppercase tracking-[0.4em]">Zero Logs Detected</p>
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((e) => {
                    const diff = e.quantityAfter - e.quantityBefore;
                    const isIncrease = e.type === "IN";
                    return (
                      <tr key={e._id} className="group hover:bg-indigo-50/10 transition-all">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${isIncrease ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              <FileText size={18} />
                            </div>
                            <div>
                              <div className="text-sm font-black text-slate-800 uppercase italic tracking-tight">{e.productId?.name || "Deleted Product"}</div>
                              <div className="text-[10px] font-mono text-slate-400">SKU: {e.productId?.sku || "N/A"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest border ${isIncrease ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}>
                            {e.type}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center font-mono text-xs">
                          <span className="text-slate-400">{e.quantityBefore}</span> → <span className="text-slate-900 font-black">{e.quantityAfter}</span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`text-sm font-black italic ${isIncrease ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isIncrease ? `+${diff}` : diff}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-[10px] font-mono font-black py-1.5 px-3 bg-slate-50 text-slate-400 rounded-lg border border-slate-100 uppercase italic">
                            {e.referenceId || "SYSTEM"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] px-4">
         
        </div>
      </div>
    </div>
  );
};

export default Ledger;