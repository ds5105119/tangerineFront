import axiosInstance from '@/lib/axiosInstance';

export const logout = () => {
  axiosInstance.post(`${process.env.NEXT_PUBLIC_LOGOUT_URL}`);
};
