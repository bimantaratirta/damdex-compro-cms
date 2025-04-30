import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { Home } from "@/lib/types/home";
import { DataResponse } from "@/lib/types/response";
import axios from "axios";

export const fetchHome = async (params: { language: "id" | "eng"; section: number }): Promise<DataResponse<Home[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Home[]>>(`/homepage`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postHome = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<Home>(`/homepage`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchHome = async (id: string, body: FormData) => {
  try {
    const res = await damdexAPI.patch<Home>(`/homepage/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteHome = async (id: string) => {
  try {
    const res = await damdexAPI.delete<DataResponse<Home>>(`/homepage/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
