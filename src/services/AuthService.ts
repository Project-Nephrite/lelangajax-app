// services/AuthService.ts
import axios from "axios";
import ValidationError from "../types/ValidationError";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/auth",
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthService = {
  login: async (email: string, password: string) => {
    await API.post("/login", { email, password })
      .then((response) => {
        const token = response.data.token;
        sessionStorage.setItem("auth_token", token);
        return;
      })
      .catch((error) => {
        if (error.response.status === 422)
          throw new ValidationError(
            error.response.data.message,
            error.response.status,
          );
        else throw error;
      });
  },
  logout: async () => {
    await API.post("/logout");
    sessionStorage.removeItem("auth_token");
  },
  getCurrentUser: async () => {
    const res = await API.get("/me");
    return res.data;
  },
  isAuthenticated: () => {
    return !!sessionStorage.getItem("auth_token");
  },
};
