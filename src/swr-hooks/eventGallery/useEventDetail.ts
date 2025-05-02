import useSWR from "swr";
import { fetchEventGallerybyId } from "@/repositories/eventGallery";

export const eventKey = (id: string) => `/gallery-event/${id}`;

export const useAudioDetail = (id: string) => {
  const { data, error, mutate } = useSWR([eventKey(id), id], () => fetchEventGallerybyId(id));

  const loading = !data && !error;

  return {
    audio: data,
    loading,
    error,
    mutate,
  };
};
