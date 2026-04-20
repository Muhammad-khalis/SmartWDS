import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/product.service";
import ProductTable from "../components/ProductTable.jsx";
import Pagination from "../components/Pagination.jsx";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // HCI: Feedback state

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      setLoading(true); // Request shuru hote hi loading dikhayen
      const data = await getProducts(page);
      setProducts(data.data);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false); // Data milne par loading khatam
    }
  };

  const handleDelete = async (id) => {
    // HCI Rule: Aesthetic and minimalist design (Using confirm for safety)
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      // HCI Rule: Consistency (State change reflects immediately)
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Error: Could not delete product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- PAGE HEADER (Responsive Flex) --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Product Inventory
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Manage your stock, SKUs, and pricing in one place.
            </p>
          </div>

          <Link
            to="/products/new"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 text-sm"
          >
            <span className="text-xl leading-none">+</span> Add New Product
          </Link>
        </div>

        {/* --- MAIN TABLE SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
          {loading ? (
            /* HCI: Skeleton/Pulse feedback during loading */
            <div className="p-8 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl shadow-inner"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4">📦</div>
              <h3 className="text-lg font-bold text-slate-800">No Products Found</h3>
              <p className="text-slate-500 text-sm">Start by adding your first product to the inventory.</p>
            </div>
          ) : (
            /* Table Component */
            <ProductTable
              products={products}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* --- PAGINATION (Center Aligned) --- */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center pb-8">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;