import { useState } from "react";
import { createProduct } from "../services/product.service";

const ProductForm = () => {

  const [form,setForm] = useState({
    name:"",
    sku:"",
    category:"",
    quantity:0,
    reorderLevel:0,
    price:0
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProduct(form);
      alert("Product created successfully");

    } catch (error) {

      console.error(error);
      alert("Error creating product");

    }

  };

  return (

    <div className="p-6 flex justify-center">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            placeholder="Product name"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="SKU code"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            onChange={(e)=>setForm({...form,sku:e.target.value})}
          />

          <input
            placeholder="Product category"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            onChange={(e)=>setForm({...form,category:e.target.value})}
          />

          <input
            type="number"
            placeholder="Stock quantity"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            onChange={(e)=>setForm({...form,quantity:Number(e.target.value)})}
          />

          <input
            type="number"
            placeholder="Reorder level"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            onChange={(e)=>setForm({...form,reorderLevel:Number(e.target.value)})}
          />

          <input
            type="number"
            placeholder="Product price"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            onChange={(e)=>setForm({...form,price:Number(e.target.value)})}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            Save Product
          </button>

        </form>

      </div>

    </div>

  );

};

export default ProductForm;