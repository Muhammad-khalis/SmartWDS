import { useState, useEffect } from "react";
import { createDispatch } from "../services/outbound.services.js";
import { showSuccess, showError } from "../utils/toast.js";
import api from "../api/axios.js";

const DispatchForm = ({ refresh }) => {

const [products, setProducts] = useState([]);
const [bins, setBins] = useState([]);

const [form, setForm] = useState({
productId: "",
quantity: "",
binId: "",
customerName: "",
referenceId: "",
});

const handleChange = (e) => {


setForm({
  ...form,
  [e.target.name]: e.target.value,
});


};

const fetchProducts = async () => {


try {

  const res = await api.get("/products");

  setProducts(res.data.data || []);

} catch {

  console.error("Failed to load products");

}


};

const fetchBins = async () => {


try {

  const res = await api.get("/bins");

  setBins(res.data.data || []);

} catch {

  console.error("Failed to load bins");

}

};

useEffect(() => {

fetchProducts();
fetchBins();


}, []);

const handleSubmit = async (e) => {

e.preventDefault();

if (!form.productId || !form.binId || !form.quantity) {

  showError("Please fill all required fields");

  return;

}

try {

  await createDispatch(form);

  showSuccess("Dispatch created");

  setForm({
    productId: "",
    quantity: "",
    binId: "",
    customerName: "",
    referenceId: "",
  });

  if (refresh) refresh();

} catch (error) {

  showError(
    error?.response?.data?.message || "Dispatch failed"
  );

}


};

return (


<form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded shadow space-y-4"
>

  <h2 className="text-xl font-semibold">
    Sales Order Dispatch
  </h2>

  <select
    name="productId"
    value={form.productId}
    onChange={handleChange}
    className="border p-2 w-full"
  >

    <option value="">Select Product</option>

    {products.map((p) => (

      <option key={p._id} value={p._id}>
        {p.name} ({p.sku})
      </option>

    ))}

  </select>

  <select
    name="binId"
    value={form.binId}
    onChange={handleChange}
    className="border p-2 w-full"
  >

    <option value="">Select Bin</option>

    {bins.map((b) => (

      <option key={b._id} value={b._id}>
        {b.name}
      </option>

    ))}

  </select>

  <input
    name="quantity"
    type="number"
    value={form.quantity}
    onChange={handleChange}
    className="border p-2 w-full"
    placeholder="Quantity"
  />

  <input
    name="customerName"
    value={form.customerName}
    onChange={handleChange}
    className="border p-2 w-full"
    placeholder="Customer Name"
  />

  <input
    name="referenceId"
    value={form.referenceId}
    onChange={handleChange}
    className="border p-2 w-full"
    placeholder="Reference ID"
  />

  <button
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Dispatch Order
  </button>

</form>


);

};

export default DispatchForm;
