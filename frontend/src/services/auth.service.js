import api from "../api/axios";

/*
Login API
*/

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data); // ✅ FIXED
  return response.data;

};

// ✅ Register
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};