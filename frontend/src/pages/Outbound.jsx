import { useEffect, useState } from "react";
import { getDispatch } from "../services/outbound.services.js";
import DispatchForm from "../components/DispatchForm.jsx";

// --- Internal StatusBadge Component for better HCI ---
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Dispatched: "bg-blue-50 text-blue-600 border-blue-100",
    Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const Outbound = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getDispatch();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Critical: Dispatch sync failed.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-700 tracking-tight ">
              Dispatch Terminal
            </h1>
            <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.3em]">
              Outbound Fulfillment & Logistics Flow
            </p>
          </div>
          <button 
            onClick={fetchOrders}
            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
          >
            🔄 Refresh Queue
          </button>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-2 overflow-hidden">
          <DispatchForm refresh={fetchOrders} />
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 min-h-[500px] overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Order Fulfillment Log
            </h2>
            <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">
              Active Shipments: {orders.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client & Asset</th>
                  <th className="px-10 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                  <th className="px-10 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                  <th className="px-10 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit Ref</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {!loading && orders.map((o) => (
                  <tr key={o._id} className="group hover:bg-indigo-50/10 transition-colors duration-200">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-100 group-hover:rotate-3 transition-transform">
                          {o.customerName?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900 tracking-tight uppercase">
                            {o.customerName}
                          </div>
                          <div className={`text-[10px] font-bold uppercase tracking-tighter ${o.productId ? 'text-slate-400' : 'text-rose-400 italic'}`}>
                             {o.productId?.name || "⚠ Archived Item"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7 text-center">
                      <span className="text-sm font-black text-slate-900 bg-slate-100 px-5 py-2 rounded-2xl border border-slate-200 shadow-inner">
                        {o.quantity}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-center">
                       <StatusBadge status={o.status || "Pending"} />
                    </td>
                    <td className="px-10 py-7 text-right">
                      <div className="flex flex-col items-end">
                         <span className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-tighter">
                           #{o.referenceId || o._id.slice(-6)}
                         </span>
                         <span className="text-[9px] text-emerald-500 font-black tracking-widest uppercase mt-1">
                           Verified
                         </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="flex flex-col items-center justify-center pt-12 pb-10 space-y-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-500 bg-white px-8 py-2.5 rounded-full border border-slate-200 shadow-sm">
             SmartWDS Security Verified • Dispatch Node
          </p>
         
        </div>

      </div>
    </div>
  );
};

export default Outbound;