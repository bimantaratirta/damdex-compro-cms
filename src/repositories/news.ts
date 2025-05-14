import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { PaginationParams } from "@/lib/params";
import { News } from "@/lib/types/news";
import { DataResponse, PaginatedDataResponse } from "@/lib/types/response";
import axios from "axios";

export const fetchNews = async (params: PaginationParams): Promise<PaginatedDataResponse<News[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<News[]>>(`/news`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchNewsbyId = async (id: number): Promise<DataResponse<News[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<News[]>>(`/news/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postNews = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<News>(`/news`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchNews = async (id: number, body: FormData) => {
  try {
    const res = await damdexAPI.patch<News>(`/news/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteNews = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<News>>(`/news/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
