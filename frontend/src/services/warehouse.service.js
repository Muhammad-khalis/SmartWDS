import api from "../api/axios";

/*
Create Warehouse
*/
export const createWarehouse = async (data) => {

  const res = await api.post("/warehouses", data);

  return res.data;

};

/*
Get Warehouses
*/
export const getWarehouses = async () => {

  const res = await api.get("/warehouses");

  return res.data;

};

/*
Update Warehouse
*/
export const updateWarehouse = async (id, data) => {

  const res = await api.put(`/warehouses/${id}`, data);

  return res.data;

};

/*
Delete Warehouse
*/
export const deleteWarehouse = async (id) => {

  const res = await api.delete(`/warehouses/${id}`);

  return res.data;

};