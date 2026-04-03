import api from "../api/axios";

/*
CREATE AISLE
*/
export const createAisle = async (data) => {
  const res = await api.post("/aisles", data);
  return res.data;
};

/*
GET AISLES
*/
export const getAisles = async () => {
  const res = await api.get("/aisles");
  return res.data;
};