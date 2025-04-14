import axios from "axios";

export const webServerAxios = axios.create({
  baseURL: `${import.meta.env.VITE_WEB_SERVER_BASE_URL}`,
  withCredentials: true,
});

webServerAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
