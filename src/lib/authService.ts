import { axiosAuth } from "./axios";

export const getRefreshToken = async (refreshToken: string) => {
  try {
    const response = await axiosAuth.post("/auth/refreshToken", {refreshToken});
    return response.data;
  } catch (error) {
    console.error("Error refreshing token", error);
    throw error;
  }
};
