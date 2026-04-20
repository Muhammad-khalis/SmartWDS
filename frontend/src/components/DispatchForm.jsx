import { useState, useEffect } from "react";
import { createDispatch } from "../services/outbound.services.js";
import { showSuccess, showError } from "../utils/toast.js";
import api from "../api/axios.js";
import { Truck, Box, User, Hash, Fingerprint, AlertCircle, Loader2 } from "lucide-react";

const DispatchForm = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [bins, setBins] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProductStock, setSelectedProductStock] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    binId: "",
    customerName: "",
    referenceId: "",
  });

  const fetchNodeData = async () => {
    try {
      const [pRes, bRes] = await Promise.all([
        api.get("/products"),
        api.get("/bins")
      ]);
      setProducts(pRes.data.data || []);
      setBins(bRes.data.data || []);
    } catch { console.error("Node Link Failure"); }
  };

  useEffect(() => { fetchNodeData(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // ⭐ HCI Logic: Update Stock Preview on product change
    if (name === "productId") {
      const prod = products.find(p => p._id === value);
      setSelectedProductStock(prod ? prod.quantity : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 CRITICAL VALIDATION (Stock Guard)
    if (selectedProductStock !== null && form.quantity > selectedProductStock) {
      showError(`INSUFFICIENT STOCK: Only ${selectedProductStock} units available.`);
      return;
    }

    if (!form.productId || !form.binId || !form.quantity || !form.customerName) {
      showError("PROTOCOL ERROR: Fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createDispatch(form);
      showSuccess("DISPATCH AUTHORIZED & LOGGED");
      setForm({ productId: "", quantity: "", binId: "", customerName: "", referenceId: "" });
      setSelectedProductStock(null);
      if (refresh) refresh();
    } catch (error) {
      showError(error?.response?.data?.message || "DISPATCH PROTOCOL FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 lg:p-12">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600">
            <Truck size={18} className="animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Outbound Node Protocol</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Dispatch Order</h2>
        </div>
        
        {/* ⭐ Stock Indicator */}
        {selectedProductStock !== null && (
          <div className={`p-4 rounded-2xl border ${selectedProductStock < 10 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available_Inventory</p>
             <p className={`text-xl font-black italic ${selectedProductStock < 10 ? 'text-rose-600' : 'text-emerald-600'}`}>
               {selectedProductStock} UNITS
             </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* PRODUCT IDENTITY */}
          <div className="relative group">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-black text-rose-600 uppercase tracking-widest z-10 flex items-center gap-1">
              <Box size={10}/> Subject_Identity
            </label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="w-full h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[11px] font-bold font-mono tracking-tight appearance-none focus:border-rose-500 focus:bg-white outline-none transition-all"
            >
              <option value="">SCAN OR SELECT UNIT...</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.sku} | {p.name}</option>
              ))}
            </select>
          </div>

          {/* BIN SELECTION */}
          <div className="relative group">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-black text-rose-600 uppercase tracking-widest z-10 flex items-center gap-1">
              <Hash size={10}/> Source_Bin_Node
            </label>
            <select
              name="binId"
              value={form.binId}
              onChange={handleChange}
              className="w-full h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[11px] font-bold font-mono appearance-none focus:border-rose-500 outline-none transition-all"
            >
              <option value="">SELECT SOURCE NODE...</option>
              {bins.map((b) => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* DISPATCH VOLUME */}
          <div className="relative group">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-black text-rose-600 uppercase tracking-widest z-10 flex items-center gap-1">
              <AlertCircle size={10}/> Dispatch_Volume
            </label>
            <input
              name="quantity"
              type="number"
              placeholder="0.00"
              className="w-full h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[12px] font-black font-mono focus:border-rose-500 outline-none transition-all"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          {/* CUSTOMER NAME */}
          <div className="relative group lg:col-span-2">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-black text-slate-400 uppercase tracking-widest z-10 flex items-center gap-1">
              <User size={10}/> Consignee_Identity (Client)
            </label>
            <input
              name="customerName"
              placeholder="CLIENT_LEGAL_NAME"
              className="w-full h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[11px] font-bold tracking-widest focus:border-slate-900 outline-none transition-all"
              value={form.customerName}
              onChange={handleChange}
            />
          </div>

          {/* REFERENCE ID */}
          <div className="relative group lg:col-span-1">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-black text-slate-400 uppercase tracking-widest z-10 flex items-center gap-1">
              <Fingerprint size={10}/> Order_Ref_PO
            </label>
            <input
              name="referenceId"
              placeholder="SERIAL_NUM_REF"
              className="w-full h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[11px] font-bold tracking-widest focus:border-slate-900 outline-none transition-all"
              value={form.referenceId}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={isSubmitting || (selectedProductStock !== null && form.quantity > selectedProductStock)}
          className="w-full h-20 bg-slate-900 hover:bg-rose-600 text-white rounded-[2rem] flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-2xl disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <span className="text-xs font-black uppercase tracking-[0.5em]">Authorize Dispatch Protocol</span>
              <Truck size={20} className="text-rose-400" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DispatchForm;