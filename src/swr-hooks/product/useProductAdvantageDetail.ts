import useSWR from "swr";
import { fetchProductAdvantagebyId } from "@/repositories/product";

export const productAdvantageKey = (id: number) => `/product/product-advantage/${id}`;

export const useProductAdvantageDetail = (id: number) => {
  const { data, error, mutate } = useSWR([productAdvantageKey(id), id], () => fetchProductAdvantagebyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
