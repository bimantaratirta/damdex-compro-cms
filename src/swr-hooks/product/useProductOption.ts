import useSWR from "swr";
import { fetchProductNoPagination } from "@/repositories/product";

export const useProductOptions = () => {
  const { data, error, mutate } = useSWR("/product/get-product-options", () => fetchProductNoPagination());

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
