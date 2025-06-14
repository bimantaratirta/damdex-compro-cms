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
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export interface User extends Base {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type UserData = {
  user: User;
  token: string;
};
