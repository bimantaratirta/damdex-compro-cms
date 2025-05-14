import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { DataResponse } from "@/lib/types/response";
import { UseComposition } from "@/lib/types/use";
import axios from "axios";

type UseCompositionPayload = {
  useId: string;
  titleIDN: string;
  titleENG: string;
  descriptionIDN: string;
  descriptionENG: string;
};

export const fetchUseCompositionNoPagination = async (): Promise<DataResponse<UseComposition[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<UseComposition[]>>(
      `/use/use-composition/get-use-composition-options`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUseCompositionbyId = async (id: string): Promise<DataResponse<UseComposition[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<UseComposition[]>>(`/use/use-composition/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postUseComposition = async (body: UseCompositionPayload) => {
  try {
    const res = await damdexAPI.post<UseComposition>(`/use/use-composition`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchUseComposition = async (id: string, body: UseCompositionPayload) => {
  try {
    const res = await damdexAPI.patch<UseComposition>(`/use/use-composition/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteUseComposition = async (id: string) => {
  try {
    const res = await damdexAPI.delete<DataResponse<UseComposition>>(`/use/use-composition/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
