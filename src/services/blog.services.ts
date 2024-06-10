import { apiClient } from "../constant/api";
export const apiGetAllBlogs = async (): Promise<any> => {
  const res = await apiClient?.get(`/api/TinTuc/tintuc/get-all`);  
  return res?.data;
};