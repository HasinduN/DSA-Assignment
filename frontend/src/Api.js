import axios from "axios";

const api = axios.create({
  baseURL: process.env.BANANA_API,
});

export default api;
