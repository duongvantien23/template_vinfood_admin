import { apiClient } from "../constant/api";
export const apiGetAllOrder = async (): Promise<any> => {
    const res = await apiClient?.get(`/donhang-get-all`);  
    return res?.data;
  };
  export const apiCreateOrder = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/DonHang/donhang/create`, data);  
    return res?.data;
  };
  export const apiGetAllStatus = async (): Promise<any> => {
    const res = await apiClient?.get(`/trangthai-donhang-get-all`);  
    return res?.data;
  };
  export const apiGetAllMethod = async (): Promise<any> => {
    const res = await apiClient?.get(`/ptthanhtoan-donhang-get-all`);  
    return res?.data;
  };
  export const apiGetAllSP = async (): Promise<any> => {
    const res = await apiClient?.get(`/get-all-sanpham`);  
    return res?.data;
  };
  export const apiGetAllKH = async (): Promise<any> => {
    const res = await apiClient?.get(`/api/KhachHang/get-all-khachhang`);  
    return res?.data;
  };
  export const apiGetOrderById = async (
    id: any,
  ): Promise<any> => {
    const res = await apiClient?.get(`/donhang/get-by-id/ `+ id);  
    return res?.data;
  };
  export const apiUpdateOrder = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.put(`/api/DonHang/donhang-update`, data);  
    return res?.data;
  };
  export const apiDeleteOrder = async (id: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/DonHang/delete-donhang/${id}`);
    return res?.data;
  };