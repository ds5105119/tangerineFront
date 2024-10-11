'use client';

import { useState, useEffect } from 'react';
import { getAuth } from '@/lib/authToken';
import { AuthType } from '@/types/api/accounts';

export function useAuth() {
  const [auth, setAuth] = useState<AuthType | null>(null);

  useEffect(() => {
    const authData = getAuth();
    setAuth(authData);
  }, []);

  return { auth, setAuth };
}
