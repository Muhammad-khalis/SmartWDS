import axios from "axios";

/*
Axios instance
Security: token automatically attach
Why we use it:
• Single API config
• Automatically attach JWT token
• Cleaner API calls
*/

const api = axios.create({
  baseURL: "https://smartwds-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
 
});

/*
Request interceptor

Automatically attach token
to every protected request
*/

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;