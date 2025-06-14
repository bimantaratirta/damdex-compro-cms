import { StoreParams } from "@/lib/params";
import { StoreQuery } from "@/lib/query";
import { storeQuerytoParams } from "@/lib/utils";
import { fetchStore } from "@/repositories/store";
import useSWR from "swr";

export const storeParamsSwrKey = (query?: StoreQuery) => {
  const params: StoreParams | undefined = query ? storeQuerytoParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
    if (!params?.city) delete params.city;
    if (!params?.province) delete params.province;
    if (!params?.storeName) delete params.storeName;
  }

  return ["/store", params];
};

export const useStore = (query?: StoreQuery) => {
  const { data, mutate, error } = useSWR(storeParamsSwrKey(query), ([path, params]) =>
    fetchStore(params as StoreParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
