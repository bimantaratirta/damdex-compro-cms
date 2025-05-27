import useSWR from "swr";
import { fetchUse } from "@/repositories/use";
import { PaginationParams } from "@/lib/params";
import { PaginationQuery } from "@/lib/query";
import { paginationQueryToParams } from "@/lib/utils";

export const usageParamsSwrKey = (query?: PaginationQuery) => {
  const params: PaginationParams | undefined = query ? paginationQueryToParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
  }

  return ["/use", params];
};

export const useUsage = (query?: PaginationQuery) => {
  const { data, mutate, error } = useSWR(usageParamsSwrKey(query), ([path, params]) =>
    fetchUse(params as PaginationParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
