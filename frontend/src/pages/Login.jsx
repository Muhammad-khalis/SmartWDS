import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Navigation ke liye

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const cleanForm = {
        email: form.email.trim().toLowerCase(),
        password: form.password
      };

      const data = await loginUser(cleanForm);

      login?.(data);
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 sm:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Smart WDS
          </h1>
          <p className="text-white/80 text-sm mt-2">
            Warehouse Management System
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-300 text-white text-sm p-3 rounded-lg mb-4 text-center shadow-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="flex items-center bg-white/90 rounded-lg px-3 shadow-sm">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              value={form.email}
              placeholder="Email Address"
              required
              className="w-full px-2 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/90 rounded-lg px-3 shadow-sm">
            <Lock size={18} className="text-gray-500" />
            <input
              type="password"
              value={form.password}
              placeholder="Password"
              required
              className="w-full px-2 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:scale-[1.02] hover:bg-blue-50 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:hover:scale-100 mt-2"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* NEW: Sign Up Section */}
        <div className="text-center text-white/90 text-sm mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-yellow-300 hover:text-yellow-400 hover:underline font-bold transition-colors"
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-white/60 text-xs mt-4">
          © Smart WDS - Warehouse System
        </div>

      </div>
    </div>
  );
};

export default Login;