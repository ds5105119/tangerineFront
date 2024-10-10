import { useMutation } from '@tanstack/react-query';
import { setAuth } from '@/lib/authToken';
import { LoginResponseDto, RegistrationDto } from '@/types/api/accounts';
import axiosInstance from '@/lib/axiosInstance';

export const useRegistration = () => {
  return useMutation<LoginResponseDto, Error, RegistrationDto>({
    mutationFn: async (credentials: RegistrationDto) => {
      try {
        const response = await axiosInstance.post<LoginResponseDto>(
          `${process.env.NEXT_PUBLIC_REGISTRATION_URL}`,
          credentials
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (authData) => {
      /**
       * SimpleJWT에서 httponly쿠키 모드로 설정한 경우에도 회원가입 시에 refresh token이 반환되는 버그가 있습니다.
       * 보안 상 이를 blank 처리합니다.
       */
      authData.refresh = '';
      setAuth(authData);
    },
    onError: (error) => {
      console.error('회원가입 오류:', error);
    },
  });
};
