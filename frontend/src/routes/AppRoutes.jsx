import { Routes, Route, Navigate } from "react-router-dom";

/* --- Auth & Protection --- */
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PublicRoute from "../components/PublicRoute.jsx";

/* --- Core Pages --- */
import Login from "../pages/Login.jsx";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard.jsx";
import Chart from "../pages/Chart.jsx";
import Ledger from "../pages/Ledger.jsx";
import UserManagement from "../pages/UserManagement.jsx";

/* --- Inventory & Infrastructure --- */
import Products from "../pages/Products.jsx";
import ProductForm from "../pages/ProductForm.jsx";
import Warehouses from "../pages/Warehouses.jsx";
import Zones from "../pages/Zones.jsx";
import Aisles from "../pages/Aisles.jsx";
import Racks from "../pages/Racks.jsx";
import Bins from "../pages/Bins.jsx";

/* --- Operations --- */
import Inbound from "../pages/Inbound.jsx";
import Outbound from "../pages/Outbound.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 PUBLIC ACCESS: Login/Register (Protected from logged-in users) */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* 🔒 PROTECTED ACCESS: Sab pages ke liye token lazmi hai */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/charts" element={<ProtectedRoute><Chart /></ProtectedRoute>} />

      {/* Products Registry */}
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />

      {/* Warehouse Infrastructure Mapping */}
      <Route path="/warehouses" element={<ProtectedRoute><Warehouses /></ProtectedRoute>} />
      <Route path="/zones" element={<ProtectedRoute><Zones /></ProtectedRoute>} />
      <Route path="/aisles" element={<ProtectedRoute><Aisles /></ProtectedRoute>} />
      <Route path="/racks" element={<ProtectedRoute><Racks /></ProtectedRoute>} />
      <Route path="/bins" element={<ProtectedRoute><Bins /></ProtectedRoute>} />

      {/* Operational Flow */}
      <Route path="/inbound" element={<ProtectedRoute><Inbound /></ProtectedRoute>} />
      <Route path="/outbound" element={<ProtectedRoute><Outbound /></ProtectedRoute>} />
      <Route path="/ledger" element={<ProtectedRoute><Ledger /></ProtectedRoute>} />

      {/* 🛡️ CATCH-ALL REDIRECT: 404 ki bajaye system home par redirect karega */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;