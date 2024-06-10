import { apiClient } from "../constant/api";

export const login = async (username: string, password: string): Promise<string | null> => {
    try {
      const res = await apiClient?.post("/api/User/login", { username, password });
      const token = res?.data?.token;
      return token;
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
      return null;
    }
  };