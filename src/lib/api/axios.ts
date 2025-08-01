import axios from "axios";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 3000, // 3 seconds
  headers: {
    "Content-Type": "application/json",
  },
});
