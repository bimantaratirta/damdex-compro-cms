import { Base } from "./response";

export type City = {
  value: string;
  label: string;
};

export type Province = {
  value: string;
  label: string;
  city: City[];
};

export interface Store extends Base {
  province: string;
  city: string;
  storeName: string;
  storeAddress: string;
  storeAddressGoogleMap: string;
  storePhone: string;
}
