import api from "../api/axios";

/*
Outbound Service

Handles dispatch orders
*/

export const createDispatch = async (data) => {

  const res = await api.post("/outbound", data);

  return res.data;

};

export const getDispatch = async () => {

  const res = await api.get("/outbound");

  return res.data;

};