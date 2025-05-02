import useSWR from "swr";
import { fetchNewsbyId } from "@/repositories/news";

export const newsKey = (id: string) => `/gallery-event/${id}`;

export const useNewsDetail = (id: string) => {
  const { data, error, mutate } = useSWR([newsKey(id), id], () => fetchNewsbyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
