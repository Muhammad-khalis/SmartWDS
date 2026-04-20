import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.service.js";

import InventoryValueChart from "../components/charts/InventoryValueChart.jsx";
import MovementChart from "../components/charts/MovementChart.jsx";
import TopProductsChart from "../components/charts/TopProductsChart.jsx";
import InboundOutboundChart from "../components/charts/InboundOutboundChart.jsx";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getDashboardData();
      setData(res);
    } catch (err) {
      console.error("Dashboard Sync Failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center opacity-60 py-40">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Syncing Terminal Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* --- DYNAMIC HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight  uppercase">
            Inventory Overview
          </h1>
         
        </div>
        <button 
           onClick={fetchData}
           className="bg-white border border-slate-200 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
           🔄 Refresh Node
        </button>
      </div>

      {/* --- KPI CARDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Value Card */}
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 relative group overflow-hidden transition-all hover:translate-y-[-4px]">
           <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-[3rem] -z-10 group-hover:bg-indigo-600 transition-colors"></div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Value</p>
           <h3 className="text-3xl font-black text-slate-900 tracking-tight">
             ${data.totalValue?.toLocaleString() || 0}
           </h3>
           <div className="h-1 w-12 bg-indigo-500 mt-4 rounded-full"></div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:translate-y-[-4px] transition-all">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Critical Alerts</p>
           <h3 className={`text-3xl font-black ${data.lowStockCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {data.lowStockCount || 0}
           </h3>
           <div className={`h-1 w-12 mt-4 rounded-full ${data.lowStockCount > 0 ? 'bg-rose-500' : 'bg-slate-200'}`}></div>
        </div>

        {/* Inbound Flow */}
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:translate-y-[-4px] transition-all">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Inbound</p>
           <h3 className="text-3xl font-black text-emerald-600 tracking-tight">
              {data.flow?.find(f => f.name === "Inbound")?.value || 0}
           </h3>
           <div className="h-1 w-12 bg-emerald-500 mt-4 rounded-full"></div>
        </div>

        {/* Outbound Flow */}
        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:translate-y-[-4px] transition-all">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Outbound</p>
           <h3 className="text-3xl font-black text-blue-600 tracking-tight">
              {data.flow?.find(f => f.name === "Outbound")?.value || 0}
           </h3>
           <div className="h-1 w-12 bg-blue-500 mt-4 rounded-full"></div>
        </div>
      </div>

      {/* --- CHARTS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/30 border border-slate-50">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-10 italic">Movement Dynamics</h3>
          <MovementChart data={data.monthlyMovement || []} />
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/30 border border-slate-50">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-10 italic">Category Logic</h3>
          <InventoryValueChart data={data.inventoryValueByCategory || []} />
        </div>
      </div>

      {/* --- TABLES & ALERTS --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* FIXED: Recent Transactions Table */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/30 border border-slate-50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h3 className="font-black text-indigo-600 uppercase text-[10px] tracking-[0.3em]">Protocol Audit Trail</h3>
            <span className="text-[9px] font-black text-slate-300 uppercase italic">Latest 10 Logs</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-10 py-5">Product Asset</th>
                  <th className="px-10 py-5 text-center">Type</th>
                  <th className="px-10 py-5 text-right">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(data.recentTransactions || []).map(t => (
                  <tr key={t._id} className="group hover:bg-slate-50/80 transition-all duration-200">
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className={`text-sm font-black tracking-tight uppercase ${!t.productId?.name ? 'text-rose-400 italic' : 'text-slate-800'}`}>
                          {t.productId?.name || "⚠ De-linked Asset"}
                        </span>
                        {!t.productId?.name && <span className="text-[9px] text-rose-300 font-bold uppercase tracking-tighter">Archived or Removed</span>}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-sm border ${
                        t.type === "IN" ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex flex-col items-end">
                         <span className="font-mono text-[11px] font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           #{t.referenceId || "N/A"}
                         </span>
                         <span className="text-[9px] text-indigo-400 font-bold tracking-widest uppercase mt-1">Audit-Node</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/30 border border-slate-50 p-10">
          <div className="flex items-center justify-between mb-10">
             <h3 className="font-black text-rose-600 uppercase text-[10px] tracking-[0.3em]">Critical Depletion Alerts</h3>
             <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
          </div>
          <div className="space-y-4">
            {(data.lowStockProducts || []).map(p => (
              <div key={p._id} className="flex justify-between items-center bg-rose-50/30 border border-rose-100 rounded-[2rem] p-6 group hover:bg-rose-50 transition-all shadow-sm">
                <div>
                  <p className="font-black text-slate-800 text-sm tracking-tight uppercase">{p.name}</p>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest italic opacity-70">SKU: {p.sku}</p>
                </div>
                <div className="text-right">
                  <span className="text-rose-600 font-black text-2xl block leading-none">{p.quantity}</span>
                  <span className="text-[9px] text-rose-400 font-bold uppercase tracking-widest">Units Left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;