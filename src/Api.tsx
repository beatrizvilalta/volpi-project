import axios from "axios";
import { RequestType } from "types";

const api = axios.create({
  baseURL: "https://volpi-api-ec9e2c714aa7.herokuapp.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const request = async <T,>(
  endpoint: string,
  method: RequestType,
  data?: any,
  customHeaders?: Record<string, string>
): Promise<T> => {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      data,
      headers: customHeaders,
    });
    return response.data as T;
  } catch (error) {
    console.error("Erro no request:", error);
    throw error;
  }
};

export default api;
