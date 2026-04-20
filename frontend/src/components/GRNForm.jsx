import { useState, useEffect } from "react";
import { createGRN } from "../services/inbound.service";
import api from "../api/axios"; // Hamara main API instance
import { PackagePlus, Loader2, AlertCircle, Box, Truck, Fingerprint, Hash } from "lucide-react";
import { showSuccess, showError } from "../utils/toast";

const GRNForm = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [bins, setBins] = useState([]); // Bin selection wapis add ki
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    binId: "",      // Backend integrity ke liye zaroori hai
    supplier: "",
    referenceId: "" // Reference ID wapis add ki
  });

  // 1. Fetch Products for dropdown
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      // Defensive Check: Backend data format handle karne ke liye
      const data = res.data.data || res.data.products || (Array.isArray(res.data) ? res.data : []);
      setProducts(data);
    } catch (err) { 
      console.error("Product fetch failed"); 
      setProducts([]); 
    }
  };

  // 2. Fetch Bins for dropdown (Is ke bina 500 error aa sakta hai)
  const fetchBins = async () => {
    try {
      const res = await api.get("/bins");
      const data = res.data.data || res.data.bins || (Array.isArray(res.data) ? res.data : []);
      setBins(data);
    } catch (err) { 
      console.error("Bin fetch failed"); 
      setBins([]); 
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    // ⭐ Validation: Saari cheezain check karein
    if (!formData.productId) return setError("Please select a Product.");
    if (!formData.quantity || formData.quantity <= 0) return setError("Enter a valid Quantity.");
    if (!formData.binId) return setError("Target Bin is required for stock placement.");
    if (!formData.supplier) return setError("Supplier name is required.");

    try {
      setLoading(true);
      await createGRN(formData);
      showSuccess("Inbound Transaction Authorized");
      
      // Reset Form
      setFormData({ productId: "", quantity: "", binId: "", supplier: "", referenceId: "" }); 
      if (refresh) refresh(); 
    } catch (err) {
      const msg = err.response?.data?.message || "Internal Server Error (500)";
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
          <PackagePlus size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Generate New GRN</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inbound Stock Protocol</p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Product Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Box size={12}/> Product Unit
            </label>
            <select 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
              value={formData.productId}
              onChange={(e) => setFormData({...formData, productId: e.target.value})}
            >
              <option value="">-- SELECT IDENTITY --</option>
              {Array.isArray(products) && products.map(p => (
                <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Hash size={12}/> Volume (Qty)
            </label>
            <input 
              type="number"
              placeholder="0.00"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />
          </div>

          {/* Bin Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Fingerprint size={12}/> Target Node (Bin)
            </label>
            <select 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
              value={formData.binId}
              onChange={(e) => setFormData({...formData, binId: e.target.value})}
            >
              <option value="">-- SELECT LOCATION --</option>
              {Array.isArray(bins) && bins.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Supplier */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Truck size={12}/> Source Node (Supplier)
            </label>
            <input 
              type="text"
              placeholder="e.g. Al-Fatah Logistics"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            />
          </div>

          {/* Reference ID */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Fingerprint size={12}/> Reference ID / PO
            </label>
            <input 
              type="text"
              placeholder="Internal Order Number"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              value={formData.referenceId}
              onChange={(e) => setFormData({...formData, referenceId: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-400"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Authorize Stock Entry"}
        </button>
      </form>
    </div>
  );
};

export default GRNForm;