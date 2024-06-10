import { apiClient } from "../constant/api";

export const apiSearch = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/SanPham/search-sanpham`, data);  
    return res?.data;
  };
  export const apiCreate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/create-sanpham`, data);  
    return res?.data;
  };
  export const apiUpdate = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.put(`/update-sanpham`, data);  
    return res?.data;
  };

  export const apiGetById = async (
    id: any,
  ): Promise<any> => {
    const res = await apiClient?.get(`/get-by-id/`+ id);  
    return res?.data;
  };

  export const apiDelete = async (id: any): Promise<any> => {
    const res = await apiClient?.delete(`/api/SanPham/delete-sanpham/${id}`);
    return res?.data;
  };

  export const apiGetAllCategory = async (): Promise<any> => {
    const res = await apiClient?.get(`/api/DanhMuc/get-all-danhmuc`);  
    return res?.data;
  };
  export const apiGetDanhMucById = async (
    id: any,
  ): Promise<any> => {
    const res = await apiClient?.get(`/api/DanhMuc/get-by-id/`+ id);  
    return res?.data;
  };
  export const apiGetAllNhaCC = async (): Promise<any> => {
    const res = await apiClient?.get(`/api/NhaCungCap/sp_getall_nhacungcap`);  
    return res?.data;
  };
  export const apiGetAllSP = async (): Promise<any> => {
    const res = await apiClient?.get(`/get-all-sanpham`);  
    return res?.data;
  };
  