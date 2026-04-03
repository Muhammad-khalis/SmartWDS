import api from "../api/axios";

/*
Create Zone
*/
export const createZone = async (data) => {

  const res = await api.post("/zones", data);

  return res.data;

};

/*
Get Zones
*/
export const getZones = async () => {

  const res = await api.get("/zones");

  return res.data;

};

/*
Delete Zone
*/
export const deleteZone = async (id) => {

  const res = await api.delete(`/zones/${id}`);

  return res.data;

};

/*
Update Zone
*/
export const updateZone = async (id, data) => {

  const res = await api.put(`/zones/${id}`, data);

  return res.data;

};