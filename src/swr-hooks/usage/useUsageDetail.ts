import useSWR from "swr";
import { fetchUsebyId } from "@/repositories/use";

export const usageKey = (id: string) => `/use/${id}`;

export const useUsageDetail = (id: string) => {
  const { data, error, mutate } = useSWR([usageKey(id), id], () => fetchUsebyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
