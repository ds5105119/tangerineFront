'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSocialLogin } from '@/hooks/useLogin';
import LoadingAnimation from '@/components/loadingAnimation';

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const socialLogin = useSocialLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (code && state) {
      try {
        const decodedState = JSON.parse(atob(decodeURIComponent(state)));
        const returnTo = decodedState.returnTo || '/';

        socialLogin.mutate(
          { url: `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URI}`, code },
          {
            onSuccess: () => {
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
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 relative" role="status" aria-label="로딩 중">
        <LoadingAnimation />
      </div>
    </div>
  );
}
