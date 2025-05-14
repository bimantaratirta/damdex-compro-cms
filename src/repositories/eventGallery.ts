import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { PaginationParams } from "@/lib/params";
import { EventGallery } from "@/lib/types/event-gallery";
import { DataResponse, PaginatedDataResponse } from "@/lib/types/response";
import axios from "axios";

export const fetchEventGallery = async (params: PaginationParams): Promise<PaginatedDataResponse<EventGallery[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<EventGallery[]>>(`/gallery-event`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchEventGallerybyId = async (id: number): Promise<DataResponse<EventGallery[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<EventGallery[]>>(`/gallery-event/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postEventGallery = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<EventGallery>(`/gallery-event`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchEventGallery = async (id: number, body: FormData) => {
  try {
    const res = await damdexAPI.patch<EventGallery>(`/gallery-event/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteEventGallery = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<EventGallery>>(`/gallery-event/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
