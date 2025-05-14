import { fetchUseCompositionNoPagination } from "@/repositories/useComposition";
import useSWR from "swr";

export const useUsageCompositionOptions = () => {
  const { data, error, mutate } = useSWR("/use/use-composition/get-use-composition-options", () =>
    fetchUseCompositionNoPagination()
  );

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
