import useSWR from "swr";
import { fetchEventGallerybyId } from "@/repositories/eventGallery";

export const eventKey = (id: number) => `/gallery-event/${id}`;

export const useAudioDetail = (id: number) => {
  const { data, error, mutate } = useSWR([eventKey(id), id], () => fetchEventGallerybyId(id));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
