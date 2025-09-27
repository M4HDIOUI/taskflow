import axiosInstance from "./axios";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.post("/auth/register/", {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login/", {
    email,
    password,
  });
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/auth/user/");
  return response.data;
};
