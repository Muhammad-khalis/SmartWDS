import { useEffect, useState } from "react";
import { createGRN } from "../services/inbound.service";
import api from "../api/axios";
import { showSuccess, showError } from "../utils/toast";

/*
GRN FORM

Workflow
1️⃣ Select product
2️⃣ Enter quantity
3️⃣ Select bin
4️⃣ Enter supplier
5️⃣ Reference ID
*/

const GRNForm = ({ refresh }) => {

const [products, setProducts] = useState([]);
const [bins, setBins] = useState([]);

const [form, setForm] = useState({
productId: "",
quantity: "",
binId: "",
supplier: "",
referenceId: "",
});

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

if (!form.productId || !form.quantity || !form.binId) {
  showError("Please fill all required fields");
  return;
}

try {

  await createGRN(form);

  showSuccess("GRN Created Successfully");

  setForm({
    productId: "",
    quantity: "",
    binId: "",
    supplier: "",
    referenceId: "",
  });

  refresh();

} catch {

  showError("Failed to create GRN");

}


};

return (


<form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded shadow space-y-4"
>

  <h2 className="text-xl font-semibold">
    Receive Goods (GRN)
  </h2>

  <select
    className="border p-2 w-full"
    value={form.productId}
    onChange={(e) =>
      setForm({ ...form, productId: e.target.value })
    }
  >
    <option value="">Select Product</option>

    {products.map((p) => (
      <option key={p._id} value={p._id}>
        {p.name} ({p.sku})
      </option>
    ))}
  </select>

  <input
    className="border p-2 w-full"
    type="number"
    placeholder="Quantity"
    value={form.quantity}
    onChange={(e) =>
      setForm({ ...form, quantity: e.target.value })
    }
  />

  <select
    className="border p-2 w-full"
    value={form.binId}
    onChange={(e) =>
      setForm({ ...form, binId: e.target.value })
    }
  >
    <option value="">Select Bin</option>

    {bins.map((b) => (
      <option key={b._id} value={b._id}>
        {b.name}
      </option>
    ))}
  </select>

  <input
    className="border p-2 w-full"
    placeholder="Supplier"
    value={form.supplier}
    onChange={(e) =>
      setForm({ ...form, supplier: e.target.value })
    }
  />

  <input
    className="border p-2 w-full"
    placeholder="Reference ID"
    value={form.referenceId}
    onChange={(e) =>
      setForm({ ...form, referenceId: e.target.value })
    }
  />

  <button
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Create GRN
  </button>

</form>


);

};

export default GRNForm;
