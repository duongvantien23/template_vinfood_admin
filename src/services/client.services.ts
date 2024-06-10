import { apiClient } from "../constant/api";
export const apiGetAllKH = async (): Promise<any> => {
  const res = await apiClient?.get(`/api/KhachHang/get-all-khachhang`);  
  return res?.data;
};