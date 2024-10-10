'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSocialLogin } from '@/hooks/accounts/useLogin';
import { setAuth } from '@/lib/authToken';
import LoadingAnimation from '@/components/loadingAnimation';

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const socialLogin = useSocialLogin();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    if (code && state) {
      try {
        const decodedState = JSON.parse(atob(decodeURIComponent(state)));
        const returnTo = decodedState.returnTo || '/';

        socialLogin.mutate(
          { url: `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URI}`, code },
          {
            onSuccess: (authData) => {
              setAuth(authData);
              router.push(returnTo);
            },
            onError: (error) => {
              console.log(error);
              router.push('/login?error=auth_failed');
            },
          }
        );
      } catch (error) {
        router.push('/login?error=invalid_state');
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 relative" role="status" aria-label="로딩 중">
        <LoadingAnimation />
      </div>
    </div>
  );
};

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Callback />
    </Suspense>
  );
}
