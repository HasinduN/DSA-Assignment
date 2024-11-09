import api from "../Api"; // Assuming Api.js is in the root `src` folder

// Fetches banana data
export const fetchBananaData = async () => {
  try {
    const response = await api.get("/game/banana-data");
    return response.data.imageBase64;
  } catch (error) {
    console.error("Error fetching banana data:", error);
    throw error;
  }
};

// Other API functions, e.g., login, register, etc.
export const userLogin = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
