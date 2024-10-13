'use client';

import axiosInstance from '@/lib/axiosInstance';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getAuth, setAuth, clearAuth } from '@/lib/authToken';
import {
  getUserProps,
  getUserListProps,
  loginRequestProps,
  socialLoginRequestProps,
  loginResponseProps,
  registrationProps,
  updateUserProps,
  getUser,
  login,
  socialLogin,
  registration,
  updateUser,
  getUserList,
} from './accountApi';
import { User, UpdateAbleUser } from '@/types/api/accounts';
import { useAuth } from './useAuth';

export const logout = () => {
  let attempts = 0;

  if (window.confirm('로그아웃 하시겠습니까??')) {
    while (attempts < 3) {
      try {
        axiosInstance.post(`${process.env.NEXT_PUBLIC_LOGOUT_URL}`, {});
        clearAuth();
        window.location.href = '/';
        return true;
      } catch (error) {
        attempts++;
        if (attempts >= 3) {
          console.log(error);
          alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
      }
    }
  }

  return false;
};

export const useUser = (handle: string) => {
  return useQuery<User, Error, getUserProps>({
    queryKey: ['user', handle],
    queryFn: async () => getUser({ handle })
  });
};

export const useLogin = () => {
  const { setAuth: setClientAuth } = useAuth();
  return useMutation<loginResponseProps, Error, loginRequestProps>({
    mutationFn: login,
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
  return useMutation<loginResponseProps, Error, socialLoginRequestProps>({
    mutationFn: socialLogin,
    onSuccess: (authData) => {
      setAuth(authData);
    },
    onError: (error) => {
      console.error('소셜 로그인 오류:', error);
    },
  });
};

export const useRegistration = () => {
  /**
   * SimpleJWT에서 httponly쿠키 모드로 설정한 경우에도 회원가입 시에 refresh token이 반환되는 버그가 있습니다.
   * 보안 상 이를 blank 처리합니다.
   */
  return useMutation<loginResponseProps, Error, registrationProps>({
    mutationFn: registration,
    onSuccess: (authData) => {
      authData.refresh = '';
      setAuth(authData);
    },
    onError: (error) => {
      console.error('회원가입 오류:', error);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation<UpdateAbleUser, Error, updateUserProps>({
    mutationFn: updateUser,
    onSuccess: async (updatedUser) => {
      const auth = getAuth();

      if (auth) {
        setAuth({
          ...auth,
          user: {
            ...auth.user,
            handle: updatedUser.handle ?? auth.user.handle,
            username: updatedUser.username ?? auth.user.username,
            profile: {
              bio: updatedUser.profile?.bio ?? auth.user.profile.bio,
              link_1: updatedUser.profile?.link_1 ?? auth.user.profile.link_1,
              link_2: updatedUser.profile?.link_2 ?? auth.user.profile.link_2,
              profile_image: updatedUser.profile?.profile_image ?? auth.user.profile.profile_image,
            },
          },
        });
      }
    },
    onError: (error) => {
      console.error('유저 데이터 변경 오류:', error);
    },
  });
};

export const useUserList = ({ search }: getUserListProps) => {
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { results: User[]; next: number | null },
    Error
  >({
    queryKey: ['userList', search],
    queryFn: ({ pageParam }) => getUserList(pageParam as getUserListProps),
    initialPageParam: { page: 1, search: search },
    getNextPageParam: (lastPage) => (lastPage.next ? { page: lastPage.next, search } : undefined),
    enabled: !!search,
  });

  return {
    Users: data?.pages.flatMap((page) => page.results),
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
