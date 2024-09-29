'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/button/button';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    const googleOAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const state = encodeURIComponent(btoa(JSON.stringify({ returnTo: document.referrer || '/' })));

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      redirect_uri: `${window.location.origin}/login/callback/`,
      response_type: 'code',
      scope: 'email profile',
      prompt: 'select_account',
      state: state,
    });

    router.push(`${googleOAuthURL}?${params.toString()}`);
  };

  return (
    <Button onClick={handleGoogleLogin} intent={'outline'} size={'long'}>
      <FcGoogle className="h-5 w-5 mr-2" />
      Google로 로그인
    </Button>
  );
};

export default GoogleLoginButton;
