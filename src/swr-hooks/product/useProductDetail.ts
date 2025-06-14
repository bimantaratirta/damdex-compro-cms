import useSWR from "swr";
import { fetchProductbyId } from "@/repositories/product";

export const productKey = (id: number) => `/product/${id}`;

export const useProductDetail = (id: number) => {
  const { data, error, mutate } = useSWR([productKey(id), id], () => fetchProductbyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
