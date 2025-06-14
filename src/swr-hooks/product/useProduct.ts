import useSWR from "swr";
import { fetchProduct } from "@/repositories/product";
import { PaginationParams } from "@/lib/params";
import { PaginationQuery } from "@/lib/query";
import { paginationQueryToParams } from "@/lib/utils";

export const productParamsSwrKey = (query?: PaginationQuery) => {
  const params: PaginationParams | undefined = query ? paginationQueryToParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
  }

  return ["/product", params];
};

export const useProduct = (query?: PaginationQuery) => {
  const { data, mutate, error } = useSWR(productParamsSwrKey(query), ([path, params]) =>
    fetchProduct(params as PaginationParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
