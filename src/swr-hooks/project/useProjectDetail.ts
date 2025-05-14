import useSWR from "swr";
import { fetchProjectbyId } from "@/repositories/project";

export const projectKey = (id: number) => `/project/${id}`;

export const useAudioDetail = (id: number) => {
  const { data, error, mutate } = useSWR([projectKey(id), id], () => fetchProjectbyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
