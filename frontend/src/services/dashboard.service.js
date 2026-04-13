import api from "../api/axios";

export const getDashboardData = async () => {
  const res = await api.get("/dashboard/stats"); // ✅ FINAL FIX
  return res.data;
};