import { Link } from "react-router-dom";

const ProductTable = ({ products, onDelete }) => {
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    onDelete(id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Product Inventory
          </h2>
          <p className="text-sm text-gray-500">
            Track and manage warehouse products
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          {products.length} Products
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Product Details
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                SKU
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Stock Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((p) => {
              const lowStock = p.quantity < 10;

              return (
                <tr
                  key={p._id}
                  className="group hover:bg-blue-50/30 transition-all duration-200"
                >
                  {/* Product Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold text-gray-900 leading-tight">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-gray-400 mt-0.5">
                          ID: {p._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* SKU Column */}
                  <td className="px-6 py-4 whitespace-nowrap align-middle">
                    <code className="px-2 py-1 text-xs font-mono font-medium rounded bg-gray-100 text-gray-600 border border-gray-200">
                      {p.sku}
                    </code>
                  </td>

                  {/* Category Column */}
                  <td className="px-6 py-4 whitespace-nowrap align-middle">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20 uppercase tracking-tight">
                      {p.category}
                    </span>
                  </td>

                  {/* Stock Column */}
                  <td className="px-6 py-4 whitespace-nowrap align-middle">
                    {lowStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-red-50 text-red-700 border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                        {p.quantity} Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        {p.quantity} In Stock
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap align-middle text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to={`/products/edit/${p._id}`}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-900 transition-colors py-1 px-2 hover:bg-indigo-50 rounded-md"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors py-1 px-2 hover:bg-red-50 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
          <div className="bg-gray-50 p-4 rounded-full mb-3 text-2xl">📦</div>
          <p className="font-medium text-sm">No products found in your inventory</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;