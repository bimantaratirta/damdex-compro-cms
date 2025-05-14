import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { DataResponse } from "@/lib/types/response";
import { UseFor } from "@/lib/types/use";
import axios from "axios";

type UseForPayload = {
  useCompositionId: number;
  titleIDN: string;
  titleENG: string;
  descriptionIDN: string;
  descriptionENG: string;
};

export const fetchUseForbyId = async (id: number): Promise<DataResponse<UseFor>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<UseFor>>(`/use/use-composition-use-for/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postUseFor = async (body: UseForPayload) => {
  try {
    const res = await damdexAPI.post<UseFor>(`/use/use-composition-use-for`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchUseFor = async (id: number, body: UseForPayload) => {
  try {
    const res = await damdexAPI.patch<UseFor>(`/use/use-composition-use-for/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteUseFor = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<UseFor>>(`/use/use-composition-use-for/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
