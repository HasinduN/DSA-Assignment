// frontend/src/services/ApiService.js
import api from "../GameApi";
import AuthApi from "../AuthApi";

export const fetchBananaData = async () => {
  try {
    const response = await api.get("/game/banana-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching banana data:", error);
    throw error;
  }
};

// Fetch user profile
export const fetchUserProfile = async () => {
  try {
    const response = await AuthApi.get("/auth/profile"); // Authenticated route for profile
    return response.data; // Returns user profile data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await AuthApi.post("/auth/register", userData); // Registration endpoint
    return response.data; // Success message or user data
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await AuthApi.post("/auth/login", credentials); // Login endpoint
    return response.data; // Returns auth token and user data
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Submit game score
export const submitScore = async (score) => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve auth token
    const response = await AuthApi.post(
      "/game/submit-score",
      { score },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      }
    );
    return response.data; // Success message or updated leaderboard
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
};

// Fetch leaderboard data
export const fetchLeaderboard = async () => {
  try {
    const response = await AuthApi.get("/leaderboard"); // Public route for leaderboard
    return response.data; // Returns leaderboard entries
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};