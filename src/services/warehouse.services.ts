import { apiClient } from "../constant/api";
export const apiGetAllWarehouse = async (): Promise<any> => {
  const res = await apiClient?.get(`/api/Kho/get-all-kho`);  
  return res?.data;
};
export const apiCreate = async (
  data: any,
): Promise<any> => {
  const res = await apiClient?.post(`/create-khohang`, data);  
  return res?.data;
};
export const apiUpdate = async (
  data: any,
): Promise<any> => {
  const res = await apiClient?.put(`/update-khohang`, data);  
  return res?.data;
};

export const apiGetById = async (
  id: any,
): Promise<any> => {
  const res = await apiClient?.get(`/api/Kho/get-by-id/`+ id);  
  return res?.data;
};

export const apiDelete = async (id: any): Promise<any> => {
  const res = await apiClient?.delete(`/delete-khohang/${id}`);
  return res?.data;
};