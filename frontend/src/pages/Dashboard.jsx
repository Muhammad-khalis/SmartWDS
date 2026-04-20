import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import { getDashboardData } from "../services/dashboard.service.js";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDashboardData();

        // 🔥 DATA CLEANING LOGIC:
        // Sirf wo transactions filter karein jin ka productId null nahi hai
        const cleanTransactions = (res.recentTransactions || []).filter(
          (t) => t.productId !== null && t.productId !== undefined
        );

        // State mein cleaned data save karein
        setData({
          ...res,
          recentTransactions: cleanTransactions
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="p-10 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Warehouse Data...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Inventory Intelligence</h1>
            <p className="text-slate-500 font-medium">Real-time logistics monitoring and warehouse health.</p>
          </div>
          <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 uppercase tracking-widest">
            System Status: Verified Live
          </div>
        </div>

        {/* --- STATS SUMMARY --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-100/50 transition-transform hover:scale-[1.02]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Critical Alerts</p>
            <h3 className="text-4xl font-black text-rose-600 mt-1">{data.lowStockProducts?.length || 0}</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium italic underline decoration-rose-200">Below reorder level</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-100/50 transition-transform hover:scale-[1.02]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Movements</p>
            <h3 className="text-4xl font-black text-slate-900 mt-1">{data.recentTransactions?.length || 0}</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium italic underline decoration-indigo-200">Filtered ledger entries</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-100/50 transition-transform hover:scale-[1.02]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Locations</p>
            <h3 className="text-4xl font-black text-emerald-400 mt-1 ">Operational</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium italic underline decoration-emerald-200">All nodes online</p>
          </div>
        </div>

        {/* --- QUICK ACTIONS --- */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-800">
          <h2 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6 opacity-40">Control Panel / Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/products/new" className="flex flex-col items-center justify-center gap-3 bg-slate-800/50 p-6 rounded-2xl text-white font-bold hover:bg-indigo-600 transition-all active:scale-95 border border-slate-700/50">
              <span className="text-2xl">📦</span> <span className="text-xs uppercase tracking-widest">Add Product</span>
            </a>
            <a href="/inbound" className="flex flex-col items-center justify-center gap-3 bg-slate-800/50 p-6 rounded-2xl text-white font-bold hover:bg-emerald-600 transition-all active:scale-95 border border-slate-700/50">
              <span className="text-2xl">📥</span> <span className="text-xs uppercase tracking-widest">Inbound</span>
            </a>
            <a href="/outbound" className="flex flex-col items-center justify-center gap-3 bg-slate-800/50 p-6 rounded-2xl text-white font-bold hover:bg-rose-600 transition-all active:scale-95 border border-slate-700/50">
              <span className="text-2xl">📤</span> <span className="text-xs uppercase tracking-widest">Outbound</span>
            </a>
            <a href="/warehouses" className="flex flex-col items-center justify-center gap-3 bg-slate-800/50 p-6 rounded-2xl text-white font-bold hover:bg-slate-700 transition-all active:scale-95 border border-slate-700/50">
              <span className="text-2xl">🏢</span> <span className="text-xs uppercase tracking-widest">Infrastructure</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* --- LOW STOCK TABLE --- */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Critical Low Stock</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Stock Replenishment Required</p>
              </div>
              <span className="text-[9px] font-black bg-rose-100 text-rose-600 px-3 py-1 rounded-full uppercase tracking-widest">Action Required</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-4 tracking-widest">Product Details</th>
                    <th className="px-8 py-4 tracking-widest">SKU</th>
                    <th className="px-8 py-4 text-right tracking-widest">Current Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.lowStockProducts?.length === 0 ? (
                    <tr><td colSpan="3" className="p-16 text-center text-slate-300 italic font-medium">Registry is healthy. No alerts.</td></tr>
                  ) : (
                    data.lowStockProducts?.map((p) => (
                      <tr key={p._id} className="group hover:bg-rose-50/30 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-800 text-sm">{p.name}</td>
                        <td className="px-8 py-5 text-xs font-mono text-slate-400 uppercase tracking-tighter">{p.sku}</td>
                        <td className="px-8 py-5 text-right"><span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100">{p.quantity}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- RECENT TRANSACTIONS (Clean View) --- */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Operational Ledger</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Verified Logistics Flow</p>
              </div>
              <span className="text-[9px] font-black bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">Verified Data</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-4 tracking-widest">Entity</th>
                    <th className="px-8 py-4 text-center tracking-widest">Type</th>
                    <th className="px-8 py-4 text-right tracking-widest">Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.recentTransactions?.length === 0 ? (
                    <tr><td colSpan="3" className="p-16 text-center text-slate-300 italic font-medium">No verified movements in this cycle.</td></tr>
                  ) : (
                    data.recentTransactions?.map((t) => (
                      <tr key={t._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px] border border-indigo-100 shadow-sm">
                              {t.productId?.name?.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-slate-800">{t.productId?.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.15em] border ${
                            t.type === "IN" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-rose-50 text-rose-700 border-rose-100"
                          }`}>
                            {t.type}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right font-mono text-[10px] text-slate-400 tracking-tighter uppercase">{t.referenceId}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- FOOTER INFO --- */}
        <div className="flex flex-col items-center justify-center pt-12 pb-6 space-y-3">
            <div className="h-px w-24 bg-slate-200"></div>
            
            
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;