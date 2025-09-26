// src/api/user.ts
import axios from "axios";

// Define a type for login response
export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Make sure base URL is correct
const API_BASE = "http://localhost:8000/api/auth";

// LOGIN
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_BASE}/login/`, { username, password });
  return response.data;
};

// REGISTER
export const registerUser = async (data: RegisterData): Promise<void> => {
  await axios.post(`${API_BASE}/register/`, data);
};

// GET CURRENT USER
export interface User {
  username: string;
  email: string;
}

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const response = await axios.get<User>(`${API_BASE}/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
