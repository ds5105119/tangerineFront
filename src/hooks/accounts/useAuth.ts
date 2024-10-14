'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from '@/lib/authToken';
import { AuthType } from '@/types/api/accounts';

interface useAuthProps {
  auth: AuthType | undefined;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>; // 상태 업데이트 함수
}

export function useAuth(): useAuthProps {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthType>();

  useEffect(() => {
    const authData = getAuth();
    if (authData) {
      setAuth(authData);
    }
  }, [router]);

  return { auth, setAuth };
}
