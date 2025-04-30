import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

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
