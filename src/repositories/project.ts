import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { PaginationParams } from "@/lib/params";
import { Project } from "@/lib/types/project";
import { DataResponse, PaginatedDataResponse } from "@/lib/types/response";
import axios from "axios";

export const fetchProject = async (params: PaginationParams): Promise<PaginatedDataResponse<Project[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<Project[]>>(`/project`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProjectbyId = async (id: number): Promise<DataResponse<Project[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Project[]>>(`/project/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postProject = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<Project>(`/project`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchProject = async (id: number, body: FormData) => {
  try {
    const res = await damdexAPI.patch<Project>(`/project/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<Project>>(`/project/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
