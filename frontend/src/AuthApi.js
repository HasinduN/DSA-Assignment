// frontend/src/AuthApi.js
import axios from "axios";

const AuthApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

export default AuthApi;
