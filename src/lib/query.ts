export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export type HomeQuery = {
  lang: string;
  section: number;
};

export type StoreQuery = {
  page?: number;
  limit?: number;
  province?: string;
  city?: string;
  storeName?: string;
};
