import api from "../api/axios";

/*
Get products with pagination
*/
export const getProducts = async (page = 1, limit = 10) => {
  const res = await api.get(`/products?page=${page}&limit=${limit}`);
  return res.data;
};

/*
Create product
*/
export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

/*
Update product
*/
export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

/*
Delete product
*/
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};