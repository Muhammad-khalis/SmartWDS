import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Briefcase } from "lucide-react";
import { registerUser } from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Operator" // default match backend
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role
      });

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Smart WDS
          </h1>
          <p className="text-white/80 text-sm mt-2">
            Warehouse Management System
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 text-white p-2 rounded text-sm text-center mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="flex items-center bg-white/90 rounded-lg px-3">
            <User size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-2 py-3 bg-transparent outline-none"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-white/90 rounded-lg px-3">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-2 py-3 bg-transparent outline-none"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/90 rounded-lg px-3">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-2 py-3 bg-transparent outline-none"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          {/* ROLE (FIXED) */}
          <div className="flex items-center bg-white/90 rounded-lg px-3">
            <Briefcase size={18} />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full px-2 py-3 bg-transparent outline-none"
            >
              <option value="Operator">Operator</option>
              <option value="WarehouseManager">Warehouse Manager</option>
              <option value="DispatchManager">Dispatch Manager</option>
              <option value="SuperAdmin">Super Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:scale-105 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-white/70 text-sm mt-6">
          Already have account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-yellow-300 font-semibold"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;