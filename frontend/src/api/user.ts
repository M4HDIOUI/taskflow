import axiosInstance from "./axios";

const BASE_URL = "/auth";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

// Register user
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    console.log("Making registration request to:", `${BASE_URL}/register/`);
    console.log("Request data:", { username, email, password });
    
    const res = await axiosInstance.post(`${BASE_URL}/register/`, { username, email, password });
    console.log("Registration response:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Registration API error:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(errorMessage);
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log("Making login request to:", `${BASE_URL}/login/`);
    console.log("Request data:", { email, password });
    
    const res = await axiosInstance.post(`${BASE_URL}/login/`, { email, password });
    console.log("Login response:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Login API error:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Login failed. Please check your credentials.";
    throw new Error(errorMessage);
  }
};

// Get current logged-in user
export const getCurrentUser = async (): Promise<User> => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/user/`);
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Failed to fetch user data.";
    throw new Error(errorMessage);
  }
};

// ---------- NEW: Google login ----------
export const socialLogin = async (token: string): Promise<LoginResponse> => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}/google/`, { token });
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Google login failed.";
    throw new Error(errorMessage);
  }
};
