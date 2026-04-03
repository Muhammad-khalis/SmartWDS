import api from "../api/axios";

/*
CREATE RACK
*/
export const createRack = async (data) => {
  const res = await api.post("/racks", data);
  return res.data;
};

/*
GET RACKS
*/
export const getRacks = async () => {
  const res = await api.get("/racks");
  return res.data;
};