import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { HomeQuery, PaginationQuery } from "./query";
import { HomeParams, PaginationParams } from "./params";
import { createHash } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserToken = () => {
  let userToken = null;

  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("user-token");
  }

  if (userToken !== null) {
    return userToken;
  }

  return null;
};

export const getRefreshToken = () => {
  let userToken = null;

  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("user-refresh-token");
  }

  if (userToken !== null) {
    return userToken;
  }

  return null;
};

export const errorHandling = (error: unknown, errorTitle: string) => {
  if (axios.isAxiosError(error)) {
    toast.error(errorTitle, {
      description: error.response?.data.message,
    });
  }
  toast.error(errorTitle, {
    description: "Terjadi Kesalahan",
  });
};

export const paginationQueryToParams = (query: PaginationQuery): PaginationParams => {
  return {
    page: query.page ?? undefined,
    limit: query.limit ?? undefined,
  };
};

export const handleChangePaginationQuery = (q: PaginationQuery) => {
  if (q) {
    if (!q?.limit) delete q.limit;
    if (!q?.page) delete q.page;
  }

  return q;
};

export const homeQuerytoParams = (query: HomeQuery): HomeParams => {
  return {
    lang: query.lang ?? undefined,
    section: query.section ?? undefined,
  };
};

export const hasher = (data: string) => {
  const hashed = createHash("sha256").update(data).digest("hex");
  return hashed;
};
