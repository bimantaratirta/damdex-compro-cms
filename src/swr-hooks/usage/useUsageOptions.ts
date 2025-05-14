import { fetchUseNoPagination } from "@/repositories/use";
import useSWR from "swr";

export const useUsageOptions = () => {
  const { data, error, mutate } = useSWR("/use/get-use-options", () => fetchUseNoPagination());

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
