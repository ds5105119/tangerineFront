'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/accounts/account';
import { setAuth } from '@/lib/authToken';
import Button from '@/components/button/button';
import GoogleLoginButton from '@/components/button/googleLoginButton';
import Input from '@/components/input/input';
import PasswordInput from '@/components/input/passwordInput';
import Toast from '@/components/toast';
import TextDivider from '@/components/textDivider';

export default function LoginPage() {
  const login = useLogin();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: (authData) => {
          setAuth(authData);
          const previousUrl = document.referrer;

          if (previousUrl && !previousUrl.includes('/login')) {
            window.location.href = previousUrl;
          } else {
            window.location.href = '/';
          }
        },
        onError: () => {
          setShowToast('죄송합니다. 계정을 찾을 수 없습니다.');
        },
      }
    );
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/signup');
  };

  return (
    <div className="relative w-full min-h-screen max-h-dvh flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">Tangerine</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-8 sm:rounded-lg sm:px-16">
          <div className="mt-6">
            <GoogleLoginButton />
          </div>
          <div className="mt-6">
            <TextDivider>Or continue with</TextDivider>
            <form className="space-y-6 mt-4" onSubmit={handleLogin}>
              <div>
                <div className="text-sm font-bold">이메일 주소</div>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="이메일 입력"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-bold">비밀번호</div>
                <div className="mt-1">
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="비밀번호 입력"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button type="submit" intent={'default'} size={'long'} colorScheme={'blue'}>
                  로그인
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-6">
            <TextDivider>새로운 일반 유저로 시작하기</TextDivider>
            <div className="mt-6">
              <Button
                type="submit"
                id="submit"
                intent={'default'}
                size={'long'}
                colorScheme={'blue'}
                onClick={(e) => handleSignup(e)}
              >
                회원가입
              </Button>
            </div>
          </div>
          <div className="mt-6 text-pretty text-center text-xs text-gray-700 dark:text-gray-500">
            By continuing, you agree to 감귤마켓&#39;s Consumer Terms and Usage Policy, and acknowledge their Privacy
            Policy.
          </div>
        </div>
      </div>
      {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
    </div>
  );
}
