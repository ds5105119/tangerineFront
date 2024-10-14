'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthType } from '@/types/api/accounts';
import { getAuth } from '@/lib/authToken';
import { authUserToUser } from '@/lib/accounts';
import { IoIosReverseCamera } from 'react-icons/io';
import { useUpdateUser } from '@/hooks/accounts/account';
import { usePresignedImage } from '@/hooks/images/image';
import AccountMenu from '@/components/account/accountMenu';
import Button from '@/components/button/button';
import Profile from '@/components/user/profile';
import Toast from '@/components/toast';

export default function Home() {
  const router = useRouter();
  const updateUser = useUpdateUser();
  const presignedImageHandler = usePresignedImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [auth, setAuth] = useState<AuthType>();
  const [handle, setHandle] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [link1, setLink1] = useState<string>('');
  const [link2, setLink2] = useState<string>('');
  const [showToast, setShowToast] = useState<string>('');

  const isHandleValid = (value: string) => /^[a-z0-9._]*$/.test(value) && value.length <= 25 && value.length > 3;
  const isUsernameValid = (value: string) => /^[^!@#$%^&*(),.?":{}|<>]{1,25}$/.test(value) && value.length <= 25;
  const isValidUrl = (text: string): boolean => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    return urlPattern.test(text);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitButton = () => {
    if (auth) {
      if (auth.user.username !== username) {
        if (!isUsernameValid(username)) {
          setShowToast('유효하지 않은 이름입니다.');
          return;
        }
      }

      if (auth.user.profile.link_1 !== link1) {
        if (!isValidUrl(link1)) {
          setShowToast('유효하지 않은 링크입니다.');
          return;
        }
      }

      if (auth.user.profile.link_2 !== link2) {
        if (!isValidUrl(link2)) {
          setShowToast('유효하지 않은 링크입니다.');
          return;
        }
      }

      updateUser.mutate(
        { user: { username: username, profile: { bio: bio, link_1: link1, link_2: link2 } }, handle: auth.user.handle },
        {
          onSuccess: () => {
            const tempAuth = getAuth();
            if (tempAuth) {
              setAuth(tempAuth);
            }
            setShowToast('프로필 변경이 완료되었습니다.');
          },
        }
      );
    } else {
      setShowToast('로그인을 진행해 주세요.');
    }
  };

  // 프로필 이미지 변경 시
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && auth) {
      presignedImageHandler.mutate(
        { isPublic: true, image: file },
        {
          onSuccess: (uploadedUrl) => {
            updateUser.mutate(
              { user: { profile: { profile_image: uploadedUrl } }, handle: auth.user.handle },
              {
                onSuccess: () => {
                  const tempAuth = getAuth();
                  if (tempAuth) {
                    setAuth(tempAuth);
                  }
                },
                onError: () => {
                  setHandle(auth.user.handle);
                  setShowToast('오류가 발생하였습니다.');
                },
              }
            );
          },
          onError: () => {
            setShowToast('파일 업로드 중 문제가 발생하였습니다.');
          },
        }
      );
    }
  };

  // handle 변경 시
  const handleEditToggle = () => {
    if (isEditing) {
      if (auth) {
        updateUser.mutate(
          { user: { handle: handle }, handle: auth.user.handle },
          {
            onSuccess: () => {
              const tempAuth = getAuth();
              if (tempAuth) {
                setAuth(tempAuth);
              }
            },
            onError: () => {
              setHandle(auth.user.handle);
              setShowToast('이미 존재하는 Handle입니다.');
            },
          }
        );
      } else {
        setShowToast('로그인을 진행해 주세요.');
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const tempAuth = getAuth();
    if (tempAuth) {
      setAuth(tempAuth);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (auth) {
      setHandle(auth.user.handle);
      setUsername(auth.user.username);
      setBio(auth.user.profile.bio);
      setLink1(auth.user.profile.link_1);
      setLink2(auth.user.profile.link_2);
    }
  }, [auth]);

  return (
    <main className="flex w-full max-w-full h-full">
      <div className="overflow-y-auto space-y-10 items-center hidden lg:flex lg:flex-col lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <div className="text-3xl font-extrabold w-full px-7 pt-20">설정</div>
        <AccountMenu />
      </div>

      <div className="flex flex-col overflow-y-auto w-full px-10 py-10 lg:px-20 lg:py-20 xl:px-40 xl:py-20 space-y-10">
        <div className="text-2xl font-extrabold w-full">프로필 편집</div>

        {/* profile image, handle */}
        <div
          className={`flex w-full items-center px-6 py-4 rounded-2xl justify-between ${isEditing ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          <div className="flex w-full items-center space-x-5">
            {/* profile image */}
            <div className="relative w-14 h-14 min-w-14 min-h-14 transform-all group" onClick={handleButtonClick}>
              <div className="w-full h-full group-hover:brightness-90 group-active:brightness-75 duration-200 ease-in-out">
                <Profile user={authUserToUser(auth?.user)} className="w-full h-full" priority={true} />
              </div>
              <IoIosReverseCamera className="absolute inset-0 w-6 h-6 text-white opacity-0 group-hover:opacity-100 m-auto transition-opacity duration-100 ease-in-out" />
            </div>
            {/* handle */}
            {isEditing ? (
              <input
                type="text"
                value={handle}
                maxLength={30}
                onChange={(e) => setHandle((prev) => (isHandleValid(e.target.value) ? e.target.value : prev))}
                className="w-full text-lg lg:text-xl font-bold bg-transparent border-none outline-none"
              />
            ) : (
              <div className="text-lg lg:text-xl font-bold">{handle}</div>
            )}
          </div>

          <div className="min-w-28">
            <Button size={'sm'} colorScheme={'default'} onClick={handleEditToggle}>
              {isEditing ? '확인' : 'Handle 변경'}
            </Button>
          </div>
        </div>

        {/* 이름 */}
        <div className="w-full">
          <div className="text-xl font-extrabold w-full">이름</div>
          <input
            type="text"
            value={username}
            maxLength={25}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-6 h-12 px-5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 font-medium"
          />
        </div>

        {/* 소개 */}
        <div className="w-full">
          <div className="text-xl font-extrabold w-full">소개</div>
          <textarea
            value={bio}
            maxLength={150}
            onChange={(e) => setBio(e.target.value)}
            className="w-full mt-6 h-18 max-h-24 px-5 py-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 font-medium"
          />
          <div className="text-xs font-medium w-full px-3">{bio.length} / 150</div>
        </div>

        {/* 링크 */}
        <div className="w-full">
          <div className="text-xl font-extrabold w-full">링크</div>
          <input
            type="url"
            value={link1}
            maxLength={200}
            onChange={(e) => setLink1(e.target.value)}
            className="w-full mt-6 h-12 px-5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 font-medium"
          />
          <input
            type="url"
            value={link2}
            maxLength={200}
            onChange={(e) => setLink2(e.target.value)}
            className="w-full mt-4 h-12 px-5 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 font-medium"
          />
        </div>

        {/* 제출 */}
        <div className="flex justify-end w-full">
          <Button size={'default'} colorScheme={'blue'} onClick={handleSubmitButton} className="w-40">
            제출
          </Button>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
      {showToast && <Toast message={showToast} onClose={() => setShowToast('')} />}
    </main>
  );
}
