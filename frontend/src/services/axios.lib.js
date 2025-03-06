import axios from "axios";

export const webServerAxios = axios.create({
  baseURL: `${import.meta.env.VITE_WEB_SERVER_BASE_URL}`,
  withCredentials: true,
});
