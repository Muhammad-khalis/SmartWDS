import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const cleanForm = {
        email: form.email.trim().toLowerCase(),
        password: form.password
      };

      const data = await loginUser(cleanForm);

      if (login) {
        login(data);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400">

      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-md">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Smart WDS
          </h1>
          <p className="text-white/80 text-sm mt-2">
            Warehouse Management System
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-white border border-red-300 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Email
            </label>

            <div className="flex items-center bg-white/90 rounded-lg px-3">
              <Mail size={18} className="text-gray-500" />

              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-2 py-2 outline-none bg-transparent"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Password
            </label>

            <div className="flex items-center bg-white/90 rounded-lg px-3">
              <Lock size={18} className="text-gray-500" />

              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-2 py-2 outline-none bg-transparent"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Sign In
          </button>

        </form>

        <div className="text-center text-white/80 text-sm mt-6">
          © Smart WDS
        </div>

      </div>

    </div>
  );
};

export default Login;