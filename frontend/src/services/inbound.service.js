import api from "../api/axios";

/*
Inbound Service
*/

// CREATE
export const createGRN = async (data) => {
  const res = await api.post("/inbound", data);
  return res.data;
};

// GET
export const getGRNs = async () => {
  const res = await api.get("/inbound");
  return res.data;
};

// 🔥 DELETE (ADD THIS)
export const deleteGRN = async (id) => {
  const res = await api.delete(`/inbound/${id}`);
  return res.data;
};