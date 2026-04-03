import api from "../api/axios";

/*
CREATE BIN
*/
export const createBin = async (data) => {
  const res = await api.post("/bins", data);
  return res.data;
};

/*
GET BINS
*/
export const getBins = async () => {
  const res = await api.get("/bins");
  return res.data;
};