export type DataResponse<T> = {
  error: string;
  statusCode: number;
  message: string;
  data: T;
};

export type PaginatedDataResponse<T> = {
  error: string;
  statusCode: number;
  message: string;
  data: {
    totalAllData: number;
    totalData: number;
    limit: number;
    totalPage: number;
    currentPage: number;
    lastPage: number;
    nextPage: number;
    previousPage: number;
    payload: T;
  };
};

export type Base = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
