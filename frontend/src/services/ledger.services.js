import api from "../api/axios";

/*
Inbound Service

Responsible for:
• Creating GRN
• Fetching GRN list
*/

export const createGRN = async (data) => {
  const res = await api.post("/inbound", data);
  return res.data;
};

export const getGRNs = async () => {
  const res = await api.get("/inbound");
  return res.data;
};