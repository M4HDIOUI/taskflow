import axiosInstance from "./axios";

// Types
export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

// Signup function
export const signup = async (data: SignupData) => {
  return axiosInstance.post("/auth/register/", data);
};

// Login function
export const login = async (data: LoginData) => {
  return axiosInstance.post<Tokens>("/auth/login/", data);
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  const res = await axiosInstance.get<User>("/auth/me/");
  return res.data;
};
