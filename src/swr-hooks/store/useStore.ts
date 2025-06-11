import useSWR from "swr";
import { fetchStore } from "@/repositories/store";
import { PaginationParams } from "@/lib/params";
import { PaginationQuery } from "@/lib/query";
import { paginationQueryToParams } from "@/lib/utils";

export const storeParamsSwrKey = (query?: PaginationQuery) => {
  const params: PaginationParams | undefined = query ? paginationQueryToParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
  }

  return ["/store", params];
};

export const useStore = (query?: PaginationQuery) => {
  const { data, mutate, error } = useSWR(storeParamsSwrKey(query), ([path, params]) =>
    fetchStore(params as PaginationParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
