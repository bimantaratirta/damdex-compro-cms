import axios from "axios";
import { getUserToken } from "./utils";
import { setCookie } from "typescript-cookie";

export const damdexPublicAPI = axios.create({
  withCredentials: false,
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

damdexPublicAPI.interceptors.request.use((request) => {
  console.log(`user => ${request.method} | ${request.url}`);
  return request;
});

export const damdexAPI = axios.create({
  withCredentials: false,
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${getUserToken()}`,
    "Cache-Control": "private",
    "max-age": "50000000",
  },
});

damdexAPI.interceptors.response.use(null, async (error) => {
  const config = error.config;
  if (error && error.response.status === 401) {
    setCookie("status", "inactive");
    window.location.reload();
    return axios(config);
  }
});

damdexAPI.interceptors.request.use((request) => {
  const token = getUserToken();
  if (!token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
