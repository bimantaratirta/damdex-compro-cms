import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { PaginationParams } from "@/lib/params";
import { DataResponse, PaginatedDataResponse } from "@/lib/types/response";
import { City, Province, Store } from "@/lib/types/store";
import axios from "axios";

type StorePayload = {
  province: string;
  city: string;
  storeName: string;
  storeAddress: string;
  storeAddressGoogleMap: string;
  storePhone: string;
};

export const fetchStoreProvince = async (): Promise<DataResponse<Province[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Province[]>>(`/store/province-options`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchStoreCity = async (province: string): Promise<DataResponse<City[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<City[]>>(`/store/city-options/${province}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchStore = async (params: PaginationParams): Promise<PaginatedDataResponse<Store[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<Store[]>>(`/store`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchStoreById = async (id: number): Promise<DataResponse<Store>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Store>>(`/store/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postStore = async (body: StorePayload) => {
  try {
    const res = await damdexAPI.post<Store>(`/store`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchStore = async (id: number, body: StorePayload) => {
  try {
    const res = await damdexAPI.patch<Store>(`/store/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteStore = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<Store>>(`/store/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
