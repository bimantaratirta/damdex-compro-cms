import { damdexAPI } from "@/lib/apiClient";
import { DataResponse } from "@/lib/types/response";
import axios from "axios";

export const uploadImage = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<DataResponse<{ publicUrl: string; path: string }>>(`/storage/upload`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
