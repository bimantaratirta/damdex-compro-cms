import useSWR from "swr";
import { fetchHome } from "@/repositories/home";
import { HomeParams } from "@/lib/params";
import { HomeQuery } from "@/lib/query";
import { homeQuerytoParams } from "@/lib/utils";

export const HomeParamsSwrKey = (query?: HomeQuery) => {
  const params: HomeParams | undefined = query ? homeQuerytoParams(query) : undefined;

  return ["/homepage", params];
};

export const useHome = (query?: HomeQuery) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, mutate, error } = useSWR(HomeParamsSwrKey(query), ([path, params]) => fetchHome(params as HomeParams));
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
