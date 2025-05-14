import useSWR from "swr";
import { fetchUseCompositionbyId } from "@/repositories/useComposition";

export const usageCompositionKey = (id: string) => `/use/use-composition/${id}`;

export const useUsageDetail = (id: string) => {
  const { data, error, mutate } = useSWR([usageCompositionKey(id), id], () => fetchUseCompositionbyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
