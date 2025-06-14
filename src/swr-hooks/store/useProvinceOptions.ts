import useSWR from "swr";
import { fetchStoreProvince } from "@/repositories/store";

export const useProvinceOptions = () => {
  const { data, error, mutate } = useSWR("/store/province-options", () => fetchStoreProvince());

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
