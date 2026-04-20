import { useState } from "react";
import { createProduct } from "../services/product.service";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // HCI: System status feedback
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    reorderLevel: 0,
    price: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setError(""); // Typing shuru karte hi error gayab (HCI Error Prevention)
    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enterprise Check: Empty validation
    if (!form.name || !form.sku) {
      setError("Product Name and SKU are required.");
      return;
    }

    try {
      setLoading(true);
      await createProduct(form);
      alert("✅ Product created successfully");
      navigate("/products"); 
    } catch (err) {
      // Backend error handling (e.g., Duplicate SKU)
      console.error(err);
      if (err.response?.status === 400 || err.message.includes("unique")) {
        setError("❌ SKU already exists. Please provide a unique SKU code.");
      } else {
        setError("❌ Failed to create product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">New Inventory Entry</h2>
          <p className="text-gray-500 font-medium">Add a new SKU to the central warehouse system.</p>
        </div>

        {/* HCI Alert: Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Product Identity</label>
            <input
              name="name"
              placeholder="e.g. Dell Latitude 5420"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* SKU Code */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Unique SKU</label>
            <input
              name="sku"
              placeholder="SKU-001"
              className={`w-full bg-gray-50 border rounded-2xl px-5 py-4 text-sm font-mono focus:ring-4 outline-none transition-all ${error.includes("SKU") ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500'}`}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
            <input
              name="category"
              placeholder="Electronics"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Unit Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Initial Stock</label>
            <input
              type="number"
              name="quantity"
              placeholder="0"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Reorder Level - Critical Logic */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-red-400 uppercase tracking-widest ml-1 italic">Alert Threshold (Reorder Level)</label>
            <input
              type="number"
              name="reorderLevel"
              placeholder="10"
              className="w-full bg-red-50/30 border border-red-100 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className={`flex-[2] py-4 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95 ${loading ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
            >
              {loading ? "Processing..." : "Register Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductForm;