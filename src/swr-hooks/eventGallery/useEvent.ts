import useSWR from "swr";
import { fetchEventGallery } from "@/repositories/eventGallery";
import { PaginationParams } from "@/lib/params";
import { PaginationQuery } from "@/lib/query";
import { paginationQueryToParams } from "@/lib/utils";

export const eventParamsSwrKey = (query?: PaginationQuery) => {
  const params: PaginationParams | undefined = query ? paginationQueryToParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
  }

  return ["/gallery-event", params];
};

export const useEvent = (query?: PaginationQuery) => {
  const { data, mutate, error } = useSWR(eventParamsSwrKey(query), ([path, params]) =>
    fetchEventGallery(params as PaginationParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
