import api from "../api/axios";

/*
Login API
*/

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data); // ✅ FIXED
  return response.data;
};