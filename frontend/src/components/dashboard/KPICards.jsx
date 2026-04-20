import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboard.service";
import { Package, Warehouse, AlertTriangle, BadgeDollarSign, Loader2 } from "lucide-react";

const KPICards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        // Backend se data data.data mein aa raha hoga ya direct data mein
        setStats(data.data || data); 
      } catch (err) {
        console.error("Stats fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  // HCI: Jab tak data load ho raha ho, loader dikhayein taake user ko blank screen na dikhay
  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 1. Total Products Card */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-indigo-200 transition-all">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Registry</p>
          <Package className="text-indigo-500" size={18} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
          {stats?.totalProducts || 0}
        </h2>
        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Active SKU Units</p>
      </div>

      {/* 2. Warehouses Card */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-indigo-200 transition-all">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Storage Nodes</p>
          <Warehouse className="text-indigo-500" size={18} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
          {stats?.totalWarehouses || 0}
        </h2>
        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Operational Centers</p>
      </div>

      {/* 3. Low Stock Card */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-rose-200 transition-all">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest leading-none">Critical Stock</p>
          <AlertTriangle className="text-rose-500" size={18} />
        </div>
        <h2 className="text-3xl font-black text-rose-600 tracking-tighter">
          {stats?.lowStockCount || 0}
        </h2>
        <p className="text-[9px] text-rose-400 font-bold uppercase mt-1">Requires Reorder</p>
      </div>

      {/* 4. Inventory Value Card */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-emerald-200 transition-all">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">Net Valuation</p>
          <BadgeDollarSign className="text-emerald-500" size={18} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">
          ${stats?.totalValue?.toLocaleString() || "0"}
        </h2>
        <p className="text-[9px] text-emerald-400 font-bold uppercase mt-1">Total Asset Worth</p>
      </div>

    </div>
  );
};

export default KPICards;