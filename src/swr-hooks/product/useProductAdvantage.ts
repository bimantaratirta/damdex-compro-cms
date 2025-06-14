import useSWR from "swr";
import { fetchProductAdvantage } from "@/repositories/product";
import { PaginationParams } from "@/lib/params";
import { PaginationQuery } from "@/lib/query";
import { paginationQueryToParams } from "@/lib/utils";

export const productAdvantageParamsSwrKey = (query?: PaginationQuery) => {
  const params: PaginationParams | undefined = query ? paginationQueryToParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
  }

  return ["/product/product-advantage", params];
};

export const useProductAdvantage = (query?: PaginationQuery) => {
  const { data, mutate, error } = useSWR(productAdvantageParamsSwrKey(query), ([path, params]) =>
    fetchProductAdvantage(params as PaginationParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
