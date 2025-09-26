import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const register = async (username: string, email: string, password: string) => {
  return await axios.post(`${API_URL}/api/auth/register/`, { username, email, password });
};

export const login = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/api/token/`, { username, password });
};
