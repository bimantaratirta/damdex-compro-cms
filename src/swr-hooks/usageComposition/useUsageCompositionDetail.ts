import useSWR from "swr";
import { fetchUseCompositionbyId } from "@/repositories/useComposition";

export const usageCompositionKey = (id: number) => `/use/use-composition/${id}`;

export const useUsageDetail = (id: number) => {
  const { data, error, mutate } = useSWR([usageCompositionKey(id), id], () => fetchUseCompositionbyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
