import { useMutation } from '@tanstack/react-query';
import { setAuth } from '@/lib/authToken';
import { useAuth } from './useAuth';
import { LoginRequestDto, socialLoginRequestDto, LoginResponseDto } from '@/types/api/accounts';
import axiosInstance from '@/lib/axiosInstance';

export const useLogin = () => {
  const { setAuth: setClientAuth } = useAuth();
  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: async (credentials: LoginRequestDto) => {
      try {
        const response = await axiosInstance.post<LoginResponseDto>(
          `${process.env.NEXT_PUBLIC_LOGIN_URL}`,
          credentials
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (authData) => {
      setAuth(authData);
      setClientAuth(authData);
    },
    onError: (error) => {
      console.error('로그인 오류:', error);
    },
  });
};

export const useSocialLogin = () => {
  return useMutation<LoginResponseDto, Error, socialLoginRequestDto>({
    mutationFn: async (credentials: socialLoginRequestDto) => {
      try {
        const response = await axiosInstance.post<LoginResponseDto>(
          credentials.url,
          { code: credentials.code },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (authData) => {
      setAuth(authData);
    },
    onError: (error) => {
      console.error('소셜 로그인 오류:', error);
    },
  });
};
