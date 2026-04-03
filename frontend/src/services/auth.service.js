import api from "../api/axios";

/*
Login API
*/

export const loginUser = async (data) => {

  const response = awaitapi.post("/api/auth/login", data); 

  return response.data;
};