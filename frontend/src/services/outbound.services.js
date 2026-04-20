import api from "../api/axios";

/**
 * OUTBOUND LOGISTICS SERVICE
 * Connects the frontend terminal to the warehouse backend.
 */

// 1. Dispatch Order Create karne ke liye
export const createDispatch = async (dispatchData) => {
  try {
    const res = await api.post("/outbound", dispatchData);
    // HCI Rule: Hamesha response ka specific data return karein
    return res.data;
  } catch (error) {
    // Service level par error log karna debugging mein asani deta hai
    console.error("Outbound Protocol Failure:", error.response?.data || error.message);
    throw error; // Isay throw karein taake UI mein 'showError' trigger ho sakay
  }
};

// 2. Sari Outbound history/queue mangwane ke liye
export const getDispatch = async () => {
  try {
    const res = await api.get("/outbound");
    return res.data;
  } catch (error) {
    console.error("Outbound Sync Error:", error.message);
    return { data: [] }; // Fallback taake table khali nazar aaye, crash na ho
  }
};