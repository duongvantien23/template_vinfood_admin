import { apiClient } from "../constant/api";
export const apiGetAllCategory = async (): Promise<any> => {
  const res = await apiClient?.get(`/api/DanhMuc/get-all-danhmuc`);  
  return res?.data;
};