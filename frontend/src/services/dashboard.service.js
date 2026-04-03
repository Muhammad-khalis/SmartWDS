import api from "../api/axios";

export const getDashboardData = async () => {

  const res = await api.get("/api/dashboard/stats"); // ✅ FIXED

  return res.data;

};