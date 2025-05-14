import useSWR from "swr";
import { fetchUseForbyId } from "@/repositories/useFor";

export const usageForKey = (id: number) => `/use/use-composition-use-for/${id}`;

export const useUsageForDetail = (id: number) => {
  const { data, error, mutate } = useSWR([usageForKey(id), id], () => fetchUseForbyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
