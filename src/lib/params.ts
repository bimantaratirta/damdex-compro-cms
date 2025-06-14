export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type HomeParams = {
  lang: string;
  section: number;
};

export type StoreParams = {
  page?: number;
  limit?: number;
  province?: string;
  city?: string;
  storeName?: string;
};
