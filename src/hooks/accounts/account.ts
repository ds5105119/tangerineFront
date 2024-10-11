'use client';

import axiosInstance from '@/lib/axiosInstance';
import { clearAuth } from '@/lib/authToken';

export const logout = () => {
  let attempts = 0;

  if (window.confirm('로그아웃 하시겠습니까??')) {
    while (attempts < 3) {
      try {
        axiosInstance.post(`${process.env.NEXT_PUBLIC_LOGOUT_URL}`, {});
        clearAuth();
        window.location.href = '/';
        return;
      } catch (error) {
        attempts++;
        if (attempts >= 3) {
          console.log(error);
          alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
      }
    }
  }
};
