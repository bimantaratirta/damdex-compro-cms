import useSWR from "swr";
import { fetchStoreCity } from "@/repositories/store";

export const ProvinceKey = (province: string) => `/store/city-options/${province}`;

export const useCityOptions = (province: string) => {
  const { data, error, mutate } = useSWR([ProvinceKey(province), province], () => fetchStoreCity(province));

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    mutate,
  };
};
