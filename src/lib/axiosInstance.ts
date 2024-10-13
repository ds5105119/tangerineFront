import axios, { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosError } from 'axios';
import { loginResponseProps } from '@/hooks/accounts/accountApi';
import { getAuth, updateAuth, clearAuth } from '@/lib/authToken';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = getAuth();
    if (authData?.access) {
      config.headers.Authorization = `Bearer ${authData.access}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL}`;
      const response = await axios.post<loginResponseProps>(refresh_url, {}, { withCredentials: true });

      if (response.status === 200) {
        updateAuth(response.data.access);
        return axiosInstance(originalRequest);
      } else {
        clearAuth();
      }
    } else if (error.response?.status === 401 && originalRequest._retry) {
      clearAuth();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
