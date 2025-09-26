import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // make sure this matches your Django server
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
