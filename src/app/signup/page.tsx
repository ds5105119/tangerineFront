'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/hooks/accounts/useRegistration';
import { setAuth } from '@/lib/authToken';
import { useUser } from '@/hooks/accounts/useUser';
import axios from 'axios';
import Button from '@/components/button/button';
import GoogleLoginButton from '@/components/button/googleLoginButton';
import Input from '@/components/input/input';
import PasswordInput from '@/components/input/passwordInput';
import Toast from '@/components/toast';
import TextDivider from '@/components/textDivider';

export default function LoginPage() {
  const registration = useRegistration();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [showToast, setShowToast] = useState<string>('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    registration.mutate(
      { username, email, password1, password2 },
      {
        onSuccess: (authData) => {
          setAuth(authData);
          const previousUrl = document.referrer;

          if (previousUrl && !previousUrl.includes('/signup') && !previousUrl.includes('/login')) {
            router.back();
          } else {
            router.push('/');
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error.response?.data?.email) {
              setShowToast(error.response?.data?.email);
            } else if (error.response?.data?.non_field_errors) {
              setShowToast(error.response?.data?.non_field_errors);
            }
          } else {
            setShowToast('죄송합니다. 회원가입에 실패했습니다.');
            console.error('회원가입 실패:', error);
          }
        },
      }
    );
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    const { data, isLoading, error } = useUser(username);
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
            <form className="space-y-6 mt-4" onSubmit={handleLogin} name="signupForm">
              <div>
                <div className="text-sm font-bold">ID</div>
                <div className="mt-1">
                  <Input
                    id="text"
                    name="text"
                    type="text"
                    autoComplete="text"
                    placeholder="ID 입력"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

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
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-bold">비밀번호 확인</div>
                <div className="mt-1">
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="비밀번호 재입력"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button type="submit" intent={'default'} size={'long'} colorScheme={'blue'} id="submit">
                  회원가입
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-6 text-pretty text-center text-xs text-gray-700 dark:text-gray-500">
            By continuing, you agree to 감귤마켓&#39;s Consumer Terms and Usage Policy, and acknowledge their Privacy
            Policy.
          </div>
          {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
        </div>
      </div>
    </div>
  );
}
