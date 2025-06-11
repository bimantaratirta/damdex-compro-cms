import useSWR from "swr";
import { fetchStoreById } from "@/repositories/store";

export const StoreKey = (id: number) => `/store/${id}`;

export const useStoreDetail = (id: number) => {
  const { data, error, mutate } = useSWR([StoreKey(id), id], () => fetchStoreById(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
