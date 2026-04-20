import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Package, ClipboardList,
  Warehouse, Layers, Grid3X3, Archive, Box,
  ArrowDownCircle, ArrowUpCircle, LogOut, ChevronRight,
  Users, Settings, ShieldCheck, Database, Loader2
} from "lucide-react";
import { showSuccess } from "../../utils/toast.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);

  // ⭐ Professional Session Termination Logic
  const handleLogout = () => {
    setIsCleaning(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showSuccess("WDS Security Session Terminated Safely.");
      navigate("/login", { replace: true });
    }, 1200); // 1.2s Artificial delay for visual feedback
  };

  const linkBase = "group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 mb-1.5";
  const activeClass = "bg-indigo-600 text-white shadow-xl shadow-indigo-100 translate-x-2";
  const normalClass = "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600";

  return (
    <>
      <aside className="h-screen w-72 bg-white flex flex-col border-r border-slate-100 shadow-[20px_0_40px_rgba(0,0,0,0.02)] z-50">
        
        {/* --- BRANDING SECTION --- */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-indigo-200 transition-all duration-500 group-hover:rotate-[360deg]">
               <Database className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 italic leading-none">SmartWDS</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mt-1 opacity-80 italic">Nexus v3.0</p>
            </div>
          </div>
        </div>

        {/* --- NAVIGATION MENU --- */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar pb-10">
          
          {/* CONTROL HUB */}
          <section>
            <p className="text-[9px] font-black uppercase text-slate-300 mb-4 px-4 tracking-[0.4em] flex items-center gap-2">
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Control Hub
            </p>
            <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3"><LayoutDashboard size={18} /> <span>Dashboard</span></div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </NavLink>
            <NavLink to="/charts" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3"><BarChart3 size={18} /> <span>Analaytics</span></div>
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3"><Users size={18} /> <span>Manage Access</span></div>
            </NavLink>
          </section>

          {/* INVENTORY & AUDIT */}
          <section>
            <p className="text-[9px] font-black uppercase text-slate-300 mb-4 px-4 tracking-[0.4em] flex items-center gap-2">
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Assets & Audit
            </p>
            <NavLink to="/products" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3"><Package size={18} /> <span>Products</span></div>
            </NavLink>
            <NavLink to="/ledger" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3"><ClipboardList size={18} /> <span>Security Ledger</span></div>
            </NavLink>
          </section>

          {/* LOGISTICS NODES */}
          <section>
            <p className="text-[9px] font-black uppercase text-slate-300 mb-4 px-4 tracking-[0.4em] flex items-center gap-2">
               <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Infrastructure
            </p>
            <div className="grid gap-1">
              {[
                { to: "/warehouses", icon: <Warehouse size={18}/>, label: "Warehouse Map" },
                { to: "/bins", icon: <Box size={18}/>, label: "Bin Allocation" },
              ].map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
                  <div className="flex items-center gap-3">{item.icon} <span>{item.label}</span></div>
                </NavLink>
              ))}
            </div>
          </section>

          {/* FLOW CONTROLS */}
          <section>
            <p className="text-[9px] font-black uppercase text-slate-300 mb-4 px-4 tracking-[0.4em] flex items-center gap-2">
               <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Logistics Flow
            </p>
            <NavLink to="/inbound" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3 text-emerald-600"><ArrowDownCircle size={18} /> <span>Inbound Protocol</span></div>
            </NavLink>
            <NavLink to="/outbound" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : normalClass}`}>
              <div className="flex items-center gap-3 text-rose-500"><ArrowUpCircle size={18} /> <span>Outbound Protocol</span></div>
            </NavLink>
          </section>
        </nav>

        {/* --- SYSTEM FOOTER --- */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 mx-4 mb-6 rounded-[2.5rem] shadow-inner">
          <div className="flex items-center justify-between gap-3">
             <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md border border-indigo-400 italic">
                  KH
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tight italic">M. Khalis</p>
                  <div className="flex items-center gap-1 leading-none">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                     <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">Security Active</p>
                  </div>
                </div>
             </div>
             <button 
               onClick={() => setIsLogoutModalOpen(true)}
               className="w-10 h-10 flex items-center justify-center bg-white text-slate-400 hover:text-rose-600 hover:shadow-lg hover:shadow-rose-100 rounded-xl transition-all active:scale-90 border border-slate-200"
               title="Secure Logout"
             >
               <LogOut size={18} />
             </button>
          </div>
        </div>
      </aside>

      {/* --- LOGOUT MODAL --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => !isCleaning && setIsLogoutModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 rotate-3">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 italic uppercase">Terminate Session?</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Vault access will be restricted. All active protocol links will be severed.
              </p>
            </div>
            <div className="flex p-6 gap-3 bg-slate-50/50 border-t border-slate-100">
              <button 
                disabled={isCleaning}
                onClick={() => setIsLogoutModalOpen(false)} 
                className="flex-1 px-6 py-4 rounded-2xl text-[10px] font-black text-slate-500 hover:bg-white hover:text-slate-900 transition-all uppercase tracking-widest border border-transparent disabled:opacity-30"
              >Cancel</button>
              <button 
                disabled={isCleaning}
                onClick={handleLogout} 
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black hover:bg-rose-600 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest active:scale-95 flex items-center justify-center gap-2"
              >
                {isCleaning ? <Loader2 size={14} className="animate-spin" /> : "Authorize"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;