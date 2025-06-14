import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { PaginationParams } from "@/lib/params";
import { DataResponse, PaginatedDataResponse } from "@/lib/types/response";
import { Use } from "@/lib/types/use";
import axios from "axios";

export const fetchUse = async (params: PaginationParams): Promise<PaginatedDataResponse<Use[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<Use[]>>(`/use`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUseNoPagination = async (): Promise<DataResponse<Use[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Use[]>>(`/use/get-use-options`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUsebyId = async (id: number): Promise<DataResponse<Use>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Use>>(`/use/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postUse = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<Use>(`/use`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchUse = async (id: number, body: FormData) => {
  try {
    const res = await damdexAPI.patch<Use>(`/use/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteUse = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<Use>>(`/use/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
