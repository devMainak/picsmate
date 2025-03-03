import axios from "axios";

export const webServerAxios = axios.create({
  baseURL: `${import.meta.env.WEB_SERVER_URL}`,
  withCredentials: true,
});
