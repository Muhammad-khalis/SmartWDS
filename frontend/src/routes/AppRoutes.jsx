import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
Pages
*/
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Chart from "../pages/Chart.jsx";
import Ledger from "../pages/Ledger.jsx";

import Products from "../pages/Products.jsx";
import ProductForm from "../pages/ProductForm.jsx";

import Warehouses from "../pages/Warehouses.jsx";
import Zones from "../pages/Zones.jsx";
import Aisles from "../pages/Aisles.jsx";
import Racks from "../pages/Racks.jsx";
import Bins from "../pages/Bins.jsx";

import Inbound from "../pages/Inbound.jsx";
import Outbound from "../pages/Outbound.jsx";

/*
Auth Protection
*/
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />



        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ⭐ IMPORTANT FIX */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />



        {/* Charts */}
        <Route
          path="/charts"
          element={
            <ProtectedRoute>
              <Chart />
            </ProtectedRoute>
          }
        />



        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />



        {/* Warehouse Structure */}
        <Route
          path="/warehouses"
          element={
            <ProtectedRoute>
              <Warehouses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/zones"
          element={
            <ProtectedRoute>
              <Zones />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aisles"
          element={
            <ProtectedRoute>
              <Aisles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/racks"
          element={
            <ProtectedRoute>
              <Racks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bins"
          element={
            <ProtectedRoute>
              <Bins />
            </ProtectedRoute>
          }
        />



        {/* Operations */}
        <Route
          path="/inbound"
          element={
            <ProtectedRoute>
              <Inbound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/outbound"
          element={
            <ProtectedRoute>
              <Outbound />
            </ProtectedRoute>
          }
        />
        



        {/* Ledger */}
        <Route
          path="/ledger"
          element={
            <ProtectedRoute>
              <Ledger />
            </ProtectedRoute>
          }
        />



        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-2xl font-semibold text-red-500">
              404 Page Not Found
            </div>
          }
        />

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;