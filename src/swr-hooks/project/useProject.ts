import useSWR from "swr";
import { fetchProject } from "@/repositories/project";
import { PaginationParams } from "@/lib/params";
import { PaginationQuery } from "@/lib/query";
import { paginationQueryToParams } from "@/lib/utils";

export const projectParamsSwrKey = (query?: PaginationQuery) => {
  const params: PaginationParams | undefined = query ? paginationQueryToParams(query) : undefined;

  if (params) {
    if (!params?.limit) delete params.limit;
    if (!params?.page) delete params.page;
  }

  return ["/project", params];
};

export const useProject = (query?: PaginationQuery) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, mutate, error } = useSWR(projectParamsSwrKey(query), ([path, params]) =>
    fetchProject(params as PaginationParams)
  );
  const loading = !data && !error;

  return {
    loading,
    mutate,
    data,
  };
};
