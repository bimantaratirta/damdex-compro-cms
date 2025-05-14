import useSWR from "swr";
import { fetchUseForbyId } from "@/repositories/useFor";

export const usageForKey = (id: string) => `/use/use-composition-use-for/${id}`;

export const useUsageDetail = (id: string) => {
  const { data, error, mutate } = useSWR([usageForKey(id), id], () => fetchUseForbyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
