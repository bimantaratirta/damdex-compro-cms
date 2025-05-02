import useSWR from "swr";
import { fetchProjectbyId } from "@/repositories/project";

export const projectKey = (id: string) => `/project/${id}`;

export const useAudioDetail = (id: string) => {
  const { data, error, mutate } = useSWR([projectKey(id), id], () => fetchProjectbyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
