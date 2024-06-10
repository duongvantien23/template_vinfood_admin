import { apiClient } from "../constant/api";

export const apiThongKeDonHang = async (ngayBatDau: Date, ngayKetThuc: Date): Promise<any> => {
    const res = await apiClient?.post(`/donhang-thongke`, { NgayBatDau: ngayBatDau, NgayKetThuc: ngayKetThuc });
    return res?.data;
  };
  export const apiGetAllStatus = async (): Promise<any> => {
    const res = await apiClient?.get(`/trangthai-donhang-get-all`);  
    return res?.data;
  };
  export const apiGetStatusById = async (
    id: any,
  ): Promise<any> => {
    const res = await apiClient?.get(`/donhang/get-by-trangthai/`+ id);  
    return res?.data;
  };
  export const apiGetAllSapHet = async (): Promise<any> => {
    const res = await apiClient?.get(`/get-all-sanpham-sap-het`);  
    return res?.data;
  };