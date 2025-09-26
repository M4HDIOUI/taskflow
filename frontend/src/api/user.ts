// src/api/user.ts
import axios from "axios";

const API_BASE = "http://localhost:8000/api/auth";

// ------------------- Types -------------------
export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

// ------------------- API Calls -------------------
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  const response = await axios.post<{ message: string }>(
    `${API_BASE}/register/`,
    { username, email, password }
  );
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthTokens> => {
  const response = await axios.post<AuthTokens>(`${API_BASE}/login/`, {
    email,
    password,
  });
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");

  const response = await axios.get<User>(`${API_BASE}/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
