import { damdexAPI, damdexPublicAPI } from "@/lib/apiClient";
import { PaginationParams } from "@/lib/params";
import { Product, ProductAdvantage } from "@/lib/types/product";
import { DataResponse, PaginatedDataResponse } from "@/lib/types/response";
import axios from "axios";

export const fetchProduct = async (params: PaginationParams): Promise<PaginatedDataResponse<Product[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<Product[]>>(`/product`, { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProductNoPagination = async (): Promise<DataResponse<Product[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Product[]>>(`/product/get-product-options`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProductbyId = async (id: number): Promise<DataResponse<Product[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<Product[]>>(`/product/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postProduct = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<Product>(`/product`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchProduct = async (id: number, body: FormData) => {
  try {
    const res = await damdexAPI.patch<Product>(`/product/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<Product>>(`/product/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const fetchProductAdvantage = async (
  params: PaginationParams
): Promise<PaginatedDataResponse<ProductAdvantage[]>> => {
  try {
    const res = await damdexPublicAPI.get<PaginatedDataResponse<ProductAdvantage[]>>(`/product/product-advantage`, {
      params,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProductAdvantagebyId = async (id: number): Promise<DataResponse<ProductAdvantage[]>> => {
  try {
    const res = await damdexPublicAPI.get<DataResponse<ProductAdvantage[]>>(`/product/product-advantage/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const postProductAdvantage = async (body: FormData) => {
  try {
    const res = await damdexAPI.post<ProductAdvantage>(`/product/product-advantage`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const patchProductAdvantage = async (id: number, body: FormData) => {
  try {
    const res = await damdexAPI.patch<ProductAdvantage>(`/product/product-advantage/${id}`, body);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

export const deleteProductAdvantage = async (id: number) => {
  try {
    const res = await damdexAPI.delete<DataResponse<ProductAdvantage>>(`/product/product-advantage/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};
