import useSWR from "swr";
import { fetchUsebyId } from "@/repositories/use";

export const usageKey = (id: number) => `/use/${id}`;

export const useUsageDetail = (id: number) => {
  const { data, error, mutate } = useSWR([usageKey(id), id], () => fetchUsebyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
