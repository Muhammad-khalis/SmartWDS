import axios from "axios";
console.log("✅ AXIOS INSTANCE LOADED"); // 👈 ADD HERE

const api = axios.create({
  baseURL: "https://smartwds-production.up.railway.app/api", // ✅ FIXED
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;