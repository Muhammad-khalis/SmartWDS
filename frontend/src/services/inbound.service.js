import api from "../api/axios";

/*
  Inbound Service - SmartWDS Node
*/

// CREATE: New GRN Entry
export const createGRN = async (data) => {
  try {
    const res = await api.post("/inbound", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// GET: Fetch all GRN logs
export const getGRNs = async () => {
  try {
    const res = await api.get("/inbound");
    
    // ⭐ HCI FIX: Defensive Data Extraction
    // Hum check kar rahe hain ke data res.data.data mein hai ya sirf res.data mein
    const finalData = res.data?.data || res.data?.grns || res.data;
    
    // Ensure kar rahay hain ke hamesha Array hi wapas jaye
    return Array.isArray(finalData) ? finalData : [];
  } catch (error) {
    console.error("Service Error: Inbound fetch failed");
    return []; // Return empty array on error to prevent .map() crash
  }
};

// DELETE: Decommission GRN Entry
export const deleteGRN = async (id) => {
  try {
    const res = await api.delete(`/inbound/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};