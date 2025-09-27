import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to log requests
axiosInstance.interceptors.request.use((config) => {
  console.log("Making request to:", config.url);
  console.log("Request data:", config.data);
  return config;
});

// Add response interceptor to log responses
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.data);
    return response;
  },
  (error) => {
    console.error("Request failed:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    return Promise.reject(error);
  }
);

export default axiosInstance;
