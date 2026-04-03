import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/product.service";
import ProductTable from "../components/ProductTable.jsx";
import Pagination from "../components/Pagination.jsx";
import { Link } from "react-router-dom";

const Products = () => {

  const [products,setProducts] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);

  useEffect(() => {

    fetchProducts();

  },[page]);

  const fetchProducts = async () => {

    try {

      const data = await getProducts(page);

      setProducts(data.data);
      setTotalPages(data.pages);

    } catch (error) {

      console.error("Failed to fetch products", error);

    }

  };

  /*
  DELETE PRODUCT
  */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      // remove from UI
      setProducts((prev) => prev.filter((p) => p._id !== id));

    } catch (error) {

      console.error("Delete failed", error);

    }

  };

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Product Inventory
        </h2>

        <Link
          to="/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
        >
          Add Product
        </Link>

      </div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>

  );

};

export default Products;