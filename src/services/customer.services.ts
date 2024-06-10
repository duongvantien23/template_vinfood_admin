import { apiClient } from "../constant/api";
export const apiGetAllAccountKH = async (): Promise<any> => {
  const res = await apiClient?.get(`/api/Customer/get-all-accountkh`);  
  return res?.data;
};