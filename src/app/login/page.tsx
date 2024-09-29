'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';
import Button from '@/components/button/button';
import GoogleLoginButton from '@/components/button/googleLoginButton';
import Input from '@/components/input/input';
import PasswordInput from '@/components/input/passwordInput';
import Toast from '@/components/toast';

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
        onSuccess: (data) => {
          const previousUrl = document.referrer;

          if (previousUrl && !previousUrl.includes('/login')) {
            router.back();
          } else {
            router.push('/');
          }
        },
        onError: (error) => {
          setShowToast('죄송합니다. 계정을 찾을 수 없습니다.');
          console.error('로그인 실패:', error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen max-h-dvh bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 sm:rounded-lg sm:px-16">
          <div className="mt-6">
            <GoogleLoginButton />
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
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
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">새로운 일반 유저로 시작하기</span>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" intent={'default'} size={'long'} colorScheme={'blue'}>
                회원가입
              </Button>
            </div>
          </div>
          <div className="mt-6 text-pretty text-center text-xs text-gray-700">
            By continuing, you agree to 감귤마켓's Consumer Terms and Usage Policy, and acknowledge their Privacy
            Policy.
          </div>
          {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
        </div>
      </div>
    </div>
  );
}
