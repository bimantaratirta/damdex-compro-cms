import { damdexPublicAPI } from "@/lib/apiClient";
import { DataResponse, UserData } from "@/lib/types/response";
import axios from "axios";
import { setCookie } from "typescript-cookie";

export const login = async (data: { email: string; password: string }): Promise<DataResponse<UserData>> => {
  try {
    const res = await damdexPublicAPI.post<DataResponse<UserData>>("/auth/login", data);
    localStorage.setItem("user-token", res.data.data.token);
    localStorage.setItem("user-refresh-token", res.data.data.token);
    setCookie("status", "active");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
