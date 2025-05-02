import useSWR from "swr";
import { fetchProductAdvantagebyId } from "@/repositories/product";

export const productAdvantageKey = (id: string) => `/product/product-advantage/${id}`;

export const useProductAdvantageDetail = (id: string) => {
  const { data, error, mutate } = useSWR([productAdvantageKey(id), id], () => fetchProductAdvantagebyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
